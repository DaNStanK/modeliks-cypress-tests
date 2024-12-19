/// <reference types="cypress" />

import { company } from "../fixtures/company.json";

// Helper function to validate inputs
const validateInputs = (rowIndex, cellIndex, value) => {
   if (rowIndex == null || rowIndex < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      console.log(`Invalid value type. Expected a number but received: ${value}`);

      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }
};

// Select advance settings
Cypress.Commands.add('chooseAdvanceSettings', () => {
   // Find and click the "Advance settings" button
   cy.get('p')
      .contains("Advanced Settings")
      .click();

   // Assert if the popup appears by asserting title fo the popup
   cy.get('h2')
      .contains('Advanced Settings')
      .should('exist');
});

// Choose planning level
Cypress.Commands.add('choosePlanningLevel', (planningLevel) => {
   // Validate input
   if (planningLevel == null || typeof planningLevel != 'string') {
      console.log('Invalid or missing name of planning level. Ensure the value is defined and is not a string');

      throw new Error('Invalid or missing name of planning level. Ensure the value is defined and is not a string');
   }

   // Click the planning level dropdown
   cy.get('button') // Finds dropdown field
      .contains('Level 1') // That has an HTML text "Level 1"
      .click({ force: true });

   // Choose from the dropdown options
   cy.get('div.dropdown.relative div.origin-top-left.absolute')
      .eq(1)
      .contains(planningLevel)
      .click({ force: true });

   // Assert chosen planning level 
   cy.get('button span span.overflow-hidden') // Finds dropdown field
      .contains(planningLevel) // That has an HTML text [Planning level]
      .should('exist');
});

// Select allocation methodology
Cypress.Commands.add('setAllocationMethodology', (methodology) => {
   // Validate input
   if (methodology == null || typeof methodology != 'string') {
      console.log('Invalid or missing name of methodology. Ensure the methodology value is populated as a parameter in the function and is not a number');

      throw new Error('Invalid or missing name of methodology. Ensure the methodology value is populated as a parameter in the function and is not a number');
   }

   // Click the methodology dropdown 
   cy.contains('span', 'do not allocate') // Find the span with the text
      .parent() // Get its immediate parent (span)
      .parent('button') // Selects the parent button
      .click();

   // Choose from the dropdown options
   cy.get('div.dropdown.relative div.origin-top-left.absolute')
      .contains(methodology)
      .click({ force: true });

   // Assert chosen methodology 
   cy.contains('span', methodology) // Find the span with the text
      .parent() // Get its immediate parent (span)
      .parent('button') // Selects the parent button
      .should('exist');
});


// Populate Revenue Name input field
Cypress.Commands.add('setRevenueName', (revenueName) => {
   // Validate input
   if (revenueName == null || typeof revenueName != 'string') {
      console.log('Invalid or missing revenue name. Ensure the revenue name is populated as a parameter in the function and is not a number');

      throw new Error('Invalid or missing revenue name. Ensure the revenue name is populated as a parameter in the function and is not a number');
   }

   // Populate Revenue Name input field
   cy.get('#revenueNameInput')
      .type(revenueName);
});

// Choose the type of revenue
Cypress.Commands.add('chooseRevenueType', (revenueType) => {
   // Validate input
   if (revenueType == null || typeof revenueType != 'object') {
      console.log('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is an object');

      throw new Error('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is an object');
   }

   // Check if subscription revenue was selected
   if (revenueType.index === 2) {
      cy.get('div[class="sc-dhKdcB buTVds"] label')
         .eq(revenueType.index)
         .find('div')
         .click({ force: true });

      // Assert that the actual checkbox is checked after clicking the custom UI
      cy.assertRevenueType(revenueType.index);

      // Type Subscription plan name
      cy.get('[placeholder="!!Enter name for your subscription plan"]')
         .type(revenueType.subscription_plan_name);

      // Choose Subscription period
      cy.get('[class="px-6 py-2 border border-gray-200 bg-grey-light-1 rounded-md"] button')
         .eq(0)
         .click();

      // Choose the 6 month period
      cy.get('div[class="absolute top-0 right-0 bottom-0 left-0"]')
         .eq(revenueType.subscription_plan_index)
         .click();
   } else {
      cy.get('div[class="sc-dhKdcB buTVds"] label')
         .eq(revenueType.index)
         .find('div')
         .click({ force: true });
   }
});

// Assert Revenue type
Cypress.Commands.add('assertRevenueType', (revenueType) => {
   // Validate input
   if (revenueType == null || typeof revenueType != 'number') {
      console.log('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is a number');

      throw new Error('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is a number');
   }
   cy.get('div[class="sc-dhKdcB buTVds"] label')
      .eq(revenueType)
      .find('input[type="checkbox"]')
      .should('be.checked');
});

