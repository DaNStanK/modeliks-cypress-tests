// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// Login
Cypress.Commands.add('login', (username, password) => {

   // Auth API
   cy.intercept('POST', `/api/auth`).as('loginUser');
   cy.intercept('POST', `/api/init`).as('initUser');

   // Visit login page
   cy.visit(`/`);

   // Insert username
   cy.get('input').eq(0).type(`${username}`);

   // Insert password
   cy.get('input').eq(1).type(`${password}`);

   // Click the login button
   cy.get('button').eq(1).click();

   // Wait for all fetches to complete
   cy.wait('@loginUser', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);

   cy.wait('@initUser', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);

   // Should be redirected to forecast / revenues section;
   cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
});








// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })