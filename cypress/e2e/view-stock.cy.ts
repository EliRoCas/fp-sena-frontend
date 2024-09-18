describe('Caso de Prueba No. 03 - Módulo de Inventario', () => {
  it('Debería permitir consultar el inventario de agroinsumos y verificar los resultados del filtro', () => {
    // Iniciar sesión
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();

    // Navegar al módulo de Inventario
    cy.url().should('include', '/portal/report');
    cy.get('button[mat-mini-fab]').click(); 
    cy.get('mat-list-item').contains('Inventario').click(); 
    cy.url().should('include', '/portal/stock');
    cy.screenshot('Rediccion a la pagina de inventario');

    // Utilizar el input de filtro para consultar agroinsumos específicos
    cy.get('input[matInput][placeholder="Pesticida"]').type('Pa');

    cy.get('input[matInput][placeholder="Pesticida"]').type('{enter}');

    cy.contains('Pa').should('be.visible'); // Verificar que el producto filtrado sea visible
    cy.screenshot('Filtrado exitoso');
  });
});
