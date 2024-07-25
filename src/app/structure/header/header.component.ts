import { Component, input } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@ea-controls/layout';
import { PortalComponent, PortalContentComponent } from '@ea-controls/portal';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    PortalComponent,
    LayoutComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    PortalComponent,
    PortalContentComponent,
    MatListModule,
    MatDividerModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  drawer = input.required<MatDrawer>()

}
