import { Routes } from '@angular/router';
import { LoginComponent } from './modules/portal/users/login/login.component';
import { FaqComponent } from './structure/dashboard/faq/faq.component';
import { SupportComponent } from './structure/dashboard/support/support.component';
import { OurServicesComponent } from './structure/dashboard/our-services/our-services.component';
import { AboutUsComponent } from './structure/dashboard/about-us/about-us.component';
import { DashboardComponent } from './structure/dashboard/dashboard.component';
import { PortalComponent } from './modules/portal/portal.component';
import { UsersAdminComponent } from './modules/portal/users/users-admin/users-admin.component';
import { UserProfileComponent } from './modules/portal/users/user-profile/user-profile.component';
import { RegisterUserComponent } from './modules/portal/users/register-user/register-user.component';
import { ReportComponent } from './modules/portal/report/report.component';
import { BalanceComponent } from './modules/portal/report/balance/balance.component';
import { NetIncomeComponent } from './modules/portal/report/net-income/net-income.component';
import { IncomeStatementComponent } from './modules/portal/report/income-statement/income-statement.component';
import { TransactionsComponent } from './modules/portal/transactions/transactions.component';
import { IncomesComponent } from './modules/portal/incomes/incomes.component';
import { ExpensesComponent } from './modules/portal/expenses/expenses.component';
import { CategoriesComponent } from './modules/portal/categories/categories.component';
import { StockComponent } from './modules/portal/stock/stock.component';
import { ProductComponent } from './modules/portal/stock/product/product.component';
import { NotificationsComponent } from './structure/notifications/notifications.component';
import { SubcategoriesComponent } from './modules/portal/categories/subcategories/subcategories.component';
import { SubcategoryFormComponent } from './modules/portal/categories/subcategories/subcategory-form/subcategory-form.component';
import { CategoryFormComponent } from './modules/portal/categories/category-form/category-form.component';
import { UserGuard } from './guards/user-guard.guard';


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
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: '/portal/report', pathMatch: 'full' },
      { path: 'user-admin', component: UsersAdminComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'edit-user/:id', component: RegisterUserComponent },
      { path: 'report', component: ReportComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'net-income', component: NetIncomeComponent },
      { path: 'income-statement', component: IncomeStatementComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'incomes', component: IncomesComponent },
      { path: 'register-income', component: TransactionsComponent },
      { path: 'edit-income/:id', component: TransactionsComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'register-expense', component: TransactionsComponent },
      { path: 'edit-expense/:id', component: TransactionsComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "category", component: CategoryFormComponent },
      { path: "subcategories", component: SubcategoriesComponent },
      { path: "subcategories", component: SubcategoryFormComponent },
      { path: 'stock', component: StockComponent },
      { path: 'register-product', component: ProductComponent },
      { path: 'edit-product/:id', component: ProductComponent },
      { path: 'alert', component: NotificationsComponent },
    ],
  },
];
