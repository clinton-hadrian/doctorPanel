import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../../shared/modules/primeng/primeng.module';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../../features/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';
import { SIDEBAR } from '../../../../shared/utils/array.utils';

@Component({
  selector: 'app-panel-menu',
  standalone: true,
  imports: [PrimengModule, CommonModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent implements OnInit {
  items!: any[];
  profileName!: string;
  greetingMessage!: string;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.profileName = this.authService.getInfo().name;
    this.greetingMessage = this.getGreeting();
    setInterval(() => {
      this.greetingMessage = this.getGreeting();
    }, 600000);
    this.items = [
      {
        label: 'Navigate',
        icon: 'pi pi-compass',
        expanded: true,
        items: [
         
          {
            label: 'Doctor List',
            icon: 'pi pi-list',
            command: () => {
              this.onCommand('doctorList');
            },
            visible: true,
          },
        ],
      },
      {
        label: 'Options',
        icon: 'pi pi-ellipsis-h',
        items: [
          {
            label: 'About',
            icon: 'pi pi-question',
            command: () => {
              this.onCommand('about');
            },
          },
        ],
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }

  get visibleItems() {
    return (
      this.items[0]?.items?.filter((item: any) => item.visible === true) || []
    );
  }

  onCommand(route: any) {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
    this.commonService.openSidebar.set(false);
  }

  getGreeting(): string {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  getToggleIcon() {
    return SIDEBAR[this.commonService.sidebarMinimized() ? 'true' : 'false']
      .icon;
  }
}
