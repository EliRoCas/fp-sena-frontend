describe('Caso de Prueba No. 02 - Módulo de Ventas', () => {
  it('Debería permitir agregar una nueva venta y verificar su visualización', () => {
    // Iniciar sesión
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.screenshot('Se habilita el botón de inicio de sesión');
    cy.get('button[type="submit"]').click();

    // Navegar al módulo de Ventas
    cy.url().should('include', '/portal/report');
    cy.screenshot('Navega al módulo de reportes');
    cy.contains('Dinero de Base').click();
    cy.url().should('include', '/portal/incomes');
    cy.screenshot('Navega al módulo de ingresos');

    // Agregar un nuevo ingreso
    cy.contains('Agregar').click();
    cy.url().should('include', '/portal/register-income');
    cy.screenshot('Navega al formulario de ingresos');

    cy.get('input[name="transaction_name"]').type('Venta Mondial');
    cy.get('select[name="transaction_type"]').select('Ingreso');
    cy.get('input[name="transaction_date"]').type('2024-09-08');
    cy.get('input[name="transaction_amount"]').type('1500');
    cy.get('input[name="transaction_rose_export"][value="Sí"]').check();
    cy.get('select[name="fo_rose_type"]').select('Rosa Mondial');
    cy.get('select[name="fo_category"]').select('Agroinsumo');
    cy.get('input[name="transaction_customer"]').type('Infinity');
    cy.get('textarea[name="transaction_description"]').type(
      'Venta de 80 tallos de rosa mondial'
    );
    cy.screenshot('Se agregan los datos de la venta');

    cy.get('form')
      .find('button.primary-button')
      .should('be.enabled')
      .and('be.visible')
      .click();
    cy.screenshot('Se habilita el botón de guardar');

    // Hacer clic en el ícono del menú
    cy.get('button[mat-mini-fab]').click();

    // Seleccionar "Ventas" del menú
    cy.get('mat-list-item').contains('Ventas').click();

    // Verificar que el gasto se haya agregado a la lista de ventas
    cy.url().should('include', '/portal/incomes');
    cy.contains('Venta Mondial').should('be.visible');
    cy.contains('1500').should('be.visible');
    cy.contains('2024-09-08').should('be.visible');
    //   cy.contains('Rosa Mondial').should('be.visible');
    cy.screenshot('Se visualiza la venta en la lista');
  });
});
