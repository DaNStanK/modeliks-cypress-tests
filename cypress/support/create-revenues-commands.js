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
   // Populate Revenue Name input field
   cy.get('#revenueNameInput')
      .type(revenueName);
});

// Choose the type of revenue
Cypress.Commands.add('chooseRevenueType', (revenueType) => {
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
   cy.get('div[class="sc-dhKdcB buTVds"] label')
      .eq(revenueType)
      .find('input[type="checkbox"]')
      .should('be.checked');
});

// Click on apply to all fields button 
Cypress.Commands.add('applyToAllFields', (row, month) => {
   // Check if it is on level 1 or not
   cy.get(`table tbody tr.text-xs.group.false`).then(rows => {
      const rowsCount = rows.length;

      if (rowsCount <= 2) {
         // Click the button to apply value on all of the remaining fields
         if (month > 12) {
            cy.get(`section.main-table-theme tr[data-rowdataindex='0'] td:nth-of-type(${month - 10}) .m-round-button`)
               .click({ force: true });
         } else {
            cy.get(`section.main-table-theme tr[data-rowdataindex='0'] td:nth-of-type(${month + 1}) .m-round-button`)
               .click({ force: true });
         }
      } else {
         // Click the button to apply value on all of the remaining fields
         if (month > 12) {
            cy.get(`section.main-table-theme tr[data-rowdataindex=${row}] td:nth-of-type(${month - 10}) .m-round-button`)
               .click({ force: true });
         } else {
            cy.get(`section.main-table-theme tr[data-rowdataindex=${row}] td:nth-of-type(${month + 1}) .m-round-button`)
               .click({ force: true });
         }
      }
   });
});

Cypress.Commands.add('findCell', (row, cell) => {
   // Set table cell value according to the assigned row, cell and value
   cy.get('table tbody tr')
      .eq(row) // Select the desired row.
      .find('td')
      .eq(cell) // Select the desired cell.
      .dblclick('bottomRight')
      .find('input')
      .should('be.visible');
});

