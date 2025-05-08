import { Routes } from '@angular/router';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';

export const doctorRoutes: Routes = [
  {
    path: 'doctorList',
    component: DoctorListComponent,
    title: 'DocZone - List of Doctors',
  },
];
