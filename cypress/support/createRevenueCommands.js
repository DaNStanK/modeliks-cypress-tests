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
Cypress.Commands.add('setGeneralRevenueInfo', (revenueType) => {
   // Populate Revenue Name input field
   cy.get('#revenueNameInput')
      .type(revenueType.name);

   // Choose the type of revenue
   if (revenueType.value === 2) {
      cy.get('div[class="sc-dhKdcB buTVds"] label')
         .eq(revenueType.value)
         .find('div')
         .click({ force: true });

      // Assert that the actual checkbox is checked after clicking the custom UI
      cy.assertRevenueType(revenueType.value);

      // Type Subscription plan name
      cy.get('[placeholder="!!Enter name for your subscription plan"]')
         .type(revenueType.subscription_plan_name);

      // Choose Subscription period
      cy.get('[class="px-6 py-2 border border-gray-200 bg-grey-light-1 rounded-md"] button')
         .eq(0)
         .click();

      // Choose the 6 month period
      cy.get('div[class="absolute top-0 right-0 bottom-0 left-0"]')
         .eq(revenueType.subscription_plan)
         .click();
   } else {
      cy.get('div[class="sc-dhKdcB buTVds"] label')
         .eq(revenueType.value)
         .find('div')
         .click({ force: true });

      // Assert that the actual checkbox is checked after clicking the custom UI
      cy.assertRevenueType(revenueType.value);
   }

   // Click next button
   cy.get('button > span')
      .contains('Next')
      .click();
});

// Assert Revenue type
Cypress.Commands.add('assertRevenueType', (revenueType) => {
   cy.get('div[class="sc-dhKdcB buTVds"] label')
      .eq(revenueType)
      .find('input[type="checkbox"]')
      .should('be.checked');
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