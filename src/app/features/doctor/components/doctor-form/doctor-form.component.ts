import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { PrimengModule } from '../../../../shared/modules/primeng/primeng.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormService } from '../../../../core/services/form.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from '../../../../shared/modules/directive/directive.module';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [PrimengModule, CommonModule, ReactiveFormsModule, DirectiveModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.scss',
})
export class DoctorFormComponent implements OnInit, OnChanges {
  doctorForm!: FormGroup;
  doctorId = input<number>(0);
  closeDialog = output<void>();

  constructor(
    private fb: FormBuilder,
    public fs: FormService,
    private notificationService: NotificationService,
    private doctorService: DoctorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctorId'] && changes['doctorId'].currentValue) {
      console.log('AAAAAAAAAAAA', this.doctorId());
      this.getDoctorData();
    }
  }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      available: [true],
    });

    this.fs.setForm(this.doctorForm);
  }

  getDoctorData() {
    if (this.doctorId() && this.doctorId() != 0) {
      const doctor = this.doctorService.getDoctorById(this.doctorId());

      this.doctorForm.patchValue({
        name: doctor?.name,
        specialization: doctor?.specialization,
        contact: doctor?.contact,
        available: doctor?.available,
      });
    }
  }

  formSubmit() {
    if (this.doctorForm.valid) {
      console.log('Form submitted:', this.doctorForm.value);
      console.log('doc id:', this.doctorId());

      if (this.doctorId() && this.doctorId() != 0) {
        console.log('YYYYYYYYYYYYYYyy:', this.doctorId());
        this.doctorService.updateDoctor(this.doctorId(), this.doctorForm.value);
        this.doctorForm.reset();
      } else {
        this.doctorService.addDoctor(this.doctorForm.value);
        this.doctorForm.reset();
      }

      this.notificationService.showSuccess(
        'Success',
        `Doctor details have been ${
          this.doctorId() ? 'updated' : 'submitted'
        } successfully.`
      );
      this.doctorService.getDoctors();
      this.closeDialog.emit();
    } else {
      this.doctorForm.markAllAsTouched();
      this.notificationService.showWarn(
        'Submission failed',
        'Please fill all required fields in the current step before proceeding.'
      );
    }
  }
}
