import { Component } from '@angular/core';
import { PrimengModule } from '../../modules/primeng/primeng.module';
import { Router } from '@angular/router';

@Component({
  selector: 'ecom-not-found',
  imports: [PrimengModule],
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
    this.router.navigate(['/']);
  }
}
