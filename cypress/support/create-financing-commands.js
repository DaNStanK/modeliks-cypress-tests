/// <reference types="cypress" />

// Add a custom Cypress command to set the interest rate
Cypress.Commands.add('setInterestRate', (interestRate) => {
   // Validate input
   if (interestRate == null || typeof interestRate !== 'number') {
      throw new Error('Invalid or missing interest rate value. Ensure the interest rate is populated as a parameter in the function and is a number.');
   }

   // Log the action for debugging purposes
   cy.log(`Setting interest rate to ${interestRate}`);

   // Populate the Interest Rate input field
   cy.get('label')
      .contains('Interest Rate')
      .parent('div')
      .find('input[type="number"]')
      .should('be.visible') // Ensure the input field is visible
      .clear() // Clear any existing value
      .type(interestRate) // Type the new interest rate
      .should('have.value', interestRate); // Verify the input value
});