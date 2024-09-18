describe('Caso de Prueba No. 01 - Módulo de Gastos', () => {
    it('Debería permitir agregar un nuevo gasto y verificar su visualización', () => {
      // Iniciar sesión
      cy.visit('http://localhost:4200/login');
      cy.get('input[name="email"]').type('dante@example.com');
      cy.get('input[name="password"]').type('Dante123!');
         cy.get('button[type="submit"]').click();
  
      // Navegar al módulo de Gastos
      cy.url().should('include', '/portal/report');
          cy.contains('Dinero Gastado').click();
      cy.url().should('include', '/portal/expenses');
    
  
      // Agregar un nuevo gasto
      cy.contains('Agregar').click();
      cy.url().should('include', '/portal/register-expense');
    
  
      cy.get('input[name="transaction_name"]').type('Compra Bombillo');
      cy.get('select[name="transaction_type"]').select('Egreso');
      cy.get('input[name="transaction_date"]').type('2024-02-08');
      cy.get('input[name="transaction_amount"]').type('50');
      cy.get('input[name="transaction_rose_export"][value="No Aplica"]').check();
      cy.get('select[name="fo_rose_type"]').select('No aplica');
      cy.get('select[name="fo_category"]').select('Herramienta');
      cy.screenshot('Seleccion de categoria');
      cy.get('input[name="transaction_customer"]').type('Test');
      cy.get('textarea[name="transaction_description"]').type(
        'Compra bombillo'
      );
  
      cy.get('form')
        .find('button.primary-button')
        .should('be.enabled')
        .and('be.visible')
        .click();
    
  
      // Hacer clic en el ícono del menú
      cy.get('a[routerLink="/portal/report"]').click();
      cy.url().should('include', '/portal/report');
  
      // Verificar que el gasto se haya agregado a la lista de gastos
      cy.contains('Dinero Gastado').click();
      cy.url().should('include', '/portal/expenses');
      cy.contains('Compra Bombillo').should('be.visible');
      cy.contains('50').should('be.visible');
      cy.contains('2024-02-08').should('be.visible');
      cy.screenshot('Gasto agregado');
    });
  });
  