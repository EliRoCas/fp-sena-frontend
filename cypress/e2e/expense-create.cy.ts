describe('Caso de Prueba No. 01 - Módulo de Gastos', () => {
  it('Debería permitir agregar un nuevo gasto y verificar su visualización', () => {
    // Iniciar sesión
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();

    // Navegar al módulo de Gastos
    cy.url().should('include', '/portal/report');
    cy.screenshot('Rediccion a la pagina de reportes');
    cy.contains('Dinero Gastado').click();
    cy.url().should('include', '/portal/expenses');
    cy.screenshot('Rediccion a la pagina de gastos');

    // Agregar un nuevo gasto
    cy.contains('Agregar').click();
    cy.url().should('include', '/portal/register-expense');
    cy.screenshot('Rediccion a la pagina de agregar gasto');

    cy.get('input[name="transaction_name"]').type('Compra Abono');
    cy.get('select[name="transaction_type"]').select('Egreso');
    cy.get('input[name="transaction_date"]').type('2024-09-08');
    cy.get('input[name="transaction_amount"]').type('500');
    cy.get('input[name="transaction_rose_export"][value="No Aplica"]').check();
    cy.get('select[name="fo_rose_type"]').select('No aplica');
    cy.get('select[name="fo_category"]').select('Agroinsumo');
    cy.get('input[name="transaction_customer"]').type('Abono SAS');
    cy.get('textarea[name="transaction_description"]').type(
      'Compra 5 kilos de abono'
    );
    cy.screenshot('Datos llenados ');

    cy.get('form')
      .find('button.primary-button')
      .should('be.enabled')
      .and('be.visible')
      .click();
    cy.screenshot('Botón habilitado para guardar');

    // Hacer clic en el ícono del menú
    cy.get('a[routerLink="/portal/report"]').click();
    cy.url().should('include', '/portal/report');

    // Verificar que el gasto se haya agregado a la lista de gastos
    cy.contains('Dinero Gastado').click();
    cy.url().should('include', '/portal/expenses');
    cy.contains('Compra Abono').should('be.visible');
    cy.contains('500').should('be.visible');
    cy.contains('2024-09-08').should('be.visible');
    cy.screenshot('Gassto agregado');
  });
});
