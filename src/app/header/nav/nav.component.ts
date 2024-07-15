import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortalComponent} from '@ea-controls/portal';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, PortalComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  isOpen = false;
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleMenu() {

  }
}
