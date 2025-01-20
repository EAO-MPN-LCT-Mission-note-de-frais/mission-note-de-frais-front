import { Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ExpenseReportComponent} from './expense-report/expense-report.component';

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
    path: 'expense-report',
    component: ExpenseReportComponent,
    canActivate: [AuthGuard],
  }
];

