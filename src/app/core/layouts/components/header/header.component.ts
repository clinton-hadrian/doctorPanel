import { Component, inject, OnInit } from '@angular/core';
import { PrimengModule } from '../../../../shared/modules/primeng/primeng.module';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimengModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items!: any[];
  currentTheme: string = localStorage.getItem('THEME') || 'light';
  toggleThemeIcon: string =
    this.currentTheme === 'light' ? 'pi pi-sun' : 'pi pi-moon';

  constructor(public router: Router, public commonService: CommonService) {}

  ngOnInit() {
    // this.items = [
    //   {
    //     label: 'Home',
    //     icon: 'pi pi-home',
    //   },
    //   {
    //     label: 'Features',
    //     icon: 'pi pi-star',
    //   },
    //   {
    //     label: 'Projects',
    //     icon: 'pi pi-search',
    //     items: [
    //       {
    //         label: 'Core',
    //         icon: 'pi pi-bolt',
    //         shortcut: '⌘+S',
    //       },
    //       {
    //         label: 'Blocks',
    //         icon: 'pi pi-server',
    //         shortcut: '⌘+B',
    //       },
    //       {
    //         label: 'UI Kit',
    //         icon: 'pi pi-pencil',
    //         shortcut: '⌘+U',
    //       },
    //       {
    //         separator: true,
    //       },
    //       {
    //         label: 'Templates',
    //         icon: 'pi pi-palette',
    //         items: [
    //           {
    //             label: 'Apollo',
    //             icon: 'pi pi-palette',
    //             badge: '2',
    //           },
    //           {
    //             label: 'Ultima',
    //             icon: 'pi pi-palette',
    //             badge: '3',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Contact',
    //     icon: 'pi pi-envelope',
    //     badge: '3',
    //   },
    // ];
  }

  toggleDarkMode() {
    const currentTheme = localStorage.getItem('THEME') || 'light';
    this.toggleThemeIcon =
      currentTheme === 'light' ? 'pi pi-moon' : 'pi pi-sun';
    this.commonService.toggleTheme('toggle');
  }

  goToCart() {
    this.router.navigate(['home']);
  }
}
