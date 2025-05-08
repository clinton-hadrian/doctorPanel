import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PrimengModule } from '../../../../shared/modules/primeng/primeng.module';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [PrimengModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login() {
    sessionStorage.setItem('TOKEN', JSON.stringify({}));
    sessionStorage.setItem('ROLE', 'ADMIN');
    sessionStorage.setItem('INFO', JSON.stringify({ Name: 'Admin', ID: 1 }));
    this.router.navigate(['home']);
    this.notificationService.showSuccess('Logged In', 'Welcome back!');
  }
}
