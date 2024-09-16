describe('Caso de Prueba No. 05 - Módulo de Usuario', () => {
  it('Debería mostrar errores de credenciales incorrectas y permitir el acceso con credenciales correctas', () => {
    // Navegar a la página de inicio de sesión
    cy.visit('http://localhost:4200/login');

    // Intentar iniciar sesión con un nombre de usuario y contraseña incorrectos
    cy.get('input[name="email"]').type('pepito');
    cy.screenshot('Campo inválido y tocado');
    cy.get('input[name="password"]').type('bla123');
    cy.get('form')
      .find('button.primary-button')
      .should('be.disabled')
      .and('be.visible');
    cy.screenshot('Botón deshabilitado para iniciar sesión');

    // Intentar iniciar sesión sin ingresar nombre de usuario y contraseña
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get('form')
      .find('button.primary-button')
      .should('be.disabled')
      .and('be.visible');
    cy.screenshot('Botón deshabilitado para iniciar sesión');

    // Ingresar un nombre de usuario y contraseña correctos
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/portal/report'); 
  });
});
