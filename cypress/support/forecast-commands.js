/// <reference types="cypress" />

import { company } from "../fixtures/company.json";

// Populate Revenue Name input field
Cypress.Commands.add('setStreamName', (streamName) => {
   // Validate input
   if (streamName == null || typeof streamName !== 'string') {
      throw new Error('Invalid or missing stream name. Ensure the stream name is populated as a parameter in the function and is a string.');
   }

   // Populate stream Name input field
   cy.get('input[name="streamName"]')
      .clear() // Clear any existing value
      .type(streamName); // Type the new stream name
});

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
Cypress.Commands.add('applyToAllFields', (tableName, rowIndex, cellIndex) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   cy.findTableCell(tableName, rowIndex, cellIndex)
      .find('div.autofill_container .m-round-button')
      .click({ force: true })

   // // Adjust month index if necessary
   // const adjustedMonth = cellIndex > 13 ? cellIndex - 10 : cellIndex + 1;

   // // Determine row index based on the number of rows
   // cy.get('.scdi_info_dialog_div * table tbody tr.text-xs.group.false').then(rows => {
   //    const rowIndex = rows.length <= 2 ? 0 : row;

   //    // Click the apply button in the specified cell
   //    cy.get(`.scdi_info_dialog_div * table tbody tr[data-rowdataindex=${rowIndex}] td:nth-of-type(${adjustedMonth}) .m-round-button`)
   //       .click({ force: true });
   // });
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

// Validate inputs for setOrAssertValue command
Cypress.Commands.add('validateSetOrAssertValueInputs', (tableName, rowIndex, cellIndex, value) => {
   if (!tableName || typeof tableName !== 'string') {
      throw new Error('Invalid or missing tableName. Ensure the value is defined and is a string.');
   }
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }
   if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
      throw new Error('Invalid or missing value. Ensure the value is defined and is a number or string.');
   }
});

// Find the specific cell in the table
Cypress.Commands.add('findTableCell', (tableName, rowIndex, cellIndex) => {
   return cy.get('.scdi_info_dialog_div table')
      .contains(tableName)
      .closest('table')
      .find('tbody tr')
      .eq(rowIndex) // Target row by index
      .find('td')
      .eq(cellIndex); // Target cell by index
});

// Set value in the cell if input exists
Cypress.Commands.add('setValueInCell', ($cell, value) => {
   cy.wrap($cell)
      .find('input')
      .invoke('val')
      .then((inputValue) => {
         if (inputValue !== value.toString()) {
            cy.wrap($cell)
               .find('input')
               .clear()
               .type(value)
               .blur()
               .should('have.value', value.toString()); // Assert the input retains the correct value
         }
      });
});

// Assert value in the cell if input does not exist
Cypress.Commands.add('assertValueInCell', ($cell, value) => {
   cy.wrap($cell)
      .find('span.text-right')
      .invoke('text') // Get the text of the span
      .then((text) => text.trim().replace(/\u00A0/g, '').replace(/,/g, '')) // Normalize by removing &nbsp;, commas, and trimming
      .then((normalizedText) => {
         if (value === '-') {
            expect(normalizedText).to.equal('-'); // Assert the text is "-"
         } else {
            const expectedValue = parseFloat(value.toString().replace('%', '')).toFixed(2);
            const actualValue = parseFloat(normalizedText).toFixed(2);
            expect(actualValue).to.equal(expectedValue); // Assert normalized text matches the expected value
         }
      });
});

// Set or assert the value in a specific table cell
Cypress.Commands.add('setOrAssertValue', (inputMethod, tableName, rowIndex, cellIndex, value) => {
   // Validate inputMethod
   if (!inputMethod || typeof inputMethod !== 'string' || (inputMethod !== 'Set' && inputMethod !== 'Assert')) {
      throw new Error('Invalid or missing inputMethod. Ensure the value is defined and is either "Set" or "Assert".');
   }

   // Validate tableName
   if (!tableName || typeof tableName !== 'string') {
      throw new Error('Invalid or missing tableName. Ensure the value is defined and is a string.');
   }

   // Validate rowIndex
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }

   // Validate cellIndex
   if (cellIndex == null || cellIndex < 0) {
      throw new Error('Invalid or missing cellIndex. Ensure the value is defined and non-negative.');
   }

   // Validate value
   if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
      throw new Error('Invalid or missing value. Ensure the value is defined and is a number or string.');
   }

   // Target the specific cell
   cy.findTableCell(tableName, rowIndex, cellIndex)
      .then($cell => {
         cy.wrap($cell)
            .dblclick()
            .then(($cell) => {
               if (inputMethod === "Set") {
                  if ($cell.find('input').length > 0) {
                     cy.setValueInCell($cell, value);
                  } else {
                     cy.assertValueInCell($cell, value);
                  }
               }
            });
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
         // Validate the input value in the specified cell
         cy.findCell(adjustedRowIndex, adjustedCellIndex)
            .should('contain', value);
      } else {
         // Validate the input value in the specified cell
         cy.findCell(adjustedRowIndex, adjustedCellIndex)
            .dblclick('bottomRight') // Double-click to activate the input
            .find('input')
            .should('have.value', value);
      }
   });
});

