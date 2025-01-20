import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'missions',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'missions',
    component: MissionsComponent,
    canActivate: [AuthGuard],
  },
];
