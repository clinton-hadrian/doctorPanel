import { Component } from '@angular/core';
import { PrimengModule } from '../../modules/primeng/primeng.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
