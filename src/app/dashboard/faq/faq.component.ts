import { Component } from '@angular/core';
import { QuestionCardComponent } from './question-card/question-card.component';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [QuestionCardComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  questions = [
    {
      title: '¿Cómo puedo acceder al sistema?',
      text: 'Para acceder al sistema, debes estar registrado. Ingresa tu nombre de usuario y contraseña en la pantalla de inicio de sesión.'
    },
    {
      title: '¿Qué debo hacer si olvido mi contraseña?',
      text: 'Si olvidas tu contraseña, puedes utilizar la opción de "Recuperar Contraseña" en la pantalla de inicio de sesión para restablecerla mediante tu correo electrónico registrado.'
    },
    {
      title: '¿Puedo explorar el sistema sin estar registrado?',
      text: 'No, el sistema requiere que todos los usuarios estén registrados y autenticados para poder acceder a sus funcionalidades.'
    },
    {
      title: '¿Qué funciones puedo realizar en la página sin estar registrado?',
      text: 'Generalmente, sin estar registrado, podrías explorar información pública, acceder a secciones informativas y contactar al administrador o soporte técnico.'
    },
    {
      title: '¿Cómo puedo proteger mi información personal en la página?',
      text: 'Puedes proteger tu información personal mediante el uso de contraseñas seguras, evitando compartir tus credenciales y manteniendo tu software y dispositivos actualizados.'
    },
    {
      title: '¿Cómo puedo contactar al administrador del sistema?',
      text: 'Puedes contactar al administrador del sistema a través de la información de contacto proporcionada en la página de inicio de sesión o mediante el departamento de soporte técnico de tu organización.'
    },
    {
      title: '¿Qué incluye el servicio de Desarrollo y Personalización del Software?',
      text: 'El servicio de Desarrollo y Personalización del Software incluye la creación de un software a medida, adaptado a las necesidades específicas del usuario.'
    }
  ]

  registerQuestions = [
    {
      title: '¿Quién puede agregar nuevos usuarios al sistema?',
      text: 'Solo el administrador del sistema tiene la capacidad de agregar nuevos usuarios.'
    },
    {
      title: '¿Cómo puedo editar la información de un usuario?',
      text: 'El administrador del sistema puede editar la información de los usuarios desde el panel de administración de usuarios.'
    },
    {
      title: '¿Es posible eliminar usuarios del sistema?',
      text: 'Sí, el administrador tiene la capacidad de eliminar usuarios del sistema cuando sea necesario.'
    },
    {
      title: '¿Puedo consultar la lista de usuarios registrados?',
      text: 'Sí, el administrador del sistema puede consultar y ver la lista completa de usuarios registrados.'
    },
    {
      title: '¿Qué tipos de reportes financieros puedo generar?',
      text: 'Puedes generar reportes de estados de resultados, balances entre periodos, reportes de utilidad neta, y reportes de inventario de agroinsumos.'
    },
    {
      title: '¿Puedo exportar los reportes generados?',
      text: 'Sí, el sistema permite exportar los reportes, balances y listas de transacciones en formato PDF.'
    },
    {
      title: '¿Cómo puedo filtrar la información en los reportes?',
      text: 'El sistema ofrece filtros para personalizar la generación de reportes según fecha, categoría y otros criterios relevantes.'
    },
    {
      title: '¿Qué información se incluye en los resúmenes de transacciones?',
      text: 'Los resúmenes de transacciones incluyen detalles por categorías y fechas, así como reportes de ingresos y egresos basados en ventas y gastos.'
    },
    {
      title: '¿Puedo crear mis propias categorías de transacciones?',
      text: 'Sí, el sistema permite la clasificación de transacciones en categorías predefinidas o personalizadas.'
    },
    {
      title: '¿Cómo puedo registrar un gasto en el sistema?',
      text: 'Puedes agregar información sobre un gasto, incluyendo imágenes y datos, a través del formulario de registro de gastos.'
    },
    {
      title: '¿Qué opciones tengo para gestionar las categorías de gastos?',
      text: 'Puedes seleccionar entre categorías preexistentes, así como editar, eliminar o agregar nuevas categorías según tus necesidades.'
    },
    {
      title: '¿Qué formatos de información de ventas puedo cargar?',
      text: 'El sietema permite cargar información de ventas en diferentes formatos incluyendo imágenes y texto'
    },
    {
      title: '¿Puedo editar la información de una venta después de haberla registrado?',
      text: 'Sí, tienes la capacidad de editar la información de una venta si algún dato es incorrecto.'
    },
    {
      title: '¿Cómo puedo registrar y actualizar el inventario de agroinsumos?',
      text: 'Puedes registrar nuevos agroinsumos y actualizar su cantidad a través del módulo de inventario.'
    },
  ]
}
