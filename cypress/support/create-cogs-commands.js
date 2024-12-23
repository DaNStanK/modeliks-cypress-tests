/// <reference types="cypress" />

// Populate Revenue Name input field
Cypress.Commands.add('setCostOfGoodsName', (name) => {
   // Validate input
   if (name == null || typeof name !== 'string') {
      throw new Error('Invalid or missing revenue name. Ensure the revenue name is populated as a parameter in the function and is a string.');
   }

   // Populate Revenue Name input field
   cy.get('input[name="streamName"]')
      .clear() // Clear any existing value
      .type(name); // Type the new revenue name
});

// Choose the COGS relation
Cypress.Commands.add('selectRelation', (relation) => {
   // Validate input
   if (relation == null || typeof relation !== 'string') {
      throw new Error('Invalid or missing relation. Ensure the relation is populated as a parameter in the function and is a string.');
   }

   // Click on the relation dropdown
   cy.get('[role="dialog"] .dropdown')
      .click();

   // Select the relation from the dropdown
   cy.get('div.cursor-pointer * span')
      .contains(relation)
      .click();
});

// Choose the type of cost
Cypress.Commands.add('selectTypeOfCost', (type) => {
   // Validate input
   if (type == null || typeof type !== 'string') {
      throw new Error('Invalid or missing type of cost. Ensure the type of cost is populated as a parameter in the function and is a string.');
   }

   // Adjust the type to match the checkbox index
   const adjustedType = type.toLowerCase() === 'cost per unit sold' ? 0 : 1;


   // Check the type of cost checkbox if not already checked
   cy.get('div.flex.flex-col.gap-4 div.flex.flex-col.gap-4')
      .eq(1)
      .find('label input[role="checkbox"]')
      .eq(adjustedType)
      .then(($checkbox) => {
         if (!$checkbox.prop('checked')) {
            cy.get('div.flex.flex-col.gap-4 div.flex.flex-col.gap-4')
               .eq(1)
               .find('label input[role="checkbox"]')
               .eq(adjustedType)
               .check({ force: true });
         }
      });
});
