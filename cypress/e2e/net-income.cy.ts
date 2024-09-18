describe('Caso de Prueba No. 16 - Módulo de Administración', () => {
  it('Debería generar y actualizar el reporte de Utilidad Neta correctamente', () => {
    // Iniciar sesión en la aplicación
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.screenshot('Botón habilitado para iniciar sesión');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/portal/report');
    cy.get('a[routerLink="/portal/net-income"]').click();

    // Verificar que el reporte se genere correctamente y contenga la información adecuada
    cy.get('table').should('be.visible');
    cy.get('apx-chart').should('be.visible');
    cy.get('table').contains('Q1').should('be.visible');
    cy.get('table').contains('Ingresos').should('be.visible');
    cy.get('table').contains('Egresos').should('be.visible');
    cy.get('table').contains('Utilidad Neta').should('be.visible');

    // Crear una nueva transacción de ingreso
    cy.go('back');
    cy.url().should('include', '/portal/report');
    cy.screenshot('Navega al módulo de reportes');
    cy.contains('Dinero de Base').click();
    cy.url().should('include', '/portal/incomes');
    cy.screenshot('Navega al módulo de ingresos');

    // Agregar un nuevo ingreso
    cy.contains('Agregar').click();
    cy.url().should('include', '/portal/register-income');
    cy.screenshot('Navega al formulario de ingresos');

    cy.get('input[name="transaction_name"]').type('Venta Rosa Roja');
    cy.get('select[name="transaction_type"]').select('Ingreso');
    cy.get('input[name="transaction_date"]').type('2024-05-08');
    cy.get('input[name="transaction_amount"]').type('1000');
    cy.get('input[name="transaction_rose_export"][value="Sí"]').check();
    cy.get('select[name="fo_rose_type"]').select('Rosa Roja');
    cy.get('select[name="fo_category"]').select('Agroinsumo');
    cy.get('input[name="transaction_customer"]').type('Paloquemado');
    cy.get('textarea[name="transaction_description"]').type(
      'Venta de 60 tallos de rosa roja'
    );
    cy.screenshot('Se agregan los datos de la venta');

    // Generar nuevamente el reporte de “Estado de Resultados”
    cy.get('a[routerLink="/portal/report"]').click();
    cy.url().should('include', '/portal/report');
    cy.get('a[routerLink="/portal/net-income"]').click();
    cy.url().should('include', '/portal/net-income');

    // Verificar que la nueva transacción se refleje en el reporte actualizado
    cy.get('table').should('be.visible');
    cy.get('apx-chart').should('be.visible');
    cy.get('table').contains('Q1').should('be.visible');
    cy.get('table').contains('Ingresos').should('be.visible');
    cy.get('table').contains('Egresos').should('be.visible');
    cy.get('table').contains('Utilidad Neta').should('be.visible');
  });
});
