/// <reference types="cypress" />

import { cogs } from "../fixtures/cogs.json";
import { company } from '../fixtures/company.json';

describe('Forecast COGS', () => {
   beforeEach(() => {
      // Login the user
      cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));

   });

   if (cogs && cogs.length > 0) {
      cogs.forEach((cog) => {
         // COGS tests
         it(`Should be able to create ${cog.type_name}`, () => {
            // Assert if you are on Forecast revenues section
            cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

            cy.wait(1000);

            // Click on COGS section
            cy.clickButton('Cost of Goods Sold');

            // Assert if you are on Forecast revenues section
            cy.expectedUrl('https://test.hz.modeliks.com/forecast/costofsales');

            // Click on the add button
            cy.clickButton('Add Cost of Goods Sold');

            // Populate COGS Name input field
            if (cog.type_name) {
               cy.setCostOfGoodsName(cog.type_name);
            } else {
               throw new Error('COGS name is missing');
            }

            // Choose the COGS relation
            if (cog.relation) {
               cy.selectRelation(cog.relation);
            } else {
               throw new Error(`${cog.relation} is missing from the list`);
            }

            // Choose the type of cost
            if (cog.type_of_cost) {
               cy.selectTypeOfCost(cog.type_of_cost);
            } else {
               throw new Error(`${cog.type_of_cost} is missing`);
            }

            // Select advance settings
            cy.chooseAdvanceSettings();

            // Choose planning level
            if (cog.level) {
               cy.choosePlanningLevel(cog.level);
            } else {
               throw new Error('Planning level is missing');
            }

            // Set the allocation methodology
            if (cog.methodology) {
               cy.setAllocationMethodology(cog.methodology);
            } else {
               throw new Error('Allocation methodology is missing');
            }

            // Click save button in the advanced settings
            cy.clickButton('Save');

            // Click next button and continue to unit sales info section
            cy.clickButton('Next');


            //  *************************************************  \\
            //                  UNIT COST SETUP                    \\
            //  *************************************************  \\


            if (cog.level === 'Level 1' && cog.methodology === 'do not allocate') {
               // Set Unit Cost info for the 1st month
               if (cog.unit_cost_1) {
                  cy.editTableCell(1, 1, cog.unit_cost_1); // row, month, value

                  // Check if the value for the 1st month is correctly applied
                  cy.checkCellValue(1, 1, cog.unit_cost_1); // row, month, value

                  // Apply the units set for the 1st month to all remaining
                  cy.applyToAllFields(1, 1); // row, month
               } else {
                  throw new Error('Unit cost for the 1st month is missing');
               }

               // Set Unit cost info for the 12th month
               if (cog.unit_cost_12) {
                  cy.editTableCell(1, 12, cog.unit_cost_12); // row, month, value

                  // Check if the value is correctly applied on 12th month
                  cy.checkCellValue(1, 12, cog.unit_cost_12); // row, month, value
               } else {
                  throw new Error('Unit cost for the 12th month is missing');
               }

               // Set Unit cost info for 24th month
               if (cog.unit_cost_24) {
                  cy.editTableCell(1, 24, cog.unit_cost_24); // row, month, value

                  // Check if the value is correctly applied for 24th month
                  cy.checkCellValue(1, 24, cog.unit_cost_24); // row, month, value
               } else {
                  throw new Error('Unit cost for the 24th month is missing');
               }

               // Increase the decimals of the numbers in the table
               cy.increaseDecimals();

               // Check if the value is correctly applied for 1 year
               cy.checkCellValue(1, 13, cog.unit_cost_13); // row, month, value

               // Click the save and close button
               cy.clickButton('Save & Close');

               // Intercept post and put revenue fetch
               cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
               cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');

               // Assert post and put fetches
               cy.wait(['@chartOfAccounts', '@calculatedDrivers'], { timeout: 10000 })
                  .then(fetches => {
                     // Check if the fetches were successful
                     fetches.forEach(result => {
                        // Check if the fetch was successful
                        expect(result.response.statusCode).to.eq(200);
                     });
                  });
            }

            // Assert if you are on Forecast revenues section
            cy.expectedUrl('https://test.hz.modeliks.com/forecast/costofsales');

         });
      });
   } else {
      throw new Error('No COGS data found in the fixture');
   }
});