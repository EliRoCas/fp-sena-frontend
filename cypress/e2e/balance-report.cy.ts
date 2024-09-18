describe('Caso de Prueba No. 09 - Módulo de Administración', () => {
  it('Debería generar y actualizar el diagrama de torta del balance mensual correctamente', () => {
    // Iniciar sesión en la aplicación
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/portal/report');

    // Verificar que el diagrama de torta del balance mensual se muestre en pantalla
    cy.get('apx-chart').should('be.visible');
    cy.get('apx-chart').contains('Ingresos').should('be.visible');
    cy.get('apx-chart').contains('Egresos').should('be.visible');
    cy.screenshot('Diagrama de torta del balance mensual');

    cy.contains('Dinero Gastado').click();
    cy.url().should('include', '/portal/expenses');

    // Agregar un nuevo gasto
    cy.contains('Agregar').click();
    cy.url().should('include', '/portal/register-expense');
    cy.get('input[name="transaction_name"]').type('Arriendo');
    cy.get('select[name="transaction_type"]').select('Egreso');
    cy.get('input[name="transaction_date"]').type('2024-08-08');
    cy.get('input[name="transaction_amount"]').type('100');
    cy.get('input[name="transaction_rose_export"][value="No Aplica"]').check();
    cy.get('select[name="fo_rose_type"]').select('No aplica');
    cy.get('select[name="fo_category"]').select('Arriendo');
    cy.get('input[name="transaction_customer"]').type('Sr.Blanca');
    cy.get('textarea[name="transaction_description"]').type('Pago mes de agosto'); 

    cy.get('form')
      .find('button.primary-button')
      .should('be.enabled')
      .and('be.visible')
      .click();

    // Hacer clic en el ícono del menú
    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Reportes').click();

    // Agregar una nueva transacción
    cy.url().should('include', '/portal/report');
    cy.contains('Dinero de Base').click();
    cy.url().should('include', '/portal/incomes');

    // Agregar un nuevo ingreso
    cy.contains('Agregar').click();
    cy.url().should('include', '/portal/register-income');
    cy.screenshot('Navega al formulario de ingresos');

    cy.get('input[name="transaction_name"]').type('Amor y Amistad');
    cy.get('select[name="transaction_type"]').select('Ingreso');
    cy.get('input[name="transaction_date"]').type('2024-09-22');
    cy.get('input[name="transaction_amount"]').type('5500');
    cy.get('input[name="transaction_rose_export"][value="No"]').check();
    cy.get('select[name="fo_rose_type"]').select('Rosa Roja');
    cy.get('select[name="fo_category"]').select('Agroinsumo');
    cy.get('input[name="transaction_customer"]').type('Infinity');
    cy.get('textarea[name="transaction_description"]').type(
      'Venta de 400 tallos de rosa roja'
    );

    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Reportes').click();

    // Verificar que el diagrama se haya actualizado con la información de la nueva transacción
    cy.get('apx-chart').should('be.visible');
    cy.get('apx-chart').contains('Ingresos').should('be.visible');
    cy.get('apx-chart').contains('Egresos').should('be.visible');
    cy.screenshot('Diagrama de torta actualizado');
  });
});
