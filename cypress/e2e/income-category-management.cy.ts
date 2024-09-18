describe('Caso de Prueba - Módulo de Categorías', () => {
  it('Debería permitir agregar, editar y eliminar una categoría', () => {
    // Iniciar sesión
    cy.visit('http://localhost:4200/login');
    cy.get('input[name="email"]').type('dante@example.com');
    cy.get('input[name="password"]').type('Dante123!');
    cy.get('button[type="submit"]').click();

    // Navegar al módulo de Categorías
    cy.url().should('include', '/portal/report');
    cy.get('button[mat-mini-fab]').click();
    cy.get('mat-list-item').contains('Categorías').click();
    cy.contains('Categorías').click();
    cy.url().should('include', '/portal/categories');
    cy.screenshot('Redirección a la página de categorías');

    // Agregar una nueva categoría
    cy.contains('Agregar').click();
    cy.screenshot('Formulario emergente de agregar categoría abierto');

    cy.get('input[name="category_name"]').type('Mascotas');
    cy.screenshot('Datos de la categoría llenados');

    cy.get('button.secundary-button-main')
      .should('be.enabled')
      .and('be.visible')
      .click();
    cy.screenshot('Botón habilitado para guardar');

    // Verificar que la categoría se haya agregado a la lista de categorías
    cy.contains('Mascotas').should('be.visible');
    cy.screenshot('Categoría agregada');

    // Editar la categoría
    cy.contains('tr', 'Mascotas').find('button.text-blue-700').click();
    cy.get('input[name="category_name"]').clear().type('Categoría Editada');
    cy.screenshot('Datos de la categoría editados');

    cy.get('button.secundary-button-main')
      .should('be.enabled')
      .and('be.visible')
      .click();

    // Verificar que la categoría se haya actualizado
    cy.contains('Categoría Editada').should('be.visible');
    cy.screenshot('Categoría editada');

    // Eliminar la categoría
    cy.contains('tr', 'Categoría Editada').find('button.text-red-700').click();
    cy.screenshot('Datos de la categoría editados');

    // Verificar que la categoría se haya eliminado de la lista
    cy.contains('Categoría Editada').should('not.exist');
    cy.screenshot('Verificación de categoría eliminada');
  });
});
