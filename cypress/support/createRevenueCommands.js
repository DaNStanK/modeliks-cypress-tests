/// <reference types="cypress" />

// Create Revenue
Cypress.Commands.add('createGeneralRevenueInfo', () => {
   // Ensure you are on the right page
   cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');

   // Click button for adding revenues  
   cy.get('button')
      .contains('Add Revenue Stream')
      .click({ force: true });
});

// Set General Revenue Info
Cypress.Commands.add('setGeneralRevenueInfo', (name, revenueType) => {
   // Populate Revenue Name input field
   cy.get('#revenueNameInput')
      .type(name);

   // Choose the type of revenue
   cy.get('label')
      .eq(revenueType)
      .find('div')
      .click({ force: true });

   // Assert that the actual checkbox is checked after clicking the custom UI
   cy.get('label')
      .eq(revenueType)
      .find('input[type="checkbox"]')
      .should('be.checked');

   // Click next button
   cy.get('button > span')
      .contains('Next')
      .click();
});

// Set Unit Sales Info
Cypress.Commands.add('setUnitSalesInfo', () => {
   // Click Next button
   cy.get('button')
      .contains('Next')
      .click();
});

// Set Unit Price Info
Cypress.Commands.add('setUnitPriceInfo', () => {
   // Auth API
   cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');

   // Click Next button
   cy.get('button')
      .contains('Save & Close')
      .click();

   // Wait for all fetches to complete
   cy.wait('@chartOfAccounts', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);

   // Assert redirection
   cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
});