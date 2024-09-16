describe('Caso de Prueba No. 04 - Módulo del Área de Finanzas (Reportes)', () => {
  it('Debería generar resúmenes de transacciones y verificar su visualización', () => {
    // Iniciar sesión
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();

    // Navegar al módulo de Finanzas
    cy.url().should('include', '/portal/report');
    // Verificar resumen de gastos
    cy.contains('Dinero Gastado').click();
    cy.url().should('include', '/portal/expenses');

    // Verificar resumen de ventas
    cy.get('a[routerLink="/portal/report"]').click();
    cy.url().should('include', '/portal/report');
    cy.contains('Dinero de Base').click();
    cy.url().should('include', '/portal/incomes');

    // Ingresar al módulo de Gastos desde el menú
    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Gastos').click();
    cy.url().should('include', '/portal/expenses');
    cy.screenshot('Resúmenes de transacciones venta');

    // Ingresar al módulo de Ventas desde el menú
    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Ventas').click();
    cy.url().should('include', '/portal/incomes');
    cy.screenshot('Resúmenes de transacciones venta');
  });
});