// Check revenue table fields value
Cypress.Commands.add('checkCogsCellValue', (rowIndex, cellIndex, value) => {
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

      if (adjustedRowIndex === 0 || adjustedRowIndex === 1) {
         // Validate the input value in the specified cell
         cy.findCell(adjustedRowIndex, adjustedCellIndex)
            .should('contain', value);
      } else if (adjustedCellIndex === 13) {
         // Validate the input value in the specified cell
         cy.findCell(adjustedRowIndex, adjustedCellIndex)
            .should('contain', value);
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
Cypress.Commands.add('applyToAllFieldsAllocation', (tableName, rowIndex, cellIndex) => {
   // Validate inputs
   if (rowIndex == null || rowIndex < 0) {
      throw new Error('Invalid or missing rowIndex. Ensure the value is defined and non-negative.');
   }
   if (cellIndex == null || cellIndex < 0) {
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
   cy.get('.dialog_table_container .table-menu [aria-label="!!Increase Decimals"]')
      .should('exist') // Ensure the button exists
      .click(); // Click the button
});

// Expand all rows
Cypress.Commands.add('expandAll', () => {
   // Click on the expand all button
   cy.get('table thead td')
      .find('div[aria-label="!!Expand All"]')
      .click();
});

// Collapse all rows
Cypress.Commands.add('collapseAll', () => {
   // Click on the expand all button
   cy.get('table thead td')
      .find('div[aria-label="!!Collapse All"]')
      .click();
});

// Organizational table view
Cypress.Commands.add('organizationalTableView', () => {
   // Click on the organizational table view
   cy.get('div.table-menu div[aria-label="!!Organizational table view"]')
      .click();
});

// Default table view
Cypress.Commands.add('defaultTableView', () => {
   // Click on the default table view
   cy.get('div.table-menu div[aria-label="!!Default table view"]')
      .click();
});

// Expand row
Cypress.Commands.add('expandRow', (rowTitle) => {
   // Validate input
   if (!rowTitle || typeof rowTitle !== 'string') {
      throw new Error('Invalid or missing rowTitle. Ensure the value is defined and is a string.');
   }

   // Expand the specified row
   cy.get('table tbody tr') // Get all rows in the table
      .contains(rowTitle) // Find the row with the row title
      .closest('tr') // Get the closest tr element
      .should('exist') // Ensure the row exists
      .find('td') // Find all td elements within the row
      .eq(0) // Select the first td element
      .find('svg.cursor-pointer') // Find the svg element with the cursor-pointer class
      .click(); // Click to expand the row
});

// Validate inputs for applyFunction command
Cypress.Commands.add('validateApplyFunctionInputs', (tableName, functionName) => {
   if (!tableName || typeof tableName !== 'string') {
      throw new Error('Invalid or missing tableName. Ensure the value is defined and is a string.');
   }
   if (!functionName || typeof functionName !== 'string') {
      throw new Error('Invalid or missing functionName. Ensure the value is defined and is a string.');
   }
});

// Click the hamburger menu in the specified table
Cypress.Commands.add('clickHamburgerMenu', (tableName) => {
   // Validate input
   if (!tableName || typeof tableName !== 'string') {
      throw new Error('Invalid or missing tableName. Ensure the value is defined and is a string.');
   }

   // Locate and click the hamburger menu in the specified table
   cy.get('.scdi_info_dialog_div table')
      .contains(tableName)
      .closest('table')
      .find('tr[data-rowdataindex="0"]')
      .find('td')
      .eq(0)
      .find('div.cursor-pointer.ease-in-out')
      .eq(0)
      .click();
});

// Select the function from the dropdown menu
Cypress.Commands.add('selectFunctionFromMenu', (functionName) => {
   // Validate input
   if (!functionName || typeof functionName !== 'string') {
      throw new Error('Invalid or missing functionName. Ensure the value is defined and is a string.');
   }

   // Locate and click the function from the dropdown menu
   cy.get('li')
      .contains(functionName)
      .closest('li')
      .click();
});

// Apply function from fx hamburger menu
Cypress.Commands.add('applyFunction', (tableName, functionName) => {
   // Validate inputs
   cy.validateApplyFunctionInputs(tableName, functionName);

   // Click the hamburger menu
   cy.clickHamburgerMenu(tableName);

   // Select the function from the menu
   cy.selectFunctionFromMenu(functionName);
});