Cypress.Commands.add('editTableCell', (rowIndex, cellIndex, value) => {
   // Check if it is on level 1 or not
   cy.get(`table tbody tr.text-xs.group.false`).then(rows => {
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
   // Check if it is on level 1 or not
   cy.get(`table tbody tr.text-xs.group.false`).then(rows => {
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
   cy.get('table')
      .eq(0)
      .find('button')
      .eq(value)
      .click();
});

// Set allocation level
Cypress.Commands.add('setTotals', (value) => {
   switch (value) {
      case company.organizationalStructure.levelOne.name:
         cy.clickSetButton(0);
         break;
      case company.organizationalStructure.levelTwo.name:
         cy.clickSetButton(1);
         break;
      case company.organizationalStructure.levelThree.name:
         cy.clickSetButton(2);
         break;
      default:
         break;
   }
});

// Find cell in allocation input table
Cypress.Commands.add('findAllocationInputCell', (row, month) => {
   cy.get('table')
      .eq(1)
      .find(`tr[data-rowdataindex="${row}"] td`)
      .eq(month)
      .dblclick()
      .find('input');
});

// Set value in the allocation input table unit cell
Cypress.Commands.add('editAllocationTableCell', (rowIndex, cellIndex, value) => {
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
   // Check if it is on level 1 or not
   cy.get(`table`)
      .eq(1)
      .find('tr.text-xs.group.false')
      .then((rows) => {
         // Click the button to apply value on all of the remaining fields
         if (month > 12) {
            cy.get(`tr[data-rowdataindex=${row}] td:nth-of-type(${month - 10}) .m-round-button`)
               .click({ force: true });
         } else {
            cy.get(`tr[data-rowdataindex=${row}] td:nth-of-type(${month + 1}) .m-round-button`)
               .click({ force: true });
         }
      });
});

// Check cell value in allocation table
Cypress.Commands.add('checkAllocationCellValue', (rowIndex, cellIndex, value) => {
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


// Find cell in total table
Cypress.Commands.add('findTotalInputCell', (row, month) => {
   cy.get('table')
      .eq(0) // select the totals table
      .find(`tr.text-xs.group.false`) // select rows without table headers
      .eq(row)
      .find('td') // select all month cells in a row
      .eq(month)
      .find('span.text-right'); // locate the span that holds the value
});

// Check cell value in total table
Cypress.Commands.add('checkTotalCellValue', (rowIndex, cellIndex, value) => {
   if (cellIndex <= 13) {
      // Set table cell value according to the assigned row, cell index and value
      cy.findTotalInputCell(rowIndex - 1, cellIndex)
         .invoke('text') // Get the text content.
         .then((text) => {
            const normalizedValue = text.replace(/,/g, ''); // Remove commas.
            expect(Number(normalizedValue)).to.equal(value); // Assert as a number.
         });
   } else {
      // Set table cell value according to the assigned row, cell index and value
      cy.findTotalInputCell(rowIndex - 1, cellIndex - 10)
         .invoke('text') // Get the text content.
         .then((text) => {
            const normalizedValue = text.replace(/,/g, ''); // Remove commas.
            expect(Number(normalizedValue)).to.equal(value); // Assert as a number.
         });
   }
});

// Set billable hours Info
Cypress.Commands.add('setBillableHours', (revenueType) => {
   // Apply value in the first cell
   cy.get('.dialog_table_container > section.bg-white > .overflow-x-scroll > .cellSizeStyle_100 > .border-none > .text-xs.false > :nth-child(2) > .body_cell > .mr-1 > .w-full > .text-right')
      .click()
      .type(`${revenueType.billable_hours_value}{enter}`);

   //Assert if the field i populated correctly
   cy.get('.dialog_table_container> section.bg-white > .overflow-x-scroll > .cellSizeStyle_100 > .border-none > .text-xs.false > :nth-child(2) > .body_cell > .mr-1 > .w-full > .text-right')
      .should('contain', `${revenueType.billable_hours_value}`);

   // Click the button to apply on all cells in the row
   cy.get('tbody tr:first-of-type td:nth-of-type(2) .m-round-button')
      .click({ force: true });

   // Click the next button
   cy.get('button')
      .contains('!!Next')
      .click();
});

// Set Unit Price Info
Cypress.Commands.add('setUnitPriceInfo', (revenueType) => {
   // Auth API
   cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');

   // Apply value in the first cell
   cy.get('.dialog_table_container > section.bg-white > .overflow-x-scroll > .cellSizeStyle_100 > .border-none > .text-xs.false > :nth-child(2) > .body_cell > .mr-1 > .w-full > .text-right')
      .click()
      .type(`${revenueType.unit_price_value}{enter}`);

   //Assert if the field is populated correctly
   cy.get('.dialog_table_container> section.bg-white > .overflow-x-scroll > .cellSizeStyle_100 > .border-none > .text-xs.false > :nth-child(2) > .body_cell > .mr-1 > .w-full > .text-right')
      .should('contain', `${revenueType.unit_price_value}`);

   // Click the button to apply on all cells in the row
   cy.get('tbody tr:first-of-type td:nth-of-type(2) .m-round-button')
      .click({ force: true });

   // Click Next button
   cy.get('button')
      .contains('Save & Close')
      .click();

   // Wait for all fetches to complete
   cy.wait('@chartOfAccounts', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);

   // Assert redirection
   cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
});

// Set Unit Price Info
Cypress.Commands.add('setHourlyRateInfo', (revenueType) => {
   // Auth API
   cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');

   // Apply value in the first cell
   cy.get('.dialog_table_container > section.bg-white > .overflow-x-scroll > .cellSizeStyle_100 > .border-none > .text-xs.false > :nth-child(2) > .body_cell > .mr-1 > .w-full > .text-right')
      .click()
      .type(`${revenueType.hourly_rate_value}{enter}`);

   //Assert if the field is populated correctly
   cy.get('.dialog_table_container> section.bg-white > .overflow-x-scroll > .cellSizeStyle_100 > .border-none > .text-xs.false > :nth-child(2) > .body_cell > .mr-1 > .w-full > .text-right')
      .should('contain', `${revenueType.hourly_rate_value}`);

   // Click the button to apply on all cells in the row
   cy.get('tbody tr:first-of-type td:nth-of-type(2) .m-round-button')
      .click({ force: true });

   // Click Next button
   cy.get('button')
      .contains('Save & Close')
      .click();

   // Wait for all fetches to complete
   cy.wait('@chartOfAccounts', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);

   // Assert redirection
   cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
});