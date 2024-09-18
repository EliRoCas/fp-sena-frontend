describe('Caso de Prueba No. 12 - Módulo de Usuarios', () => {
  it('Debería permitir agregar un nuevo usuario y verificar su visualización', () => {
    // Iniciar sesión
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/portal/report');

    // Navegar al módulo de Administrar Usuario
    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Administrar Usuarios').click();
    cy.url().should('include', '/portal/user-admin');
    cy.screenshot('Redirección a la página de usuarios');

    // Agregar un nuevo usuario
    cy.contains('Agregar').click();
    cy.url().should('include', '/portal/register-user');
    cy.screenshot('Redirección a la página de agregar usuario');

    cy.get('input[name="name"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('select[name="document_type"]').select('CE');
    cy.get('input[name="document_number"]').type('15020105');
    cy.get('select[name="rol"]').select('Capataz');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('input[name="confirmPassword"]').type('Dante123!');
    cy.screenshot('Datos llenados');

    cy.get('form')
      .find('button.primary-button')
      .should('be.enabled')
      .and('be.visible')
      .click();
    cy.screenshot('Botón habilitado para guardar');

    // Verificar que el usuario se haya agregado a la lista de usuarios
    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Administrar Usuarios').click();
    cy.contains('John').should('be.visible');
    cy.contains('Doe').should('be.visible');
    cy.contains('john.doe@example.com').should('be.visible');
    cy.screenshot('Usuario agregado');

    // Eliminar el usuario que se acaba de crear
    cy.contains('tr', 'john.doe@example.com') // Encuentra la fila que contiene el correo electrónico del usuario
      .find('button.text-red-700') // Encuentra el botón de eliminación dentro de esa fila
      .click();
    cy.screenshot('Usuario eliminado');
  });
});
