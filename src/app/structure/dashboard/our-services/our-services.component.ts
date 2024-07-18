import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../share/card/card.component';


@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
  services = [
    {
      src: '/img/consulting.jpg',
      title: 'Consultoría',
      text: ' Servicios de consultoría para mejorar los procesos financieros basados en la información recopilada y analizada por el software.'
    },
    {
      src: '/img/software-developer.jpg',
      title: 'Software a Medida',
      text: 'Creación de un software a medida, adaptado a las necesidades del cultivo de rosas y sus operaciones financieras.'
    },
    {
      src: '/img/support2.jpg',
      title: 'Mantenimiento',
      text: 'Garantía de actualizaciones periódicas del software, así como mantenimiento preventivo y correctivo adaptado al sector de cultivo de rosas.'
    },
    {
      src: '/img/education.jpg',
      title: 'Educación',
      text: 'Formación detallada para los usuarios finales, enfocada en el uso eficiente del software y sus funcionalidades aplicadas al cultivo de rosas.'
    },
    {
      src: '/img/analysis2.jpg',
      title: 'Consultoría',
      text: ' Ayuda en la interpretación de los datos financieros generados por el software, así como la generación de informes específicos para la gestión del cultivo de rosas.'
    },
    {
      src: '/img/support.jpg',
      title: 'Software a medida',
      text: 'Instalación y configuración del software en las instalaciones del cliente, adaptándolo a sus procesos y requisitos específicos.'
    },
    {
      src: '/img/analysis.jpg',
      title: 'Educación',
      text: 'Implementación de herramientas para el seguimiento y análisis de datos.'
    },
    {
      src: '/img/movil-web.jpg',
      title: 'Software a Medida',
      text: 'Extensión de las funcionalidades de la aplicación web a plataformas móviles.'
    },
  ]
}
