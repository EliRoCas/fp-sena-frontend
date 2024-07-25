import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PortalComponent, PortalContentComponent } from '@ea-controls/portal';
import { LayoutComponent } from '@ea-controls/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
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
    RouterOutlet
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {

  drawer = input.required<MatDrawer>()
  // isOpen = false;
  // isDarkMode = false;

  // toggleDarkMode() {
  //   this.isDarkMode = !this.isDarkMode;
  //   if (this.isDarkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }

  // toggleMenu() {

  // }
}
