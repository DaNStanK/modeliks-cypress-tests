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

// Find the COGS in the table
Cypress.Commands.add('findCogs', (cogsName) => {
   // Validate input
   if (cogsName == null || typeof cogsName !== 'string') {
      throw new Error('Invalid or missing COGS name. Ensure the COGS name is populated as a parameter in the function and is a string.');
   }

   // Find the COGS in the table
   cy.get('table tbody tr')
      .contains(cogsName)
      .closest('tr')
      .should('exist');
});

// Find business unit of the COGS in the table
Cypress.Commands.add('findBusinessUnit', (cogsName, buName) => {
   // Validate input
   if (cogsName == null || typeof cogsName !== 'string') {
      throw new Error('Invalid or missing COGS name. Ensure the COGS name is populated as a parameter in the function and is a string.');
   }
   if (cogsName == null || typeof cogsName !== 'string') {
      throw new Error('Invalid or missing business unit name. Ensure the business unit name is populated as a parameter in the function and is a string.');
   }

   // Find the COGS in the table
   cy.findCogs(cogsName)
      .nextAll() // Get all subsequent siblings
      .filter(index => index < 2) // Get the first two siblings
      .contains(buName) // Find the row with the business unit row title
      .closest('tr') // Find the row with the row title
      .should('exist'); // Ensure the row exists
});

// Find subunit of a business unit from COGS in the table
Cypress.Commands.add('findSubUnit', (cogsName, buName, suName) => {
   // Validate input
   if (cogsName == null || typeof cogsName !== 'string') {
      throw new Error('Invalid or missing COGS name. Ensure the COGS name is populated as a parameter in the function and is a string.');
   }
   if (cogsName == null || typeof cogsName !== 'string') {
      throw new Error('Invalid or missing business unit name. Ensure the business unit name is populated as a parameter in the function and is a string.');
   }
   if (suName == null || typeof suName !== 'string') {
      throw new Error('Invalid or missing subunit name. Ensure the subunit name is populated as a parameter in the function and is a string.');
   }

   // Find the COGS in the table
   cy.findBusinessUnit(cogsName, buName)
      .nextAll() // Get all subsequent siblings
      .filter(index => index < 2) // Get the first two siblings
      .contains(suName) // Find the row with the business unit row title
      .closest('tr') // Find the row with the row title
      .should('exist'); // Ensure the row exists
});

// Check the company value
Cypress.Commands.add('checkCompanyValue', (rowTitle, cellIndex, value) => {
   // Validate inputs
   if (rowTitle == null || typeof rowTitle !== 'string') {
      throw new Error('Invalid or missing row title. Ensure the row title is populated as a parameter in the function and is a string.');
   }
   if (cellIndex == null || typeof cellIndex !== 'number') {
      throw new Error('Invalid or missing cell index. Ensure the cell index is populated as a parameter in the function and is a number.');
   }
   if (value == null || typeof value !== 'number') {
      throw new Error('Invalid or missing value. Ensure the value is populated as a parameter in the function and is a number.');
   }

   // Determine cell index (accounting for different table structures)
   const adjustedCellIndex = cellIndex <= 13 ? cellIndex : cellIndex - 10;


   cy.findCogs(rowTitle)
      .find('td') // Find all td elements within the row
      .eq(adjustedCellIndex) // Target the desired cell in the row
      .should('contain', Number(value).toLocaleString()); // Assert the cell's value

});

// Check the business unit value
Cypress.Commands.add('checkBusinessUnitValue', (rowTitle, buName, cellIndex, value) => {
   // Validate inputs
   if (rowTitle == null || typeof rowTitle !== 'string') {
      throw new Error('Invalid or missing row title. Ensure the row title is populated as a parameter in the function and is a string.');
   }
   if (buName == null || typeof buName !== 'string') {
      throw new Error('Invalid or missing business unit name. Ensure the value is populated as a parameter in the function and is a string.');
   }
   if (cellIndex == null || typeof cellIndex !== 'number') {
      throw new Error('Invalid or missing cell index. Ensure the cell index is populated as a parameter in the function and is a number.');
   }
   if (value == null || typeof value !== 'number') {
      throw new Error('Invalid or missing value. Ensure the value is populated as a parameter in the function and is a number.');
   }

   // Determine cell index (accounting for different table structures)
   const adjustedCellIndex = cellIndex <= 13 ? cellIndex : cellIndex - 10;

   cy.findBusinessUnit(rowTitle, buName)
      .find('td') // Find all td elements within the row
      .eq(adjustedCellIndex) // Target the desired cell in the row
      .should('contain', Number(value).toLocaleString()); // Assert the cell's value

});

// Check the business unit value
Cypress.Commands.add('checkSubUnitValue', (rowTitle, buName, suName, cellIndex, value) => {
   // Validate inputs
   if (rowTitle == null || typeof rowTitle !== 'string') {
      throw new Error('Invalid or missing row title. Ensure the row title is populated as a parameter in the function and is a string.');
   }
   if (buName == null || typeof buName !== 'string') {
      throw new Error('Invalid or missing business unit name. Ensure the value is populated as a parameter in the function and is a string.');
   }
   if (suName == null || typeof suName !== 'string') {
      throw new Error('Invalid or missing subunit name. Ensure the value is populated as a parameter in the function and is a string.');
   }
   if (cellIndex == null || typeof cellIndex !== 'number') {
      throw new Error('Invalid or missing cell index. Ensure the cell index is populated as a parameter in the function and is a number.');
   }
   if (value == null || typeof value !== 'number') {
      throw new Error('Invalid or missing value. Ensure the value is populated as a parameter in the function and is a number.');
   }

   // Determine cell index (accounting for different table structures)
   const adjustedCellIndex = cellIndex <= 13 ? cellIndex : cellIndex - 10;

   // Check the value
   cy.findSubUnit(rowTitle, buName, suName)
      .find('td') // Find all td elements within the row
      .eq(adjustedCellIndex) // Target the desired cell in the row
      .should('contain', Number(value).toLocaleString()); // Assert the cell's value

});

// Expand business unit row
Cypress.Commands.add('expandBusinessUnit', (rowTitle, buName) => {
   // Validate inputs
   if (rowTitle == null || typeof rowTitle !== 'string') {
      throw new Error('Invalid or missing row title. Ensure the row title is populated as a parameter in the function and is a string.');
   }
   if (buName == null || typeof buName !== 'string') {
      throw new Error('Invalid or missing business unit name. Ensure the value is populated as a parameter in the function and is a string.');
   }

   // Expand the row
   cy.findBusinessUnit(rowTitle, buName)
      .find('td') // Find all td elements within the row
      .eq(0) // Select the first td element
      .find('svg.cursor-pointer') // Find the svg element with the cursor-pointer class
      .click(); // Click to expand the row
});

