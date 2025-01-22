import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ExpenseReportComponent} from './expense-report/expense-report.component';
import { MissionTypeComponent } from './mission-type/mission-type.component';

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
  {
    path: 'expense-report/:id',
    component: ExpenseReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mission-type',
    component: MissionTypeComponent,
    canActivate: [AuthGuard],
  }
];

