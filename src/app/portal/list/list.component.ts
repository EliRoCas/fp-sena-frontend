import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

export interface Section1 {
  url: string;
  title: string;
  icon: string;
}
export interface Section2 {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, MatListModule, MatIconModule, MatDividerModule, MatIconModule, DatePipe, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  links: Section1[] = [
    {
      url: '/portal/user-profile',
      title: "Perfil",
      icon: "fa-user"
    },
    {
      url: '/portal/user-admin',
      title: "Administra Usuarios",
      icon: "fa-users-gear"

    },
    {
      url: '/portal/alert',
      title: 'Notificaciones',
      icon: "fa-bell"
    },
  ];
  notes: Section2[] = [
    {
      name: 'Visita Ingeniero',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Entrega Infinity',
      updated: new Date('1/18/16'),
    },
  ];
}
