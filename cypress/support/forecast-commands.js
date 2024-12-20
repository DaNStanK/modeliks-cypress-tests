/// <reference types="cypress" />

import { company } from "../fixtures/company.json";

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
   if (!planningLevel || typeof planningLevel !== 'string') {
      throw new Error('Invalid or missing name of planning level. Ensure the value is defined and is a string');
   }

   // Click the planning level dropdown
   cy.get('div.MuiDialogContent-root button')
      .contains('Level 1')
      .click({ force: true });

   // Choose from the dropdown options
   cy.get('div.MuiDialogContent-root div.dropdown.relative div.origin-top-left.absolute')
      .contains(planningLevel)
      .click({ force: true });

   // Assert chosen planning level 
   cy.get('.MuiDialogContent-root .grid div')
      .contains(planningLevel)
      .should('exist');
});

// Select allocation methodology
Cypress.Commands.add('setAllocationMethodology', (methodology) => {
   // Validate input
   if (!methodology || typeof methodology !== 'string') {
      throw new Error('Invalid or missing name of methodology. Ensure the methodology value is defined and is a string');
   }

   // Click the methodology dropdown
   cy.get('div.MuiDialogContent-root button')
      .contains('do not allocate')
      .click({ force: true });

   // Choose from the dropdown options
   cy.get('div.dropdown.relative div.origin-top-left.absolute')
      .contains(methodology)
      .click({ force: true });

   // Assert chosen methodology 
   cy.get('button span span.overflow-hidden')
      .contains(methodology)
      .should('exist');
});

