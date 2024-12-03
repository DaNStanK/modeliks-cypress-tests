/// <reference types="cypress" />

// Login
Cypress.Commands.add('loginUser', (username, password) => {

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
});