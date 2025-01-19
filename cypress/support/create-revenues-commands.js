/// <reference types="cypress" />

import { company } from "../fixtures/company.json";

// Populate Revenue Name input field
Cypress.Commands.add('setRevenueName', (revenueName) => {
   // Validate input
   if (revenueName == null || typeof revenueName !== 'string') {
      throw new Error('Invalid or missing revenue name. Ensure the revenue name is populated as a parameter in the function and is a string.');
   }

   // Populate Revenue Name input field
   cy.get('input[name="streamName"]')
      .clear() // Clear any existing value
      .type(revenueName); // Type the new revenue name
});

// Choose the type of revenue
Cypress.Commands.add('chooseRevenueType', (index) => {
   // Validate input
   if (index == null || typeof index !== 'number') {
      throw new Error('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is a number.');
   }

   // Choose the revenue type based on the index
   cy.get('div[role="dialog"] label')
      .eq(index)
      .find('input[type="checkbox"]')
      .click({ force: true });
});

// Assert Revenue type
Cypress.Commands.add('assertRevenueType', (index) => {
   // Validate input
   if (index == null || typeof index !== 'number') {
      throw new Error('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is a number.');
   }

   // Assert that the checkbox for the revenue type is checked
   cy.get('div[role="dialog"] label')
      .eq(index)
      .find('input[type="checkbox"]')
      .should('be.checked');
});