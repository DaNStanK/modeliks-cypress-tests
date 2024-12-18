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
   if (buttonName == null || typeof buttonName != "string") {
      console.log('Invalid or missing button name value. Ensure the value is defined and is a string.');

      throw new Error('Invalid or missing button name value. Ensure the value is defined and is a string.');
   }

   cy.get('button')
      .contains(buttonName)
      .click();
});

// Assert URL
Cypress.Commands.add('expectedUrl', (url) => {
   // Validate input
   if (url == null || typeof url != 'string') {
      console.log('Invalid or missing URL value. Ensure the value is defined and is a string.');

      throw new Error('Invalid or missing URL value. Ensure the value is defined and is a string.');
   }

   cy.url()
      .should('eq', url);
});