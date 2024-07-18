import { Component } from '@angular/core';
import { CardComponent } from '../../../share/card/card.component';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
strategicPlaning = [
  {
    src: "/img/facts-bg.jpg",
    title: "Misión",
    text: "Ofrecer un software intuitivo y eficiente que brinde a las empresas de cultivo de rosas una solución integral para la gestión financiera. Nuestro compromiso es proporcionar herramientas versátiles y de fácil acceso que permitan administrar, analizar y controlar las operaciones financieras, optimizando así la toma de decisiones estratégicas y asegurando un manejo efectivo de los recursos."

  },
  {
    src:'/img/coins-support.jpg',
    title: 'Visión',
    text: 'Ser el aliado de confianza para las empresas de cultivo de rosas, destacando como la solución líder en gestión financiera. Nos esforzamos por continuar desarrollando un software innovador, adaptable y orientado a las necesidades cambiantes del sector, consolidando nuestra posición como referente en el impulso del crecimiento económico y la eficiencia operativa en la industria de la floricultura.',
  },
  {
    src:'/img/meeting-02.jpg',
    title: 'Alcance',
    text: 'SiGef garantiza la seguridad y protección de datos, cumpliendo con las normativas legales y brindando la posibilidad de exportar reportes en formatos PDF para su fácil acceso y distribución. Con una interfaz intuitiva y amigable con el usuario, que propende por la accesibilidad, el software será una herramienta fundamental para mejorar la eficiencia en la gestión financiera y el crecimiento de los negocios.'
  }
]
}
