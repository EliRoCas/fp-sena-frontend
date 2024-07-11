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
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './dashboard/about-us/about-us.component';
import { SupportComponent } from './dashboard/support/support.component';
import { OurServicesComponent } from './dashboard/our-services/our-services.component';
import { FaqComponent } from './dashboard/faq/faq.component';
import { PortalComponent } from './portal/portal.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'services', component: OurServicesComponent },
    { path: 'support', component: SupportComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'login', component: LoginComponent },

    {
        path: 'portal', component: PortalComponent,
        children: [

            { path: 'users', component: UsersAdminComponent },
            { path: 'users', component: UserProfileComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'management', component: ManagementComponent },
            { path: 'report', component: ReportComponent },
            { path: 'incomes', component: IncomesComponent },
            { path: 'expenses', component: ExpensesComponent },
            { path: 'stock', component: StockComponent },
        ]

    },

];
