import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from '../../structure/list/list.component';
import { PortalContentComponent } from '@ea-controls/portal';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    ListComponent,
    PortalContentComponent,
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  showFiller = false;
}