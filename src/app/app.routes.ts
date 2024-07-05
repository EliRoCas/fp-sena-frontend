import { Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { LoginComponent } from './users/login/login.component';
import { UsersAdminComponent } from './users/users-admin/users-admin.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { ManagementComponent } from './management/management.component';
import { ReportComponent } from './report/report.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { StockComponent } from './stock/stock.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent}, 
    {path:'users', component: UsersAdminComponent},
    {path:'users', component: UserProfileComponent},
    {path:'signUp', component: SignUpComponent},
    {path:'management', component: ManagementComponent},
    {path:'report', component: ReportComponent},
    {path:'incomes', component: IncomesComponent},
    {path:'expenses', component: ExpensesComponent},
    {path:'stock', component: StockComponent},
    
];
