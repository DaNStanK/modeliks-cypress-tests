/// <reference types="cypress" />

// Custom Cypress command to set the type of tax
Cypress.Commands.add("setTaxType", (taxType) => {
   // Ensure that a parameter is provided
   if (taxType === undefined || taxType === null) {
      throw new Error('Tax type parameter is required.');
   }

   // Validate that taxType is a string
   if (typeof taxType !== 'string') {
      throw new Error('Invalid tax type. It must be a string.');
   }

   // Find the input field for the tax type and check the provided type
   cy.get('label')
      .contains(taxType)
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});