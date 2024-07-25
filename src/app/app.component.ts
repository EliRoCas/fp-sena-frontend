import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './structure/header/header.component';
import { FooterComponent } from './structure/footer/footer.component';
import { LayoutComponent } from '@ea-controls/layout'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PortalComponent, PortalContentComponent } from '@ea-controls/portal';
import { NavComponent } from './structure/header/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule, 
    HeaderComponent, 
    FooterComponent, 
    LayoutComponent,
    CommonModule,
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
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sigef-final-proyect';
}
