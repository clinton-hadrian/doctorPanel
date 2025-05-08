import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  #document: Document = inject(DOCUMENT);
  constructor(private authService: AuthService) { }

  openSidebar = signal<boolean>(false);
  sidebarMinimized = signal<boolean>(false);


  toggleTheme(type: String) {
    const currentTheme = localStorage.getItem('THEME') || 'light';
    const linkElement = this.#document.getElementById('app-theme') as HTMLLinkElement;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    if (type === 'set') {
      linkElement.href = currentTheme + '.css';
    } else {
      linkElement.href = newTheme + '.css';
      localStorage.setItem('THEME', newTheme);
    }
  }

  hasRoles(...allowedRoles: string[]): boolean {
    const currentRole = this.authService.getRole();
    if (!currentRole) return false;
    return allowedRoles.some(role => role.toUpperCase() === currentRole.toUpperCase());


  }



}
