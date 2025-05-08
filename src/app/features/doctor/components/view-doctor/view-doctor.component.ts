import { Component, input } from '@angular/core';
import { FormService } from '../../../../core/services/form.service';
import { PrimengModule } from '../../../../shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-view-doctor',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.scss',
})
export class ViewDoctorComponent {
  constructor(public fs: FormService) {}

  doctor = input.required<any>();
}
