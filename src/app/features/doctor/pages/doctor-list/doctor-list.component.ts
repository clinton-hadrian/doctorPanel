import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LoaderService } from '../../../../core/services/loader.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { DisplayDialogComponent } from '../../../../shared/components/display-dialog/display-dialog.component';
import { PrimengModule } from '../../../../shared/modules/primeng/primeng.module';
import { COLS } from '../../../../shared/utils/array.utils';
import { SharedModule } from '../../../../shared/modules/shared/shared.module';
import { DoctorService } from '../../doctor.service';
import { DoctorFormComponent } from '../../components/doctor-form/doctor-form.component';
import { ViewDoctorComponent } from '../../components/view-doctor/view-doctor.component';
import { FormService } from '../../../../core/services/form.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    PrimengModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DoctorFormComponent,
    ViewDoctorComponent,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent implements OnInit {
  doctorList!: any[];
  filteredDoctorList!: any[];
  selectedStatus: string = 'all';
  selectedDoctorId!: any;
  selectedDoctor!: any;
  filterForm!: FormGroup;
  dialog = {
    title: '',
    type: '',
    icon: '',
  };

  cols!: any[];
  first = 0;
  rows = 5;
  currentPage: number = Math.floor(this.first / this.rows) + 1;
  totalRecords!: number;

  statuses = [
    { label: 'All', value: 'all' },
    { label: 'Available', value: true },
    { label: 'Unavailable', value: false },
  ];

  @ViewChild('termsDialog') termsDialog!: DisplayDialogComponent;

  constructor(
    private fb: FormBuilder,
    public fs: FormService,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private doctorService: DoctorService
  ) {
    effect(() => {
      this.doctorList = this.doctorService.doctorListSignal();
      this.totalRecords = this.doctorService.doctorListSignal().length;
    });
  }

  ngOnInit(): void {
    this.doctorService.getDoctors();
    this.filterForm = this.fb.group({
      searchText: [''],
      statusFilter: ['all'],
    });
    this.getDoctorList();
    this.cols = COLS['DOCTOR_COLS'];

    this.filterForm.valueChanges
      ?.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.getDoctorList());
  }

  pageChange(event: any) {
    const previousRecord = this.first;
    const previousRows = this.rows;
    this.first = event.first; // Index of the first record on the current page
    this.rows = event.rows; // Number of rows per page

    this.currentPage = Math.floor(this.first / this.rows) + 1;
    if (previousRecord != this.first || previousRows != this.rows) {
      this.getDoctorList();
    }
  }

  getDoctorList() {
    console.log('getDoctorList', this.filterForm.value);
    console.log('currentPage', this.currentPage);
    console.log('rows', this.rows);
    this.doctorService.getDoctors(
      this.currentPage,
      this.rows,
      this.filterForm.value
    );
  }

  reloadDoctorList() {
    this.loaderService.isLoading.set(true);
    setTimeout(() => {
      this.loaderService.isLoading.set(false);
      this.getDoctorList();
      this.notificationService.showSuccess('Fetched', 'Doctor list fetched');
    }, 2000);
  }

  viewDoctor(doctor: any) {
    console.log('doctor', doctor);
    this.dialog.title = 'Doctor Details';
    this.dialog.type = 'doctorDetails';
    this.dialog.icon = 'pi pi-user';
    this.termsDialog.showDialog();
    this.selectedDoctor = doctor;
  }

  openDoctorForm(doctor: any = null, isEdit: boolean = false) {
    this.termsDialog.showDialog();
    this.dialog.title = `${isEdit ? 'Edit' : 'Add'} doctor`;
    this.dialog.type = `doctor${isEdit ? 'Edit' : 'Add'}`;
    this.dialog.icon = `pi pi-${isEdit ? 'user-edit' : 'user-plus'}`;
    this.selectedDoctorId = 0;

    this.selectedDoctorId = doctor?.id;
    console.log('SETTTT', this.selectedDoctorId);
  }

  deleteDoctor(doctorId: number) {
    console.log(doctorId);
    this.loaderService.isLoading.set(true);
    setTimeout(() => {
      this.loaderService.isLoading.set(false);
      this.doctorService.deleteDoctor(doctorId);

      this.notificationService.showSuccess(
        'Success',
        `Doctor has been deleted successfully`
      );
      this.doctorService.getDoctors();
    }, 1000);
  }

  closeDialog() {
    this.termsDialog.visible = false;
  }
}
