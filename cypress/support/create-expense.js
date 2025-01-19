/// <reference types="cypress" />

// Custom Cypress command to set the expenses function in the input field
Cypress.Commands.add("setExpenseFunction", (expenseFunction) => {
   // Validate that expenseFunction is a non-empty string
   if (typeof expenseFunction !== 'string' || expenseFunction.trim() === '') {
      throw new Error('Invalid expense function. It must be a non-empty string.');
   }

   // Find the input field for the expense function and check the provided function
   cy.get('div[role="dialog"] span')
      .contains('Expenses function')
      .closest('div') // Get the closest div
      .parent('div') // Move to the parent of the closest div
      .find('div.grid-cols-2 label') // Continue finding the child elements
      .contains(expenseFunction)
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});

// Custom Cypress command to set the enter type in the input field
Cypress.Commands.add("setEnterType", (enterType) => {
   // Validate that enter type is a non-empty string
   if (typeof enterType !== 'string' || enterType.trim() === '') {
      throw new Error('Invalid enter type. It must be a non-empty string.');
   }

   // Find the input field for the enter type and check the provided type
   cy.get('div[role="dialog"] span')
      .contains('How will you enter the value for this expense?')
      .closest('div')
      .find('div label')
      .contains(enterType)
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});