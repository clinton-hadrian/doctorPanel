import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HomeLayoutComponent } from './core/layouts/home-layout/home-layout.component';
import { homeRoutes } from './features/home/home.routes';
import { tokenGuard } from './core/guards/token.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { authRoutes } from './features/auth/auth.routes';
import { AboutComponent } from './shared/components/about/about.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { doctorRoutes } from './features/doctor/doctor.routes';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [tokenGuard],
    children: [
      ...authRoutes,
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    canActivate: [tokenGuard],
    children: [
      ...doctorRoutes,
      ...homeRoutes,
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'DocZone - Unauthorized',
      },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: '', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