// Click on apply to all fields button 
Cypress.Commands.add('applyToAllFields', (row, month) => {
   // Validate inputs
   if (row == null || row < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (month == null || month < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   // Check if it is on level 1 or not
   cy.get(`.scdi_info_dialog_div * table tbody tr.text-xs.group.false`).then(rows => {
      const rowsCount = rows.length;
      // Check if the table has more than two rows
      if (rowsCount <= 2) {
         // Click the button to apply value on all of the remaining fields
         if (month > 12) {
            cy.get(`.scdi_info_dialog_div * table tbody tr[data-rowdataindex='0'] td:nth-of-type(${month - 10}) .m-round-button`)
               .click({ force: true });
         } else {
            cy.get(`.scdi_info_dialog_div * table tbody tr[data-rowdataindex='0'] td:nth-of-type(${month + 1}) .m-round-button`)
               .click({ force: true });
         }
      } else {
         // Click the button to apply value on all of the remaining fields
         if (month > 12) {
            cy.get(`.scdi_info_dialog_div * table tbody tr[data-rowdataindex=${row}] td:nth-of-type(${month - 10}) .m-round-button`)
               .click({ force: true });
         } else {
            cy.get(`.scdi_info_dialog_div * table tbody tr[data-rowdataindex=${row}] td:nth-of-type(${month + 1}) .m-round-button`)
               .click({ force: true });
         }
      }
   });
});

Cypress.Commands.add('findCell', (row, cell) => {
   // Validate inputs
   if (row == null || row < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cell == null || cell < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   // Set table cell value according to the assigned row, cell and value
   cy.get('.scdi_info_dialog_div * table tbody tr.text-xs.group.false')
      .eq(row) // Select the desired row.
      .find('td')
      .eq(cell) // Select the desired cell.
      .dblclick('bottomRight')
      .find('input')
      .should('be.visible');
});

Cypress.Commands.add('editTableCell', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      console.log(`Invalid value type. Expected a number but received: ${value}`);

      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Check if it is on level 1 or not
   cy.get(`.scdi_info_dialog_div * table tbody tr.text-xs.group.false`).then(rows => {
      const rowsCount = rows.length;

      if (rowsCount <= 2) {
         if (cellIndex <= 12) {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex - 1, cellIndex,)
               .clear()
               .type(`${value}{enter}`);
         } else {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex - 1, cellIndex - 10)
               .clear()
               .type(`${value}{enter}`);
         }
      } else {
         if (cellIndex <= 12) {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex, cellIndex)
               .clear()
               .type(`${value}{enter}`);
         } else {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex, cellIndex - 10)
               .clear()
               .type(`${value}{enter}`);
         }
      }
   });
});

// Check revenue table fields value
Cypress.Commands.add('checkCellValue', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      console.log(`Invalid value type. Expected a number but received: ${value}`);

      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Check if it is on level 1 or not
   cy.get(`.scdi_info_dialog_div * table tbody tr.text-xs.group.false`).then(rows => {
      const rowsCount = rows.length;

      if (rowsCount <= 2) {
         if (cellIndex <= 12) {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex - 1, cellIndex)
               .should('be.visible')
               .should('have.value', value); // Validate the input value.
         } else {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex - 1, cellIndex - 10)
               .should('be.visible')
               .should('have.value', value); // Validate the input value.
         }
      } else {
         if (cellIndex <= 12) {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex, cellIndex)
               .should('be.visible')
               .should('have.value', value); // Validate the input value.
         } else {
            // Set table cell value according to the assigned row, cell index and value
            cy.findCell(rowIndex, cellIndex - 10)
               .should('be.visible')
               .should('have.value', value); // Validate the input value.
         }
      }
   });
});

// Click allocation set button
Cypress.Commands.add('clickSetButton', (value) => {
   // Validate inputs
   if (value == null || value < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }

   cy.get('.scdi_info_dialog_div * table')
      .eq(0)
      .find('button')
      .then(setButtons => {
         console.log(setButtons.length);
         if (setButtons.length > 2) {
            cy.get('.scdi_info_dialog_div * table')
               .eq(0)
               .find('button')
               .eq(value)
               .click();
         } else {
            cy.get('.scdi_info_dialog_div * table')
               .eq(0)
               .find('button')
               .eq(value - 1)
               .click();
         }
      });
});

// Set allocation level
Cypress.Commands.add('setTotals', (value) => {
   switch (value) {
      case company.organizationalStructure.levelOne.name:
         cy.clickSetButton(0);
         break;
      case company.organizationalStructure.levelTwo_unitOne.name:
         cy.clickSetButton(1);
         break;
      case company.organizationalStructure.levelTwo_unitTwo.name:
         cy.clickSetButton(2);
         break;
      default:
         break;
   }
});

