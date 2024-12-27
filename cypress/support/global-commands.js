// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

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


// Click button
Cypress.Commands.add('clickButton', (buttonName) => {
   // Validate input
   if (buttonName == null || typeof buttonName !== 'string') {
      console.error('Invalid or missing button name value. Ensure the value is defined and is a string.');
      throw new Error('Invalid or missing button name value. Ensure the value is defined and is a string.');
   }

   // Find the button by its text and click it
   cy.get('button')
      .contains(buttonName)
      .closest('button')
      .click();
});

// Assert URL
Cypress.Commands.add('expectedUrl', (url) => {
   // Validate input
   if (url == null || typeof url !== 'string') {
      console.error('Invalid or missing URL value. Ensure the value is defined and is a string.');
      throw new Error('Invalid or missing URL value. Ensure the value is defined and is a string.');
   }

   // Assert the current URL matches the expected URL
   cy.url()
      .should('eq', url);
});