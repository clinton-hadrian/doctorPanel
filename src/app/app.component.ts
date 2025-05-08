import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from './core/services/notification.service';
import { PrimengModule } from './shared/modules/primeng/primeng.module';
import { LoaderService } from './core/services/loader.service';
import { CommonService } from './core/services/common.service';
import { CustomLoaderComponent } from './shared/components/custom-loader/custom-loader.component';
import { SharedModule } from './shared/modules/shared/shared.module';
import { DisplayDialogComponent } from './shared/components/display-dialog/display-dialog.component';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastModule,
    PrimengModule,
    CustomLoaderComponent,
    SharedModule,
  ],
  providers: [MessageService, NotificationService],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'SPARK';

  @ViewChild('termsDialog') termsDialog!: DisplayDialogComponent;

  constructor(
    private primeNgConfig: PrimeNGConfig,
    public loaderService: LoaderService,
    private commonService: CommonService,
    private router: Router, // inject Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects; // Get the current path after navigation

        if (
          currentPath === '/home/rif' &&
          this.authService.getRole() == 'CUSTOMER'
        ) {
          this.openIntroductionDialog();
        }
      }
    });

    this.commonService.toggleTheme('set');
    this.primeNgConfig.ripple = true;
  }

  openIntroductionDialog() {
    if (this.termsDialog) {
      this.termsDialog.showDialog();
    }
  }
}