// Find cell in allocation input table
Cypress.Commands.add('findAllocationInputCell', (row, month) => {
   cy.get('.scdi_info_dialog_div * table')
      .eq(1)
      .find(`tr[data-rowdataindex="${row}"] td`)
      .eq(month)
      .dblclick()
      .find('input');
});

// Set value in the allocation input table unit cell
Cypress.Commands.add('editAllocationTableCell', (rowIndex, cellIndex, value) => {
   // Check if all provided parameters are valid
   if (rowIndex == null || rowIndex < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      console.log(`Invalid value type. Expected a number but received: ${value}`);

      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   if (cellIndex <= 12) {
      // Set table cell value according to the assigned row, cell index and value
      cy.findAllocationInputCell(rowIndex, cellIndex)
         .clear()
         .type(`${value}{enter}`);
   } else {
      // Set table cell value according to the assigned row, cell index and value
      cy.findAllocationInputCell(rowIndex, cellIndex - 10)
         .clear()
         .type(`${value}{enter}`);
   }
});

// Click on apply to all fields button in the allocation table
Cypress.Commands.add('applyToAllFieldsAllocation', (row, month) => {
   // Validate inputs
   if (row == null || row < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (month == null || month < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   if (month > 12) {
      cy.get(`.scdi_info_dialog_div * table`)
         .eq(1)
         .find('tr.text-xs.group.false')
         .eq(row)
         .find('td')
         .eq(month - 10)
         .find('.m-round-button')
         .click({ force: true });
   } else {
      cy.get(`.scdi_info_dialog_div * table`)
         .eq(1)
         .find('tr.text-xs.group.false')
         .eq(row)
         .find('td')
         .eq(month)
         .find('.m-round-button')
         .click({ force: true });
   }
   // .then((rows) => {
   //    // Click the button to apply value on all of the remaining fields
   //    if (month > 12) {
   //       cy.get(`tr[data-rowdataindex=${row}] td:nth-of-type(${month - 10}) .m-round-button`)
   //          .click({ force: true });
   //    } else {
   //       cy.get(`tr[data-rowdataindex=${row}] td:nth-of-type(${month + 1}) .m-round-button`)
   //          .click({ force: true });
   //    }
   // });
});

// Check cell value in allocation table
Cypress.Commands.add('checkAllocationCellValue', (rowIndex, cellIndex, value) => {
   // Check if all provided parameters are valid
   if (rowIndex == null || rowIndex < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      console.log(`Invalid value type. Expected a number but received: ${value}`);

      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   if (cellIndex <= 12) {
      // Set table cell value according to the assigned row, cell index and value
      cy.findAllocationInputCell(rowIndex, cellIndex)
         .should('be.visible')
         .should('have.value', value); // Validate the input value.
   } else {
      // Set table cell value according to the assigned row, cell index and value
      cy.findAllocationInputCell(rowIndex, cellIndex - 10)
         .should('be.visible')
         .should('have.value', value); // Validate the input value.
   }
});

// Choose revenue option
Cypress.Commands.add('chooseRevenueOption', (option) => {
   // Validate input
   if (option == null || option < 0) {
      console.log('Invalid or missing "option" value. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing "option" value. Ensure the value is defined and non-negative.');
   }

   // Find and click the hamburger menu icon
   cy.get('table tr[data-rowindex="0"]')
      .find('td')
      .eq(0) // selecting the first column of the row
      .find('div.cursor-pointer') // locate all clickable options
      .eq(1) // choose the hamburger menu
      .click();

   // Choose option from the menu (duplicate, organize streams and delete)
   cy.get('span')
      .contains(option) // finding the option with the name provided
      .click();
});


// Find cell in total table
Cypress.Commands.add('findTotalInputCell', (row, month) => {
   cy.get('.scdi_info_dialog_div * table')
      .eq(0) // select the totals table
      .find(`tr.text-xs.group.false`) // select rows without table headers
      .eq(row)
      .find('td') // select all month cells in a row
      .eq(month)
      .find('span.text-right'); // locate the span that holds the value
});

// Check cell value in total table
Cypress.Commands.add('checkTotalCellValue', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      console.log('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      console.log('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      console.log(`Invalid value type. Expected a number but received: ${value}`);

      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Determine cell index (accounting for different table structures)
   const adjustedCellIndex = cellIndex <= 13 ? cellIndex : cellIndex - 10;

   cy.wait(50);

   cy.findTotalInputCell(rowIndex - 1, adjustedCellIndex)
      .should('exist') // Ensure the element exists.
      .invoke('text') // Get the text content.
      .then((text) => {
         expect(text).to.exist.and.not.be.empty; // Validate that text exists and is not empty.

         const normalizedValue = text.replace(/,/g, ''); // Remove commas.

         // Assert the normalized value matches the expected value
         expect(Number(normalizedValue)).to.equal(value);
      });
});