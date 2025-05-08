import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { roleEnum } from '../../shared/utils/array.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.API_URL;

  constructor(private router: Router, private http: HttpClient) {}

  getToken() {
    return sessionStorage.getItem('TOKEN');
  }

  getRole() {
    return sessionStorage.getItem('ROLE');
  }

  getInfo() {
    const info = JSON.parse(sessionStorage.getItem('INFO') || '{}')[0];
    const role = sessionStorage.getItem('ROLE') || '';

    return {
      name: info?.Name,
      id: info?.ID,
      role: role,
    };
  }

  logout() {
    let role = this.getRole();
    sessionStorage.clear();
    if (role == roleEnum.USER) {
      this.router.navigate(['/user']);
    } else if (role == roleEnum.CUSTOMER) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
