import { Routes } from '@angular/router';

import { LoginComponent } from './users/login/login.component';
import { UsersAdminComponent } from './users/users-admin/users-admin.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ManagementComponent } from './management/management.component';
import { ReportComponent } from './report/report.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { StockComponent } from './stock/stock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './dashboard/about-us/about-us.component';
import { SupportComponent } from './dashboard/support/support.component';
import { OurServicesComponent } from './dashboard/our-services/our-services.component';
import { FaqComponent } from './dashboard/faq/faq.component';
import { PortalComponent } from './portal/portal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RegisterUserComponent } from './users/register-user/register-user.component';
import { ProductComponent } from './stock/product/product.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: OurServicesComponent },
  { path: 'support', component: SupportComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'portal',
    component: PortalComponent,
    children: [
      { path: '', redirectTo: '/portal/report', pathMatch: 'full' },
      { path: 'user-admin', component: UsersAdminComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'edit-user/:id', component: RegisterUserComponent },
      { path: 'management', component: ManagementComponent },
      { path: 'report', component: ReportComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'incomes', component: IncomesComponent },
      { path: 'register-income', component: TransactionsComponent },
      { path: 'edit-income/:id', component: TransactionsComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'register-expense', component: TransactionsComponent },
      { path: 'edit-expense/:id', component: TransactionsComponent },
      { path: 'stock', component: StockComponent },
      { path: 'register-product', component: ProductComponent },
      { path: 'edit-product/:id', component: ProductComponent },
      { path: 'alert', component: NotificationsComponent },
    ],
  },
];