// Click on apply to all fields button 
Cypress.Commands.add('applyToAllFields', (row, month) => {
   // Validate inputs
   if (row == null || row < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (month == null || month < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   // Adjust month index if necessary
   const adjustedMonth = month > 13 ? month - 10 : month + 1;

   // Determine row index based on the number of rows
   cy.get('.scdi_info_dialog_div * table tbody tr.text-xs.group.false').then(rows => {
      const rowIndex = rows.length <= 2 ? 0 : row;

      // Click the apply button in the specified cell
      cy.get(`.scdi_info_dialog_div * table tbody tr[data-rowdataindex=${rowIndex}] td:nth-of-type(${adjustedMonth}) .m-round-button`)
         .click({ force: true });
   });
});

// Find cell in the table
Cypress.Commands.add('findCell', (row, cell) => {
   // Validate inputs
   if (row == null || row < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cell == null || cell < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   // Locate the cell in the table
   cy.get('.scdi_info_dialog_div * table tbody tr.text-xs.group.false')
      .eq(row) // Select the desired row
      .find('td')
      .eq(cell); // Select the desired cell
   // .dblclick('bottomRight') // Double-click to activate the input
   // .find('input')
   // .should('be.visible'); // Ensure the input is visible
});

// Edit table cell value
Cypress.Commands.add('editTableCell', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Check if it is on level 1 or not
   cy.get('.scdi_info_dialog_div * table tbody tr.text-xs.group.false').then(rows => {
      const rowsCount = rows.length;

      // Determine the correct row and cell index based on the number of rows
      const adjustedRowIndex = rowsCount <= 2 ? rowIndex - 1 : rowIndex;
      const adjustedCellIndex = cellIndex <= 12 ? cellIndex : cellIndex - 10;

      // Set table cell value according to the assigned row, cell index and value
      cy.findCell(adjustedRowIndex, adjustedCellIndex)
         .dblclick('bottomRight') // Double-click to activate the input
         .find('input')
         .should('be.visible') // Ensure the input is visible
         .clear() // Clear the existing value
         .type(`${value}{enter}`); // Type the new value and press enter
   });
});

// Check revenue table fields value
Cypress.Commands.add('checkCellValue', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Check if it is on level 1 or not
   cy.get('.scdi_info_dialog_div * table tbody tr.text-xs.group.false').then(rows => {
      const rowsCount = rows.length;

      // Determine the correct row and cell index based on the number of rows
      const adjustedRowIndex = rowsCount <= 2 ? rowIndex - 1 : rowIndex;
      const adjustedCellIndex = cellIndex <= 13 ? cellIndex : cellIndex - 10;

      if (adjustedCellIndex === 13) {
         cy.findCell(adjustedRowIndex, adjustedCellIndex)
            .contains(value);
      } else {
         // Validate the input value in the specified cell
         cy.findCell(adjustedRowIndex, adjustedCellIndex)
            .dblclick('bottomRight') // Double-click to activate the input
            .find('input')
            .should('have.value', value);
      }
   });
});

// Click allocation set button
Cypress.Commands.add('clickSetButton', (value) => {
   // Validate input
   if (value == null || value < 0) {
      throw new Error('Invalid or missing value. Ensure the value is defined and non-negative.');
   }

   // Click the set button based on the value
   cy.get('.scdi_info_dialog_div * table')
      .eq(0)
      .find('button')
      .then(setButtons => {
         const buttonIndex = setButtons.length > 2 ? value : value - 1;
         cy.wrap(setButtons)
            .eq(buttonIndex)
            .click();
      });
});

// Set allocation level based on the provided value
Cypress.Commands.add('setTotals', (value) => {
   // Validate input
   if (!value || typeof value !== 'string') {
      throw new Error('Invalid or missing value. Ensure the value is defined and is a string.');
   }

   // Determine the button index based on the value
   let buttonIndex;
   switch (value) {
      case company.organizationalStructure.levelOne.name:
         buttonIndex = 0;
         break;
      case company.organizationalStructure.levelTwo_unitOne.name:
         buttonIndex = 1;
         break;
      case company.organizationalStructure.levelTwo_unitTwo.name:
         buttonIndex = 2;
         break;
      default:
         throw new Error('Invalid value. Ensure the value matches one of the defined levels.');
   }

   // Click the set button based on the determined index
   cy.clickSetButton(buttonIndex);
});

// Find cell in allocation input table
Cypress.Commands.add('findAllocationInputCell', (row, month) => {
   // Validate inputs
   if (row == null || row < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (month == null || month < 0) {
      throw new Error('Invalid or missing monthIndex. Ensure the value is defined and non-negative.');
   }

   // Locate the cell in the allocation input table
   return cy.get('.scdi_info_dialog_div * table')
      .eq(1) // Select the second table (allocation input table)
      .find(`tr[data-rowdataindex="${row}"] td`) // Find the row and cells
      .eq(month) // Select the specific cell
      .dblclick() // Double-click to activate the input
      .find('input'); // Find the input element within the cell
});

// Set value in the allocation input table unit cell
Cypress.Commands.add('editAllocationTableCell', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Determine the correct cell index based on the table structure
   const adjustedCellIndex = cellIndex <= 12 ? cellIndex : cellIndex - 10;

   // Set the value in the specified cell
   cy.findAllocationInputCell(rowIndex, adjustedCellIndex)
      .clear() // Clear the existing value
      .type(`${value}{enter}`); // Type the new value and press enter
});

// Click on apply to all fields button in the allocation table
Cypress.Commands.add('applyToAllFieldsAllocation', (row, month) => {
   // Validate inputs
   if (row == null || row < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (month == null || month < 0) {
      throw new Error('Invalid or missing monthIndex. Ensure the value is defined and non-negative.');
   }

   // Determine the correct cell index based on the table structure
   const adjustedMonth = month > 12 ? month - 10 : month;

   // Click the apply button in the specified cell
   cy.get('.scdi_info_dialog_div * table')
      .eq(1) // Select the second table (allocation input table)
      .find('tr.text-xs.group.false') // Find the rows without table headers
      .eq(row) // Select the specific row
      .find('td') // Find the cells in the row
      .eq(adjustedMonth) // Select the specific cell
      .find('.m-round-button') // Find the apply button within the cell
      .click({ force: true }); // Click the apply button
});

// Check cell value in allocation table
Cypress.Commands.add('checkAllocationCellValue', (rowIndex, cellIndex, value) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      throw new Error(`Invalid value type. Expected a number but received: ${value}`);
   }

   // Determine the correct cell index based on the table structure
   const adjustedCellIndex = cellIndex <= 12 ? cellIndex : cellIndex - 10;

   // Validate the input value in the specified cell
   cy.findAllocationInputCell(rowIndex, adjustedCellIndex)
      .should('be.visible')
      .should('have.value', value);
});

// Choose revenue option
Cypress.Commands.add('chooseRevenueOption', (option) => {
   // Validate input
   if (option == null || typeof option !== 'string') {
      throw new Error('Invalid or missing "option" value. Ensure the value is defined and is a string.');
   }

   // Find and click the hamburger menu icon
   cy.get('table tr[data-rowindex="0"]')
      .find('td')
      .eq(0) // Select the first column of the row
      .find('div.cursor-pointer') // Locate all clickable options
      .eq(1) // Choose the hamburger menu
      .click();

   // Choose option from the menu (duplicate, organize streams, and delete)
   cy.get('span')
      .contains(option) // Find the option with the name provided
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
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      alert('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');

      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (typeof value !== 'number') {
      alert(`Invalid value type. Expected a number but received: ${value}`);

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

// Increase the number of decimals displayed
Cypress.Commands.add('increaseDecimals', () => {
   // Find and click the "Increase Decimals" button
   cy.get('[aria-label="!!Increase Decimals"]')
      .should('exist') // Ensure the button exists
      .click(); // Click the button
});