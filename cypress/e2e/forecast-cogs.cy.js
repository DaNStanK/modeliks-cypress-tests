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

            // Assert if you are on Forecast COGS section
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
               throw new Error('COGS relation is missing');
            }

            // Choose the type of cost
            if (cog.type_of_cost) {
               cy.selectTypeOfCost(cog.type_of_cost);
            } else {
               throw new Error('Type of cost is missing');
            }

            // Select advance settings
            cy.chooseAdvanceSettings();

            // Choose planning level
            if (cog.level) {
               cy.choosePlanningLevel(cog.level);
            } else {
               throw new Error('Planning level is missing');
            }

            // Set allocation methodology if planning level is not Level 3 - SU
            if (cog.level !== 'SU') {
               if (cog.methodology) {
                  cy.setAllocationMethodology(cog.methodology);
               } else {
                  throw new Error('Allocation methodology is missing');
               }
            }

            // Click save button in the advanced settings
            cy.clickButton('Save');

            // Click next button and continue to unit sales info section
            cy.clickButton('Next');


            //  *************************************************  \\
            //                    UNIT COST SETUP                  \\
            //  *************************************************  \\


            // Unit Cost Setup
            if (cog.level === 'Level 1') {
               // Set Unit Cost info for the 1st month
               if (cog.unit_cost_1) {
                  cy.editTableCell(1, 1, cog.unit_cost_1); //row, month, value
                  cy.checkCellValue(1, 1, cog.unit_cost_1); //row, month, value
                  cy.applyToAllFields(1, 1); //row, month, value
               } else {
                  throw new Error('Unit cost for the 1st month is missing');
               }

               // Set Unit cost info for the 12th month
               if (cog.unit_cost_12) {
                  cy.editTableCell(1, 12, cog.unit_cost_12); //row, month, value
                  cy.checkCellValue(1, 12, cog.unit_cost_12); //row, month, value
               } else {
                  throw new Error('Unit cost for the 12th month is missing');
               }

               // Set Unit cost info for 24th month
               if (cog.unit_cost_24) {
                  cy.editTableCell(1, 24, cog.unit_cost_24); //row, month, value
                  cy.checkCellValue(1, 24, cog.unit_cost_24); //row, month, value
               } else {
                  throw new Error('Unit cost for the 24th month is missing');
               }

               // Increase the decimals of the numbers in the table
               cy.increaseDecimals();

               if (cog.unit_cost_13) {
                  cy.checkCellValue(1, 13, cog.unit_cost_13); //row, month, value
               } else {
                  throw new Error('Unit cost for the 13th month is missing');
               }
            }

            // Unit Cost Setup
            if (cog.level === 'SU') {
               // Set subunit 1 for business unit 1 info for the 1st month
               if (cog.uc_bu1_subunit1_1) {
                  cy.editTableCell(2, 1, cog.uc_bu1_subunit1_1); //row, month, value
                  cy.checkCogsCellValue(2, 1, cog.uc_bu1_subunit1_1); //row, month, value
                  cy.applyToAllFields(2, 1); //row, month, value
               } else {
                  throw new Error('Subunit 1 cost for business unit 1 for the 1st month is missing');
               }

               // Set subunit 2 for business unit 1 info for the 1st month
               if (cog.uc_bu1_subunit2_1) {
                  cy.editTableCell(3, 1, cog.uc_bu1_subunit2_1); //row, month, value
                  cy.checkCogsCellValue(3, 1, cog.uc_bu1_subunit2_1); //row, month, value
                  cy.applyToAllFields(3, 1); //row, month, value
               } else {
                  throw new Error('Subunit 2 cost for business unit 1 for the 1st month is missing');
               }

               // Set subunit 1 for business unit 2 info for the 1st month
               if (cog.uc_bu2_subunit1_1) {
                  cy.editTableCell(5, 1, cog.uc_bu2_subunit1_1); //row, month, value
                  cy.checkCogsCellValue(5, 1, cog.uc_bu2_subunit1_1); //row, month, value
                  cy.applyToAllFields(5, 1); //row, month, value
               } else {
                  throw new Error('Subunit 1 cost for business unit 2 for the 1st month is missing');
               }

               // Set subunit 1 for business unit 2 info for the 12th month
               if (cog.uc_bu2_subunit1_12) {
                  cy.editTableCell(5, 12, cog.uc_bu2_subunit1_12); //row, month, value
                  cy.checkCogsCellValue(5, 12, cog.uc_bu2_subunit1_12); //row, month, value
               } else {
                  throw new Error('Subunit 1 cost for business unit 2 for the 12th month is missing');
               }

               // Set subunit 2 for business unit 2 info for the 1st month
               if (cog.uc_bu2_subunit2_1) {
                  cy.editTableCell(6, 1, cog.uc_bu2_subunit2_1); //row, month, value
                  cy.checkCogsCellValue(6, 1, cog.uc_bu2_subunit2_1); //row, month, value
                  cy.applyToAllFields(6, 1); //row, month, value
               } else {
                  throw new Error('Subunit 2 cost for business unit 2 for the 1st month is missing');
               }

               // Increase the decimals of the numbers in the table
               cy.increaseDecimals();

               // Validate company unit price value for the 12th month if provided
               if (cog.uc_company_12) {
                  cy.checkCogsCellValue(0, 12, cog.uc_company_12); //row, month, value
               } else {
                  throw new Error('Company unit price for the 12th month is missing');
               }

               // Validate company unit price value for the 13th month if provided
               if (cog.uc_company_13) {
                  cy.checkCogsCellValue(0, 13, cog.uc_company_13); //row, month, value
               } else {
                  throw new Error('Company unit price for the 13th month is missing');
               }

               // Validate company unit price value for the 24th month if provided
               if (cog.uc_company_24) {
                  cy.checkCogsCellValue(0, 24, cog.uc_company_24); //row, month, value
               } else {
                  throw new Error('Company unit price for the 24th month is missing');
               }

               // Validate business unit 1 price value for the 12th month if provided
               if (cog.uc_bu1_12) {
                  cy.checkCogsCellValue(1, 12, cog.uc_bu1_12); //row, month, value
               } else {
                  throw new Error('Company business unit 1 price for the 12th month is missing');
               }

               // Validate business unit 1 price value for the 13th month if provided
               if (cog.uc_bu1_13) {
                  cy.checkCogsCellValue(1, 13, cog.uc_bu1_13); //row, month, value
               } else {
                  throw new Error('Company business unit 1 price for the 13th month is missing');
               }

               // Validate business unit 1 price value for the 24th month if provided
               if (cog.uc_bu1_24) {
                  cy.checkCogsCellValue(1, 24, cog.uc_bu1_24); //row, month, value
               } else {
                  throw new Error('Company business unit 1 price for the 24th month is missing');
               }

               // Validate subunit 1 of business unit 2 price value for the 12th month if provided
               if (cog.uc_bu2_subunit1_12) {
                  cy.checkCogsCellValue(5, 12, cog.uc_bu2_subunit1_12); //row, month, value
               } else {
                  throw new Error('Company subunit 1 of business unit 2 price for the 12th month is missing');
               }

               // Validate subunit 1 of business unit 2 price value for the 13th month if provided
               if (cog.uc_bu2_subunit1_13) {
                  cy.checkCogsCellValue(5, 13, cog.uc_bu2_subunit1_13); //row, month, value
               } else {
                  throw new Error('Company subunit 1 of business unit 2 price for the 13th month is missing');
               }

               // Validate subunit 1 of business unit 2 price value for the 24th month if provided
               if (cog.uc_bu2_subunit1_24) {
                  cy.checkCogsCellValue(5, 24, cog.uc_bu2_subunit1_24); //row, month, value
               } else {
                  throw new Error('Company subunit 1 of business unit 2 price for the 24th month is missing');
               }
            }

            // Click the save and close button
            cy.clickButton('Save & Close');

            // Intercept post and put revenue fetch
            cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
            cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');

            // Assert post and put fetches
            cy.wait(['@chartOfAccounts', '@calculatedDrivers'], { timeout: 10000 })
               .then(fetches => {
                  fetches.forEach(result => {
                     expect(result.response.statusCode).to.eq(200);
                  });
               });

            // // Assert if you are on Forecast COGS section
            // cy.expectedUrl('https://test.hz.modeliks.com/forecast/costofsales');

            // // Switch to organizational table view for better data visibility
            // cy.organizationalTableView();

            // // Click on the expand all button to ensure all sections are visible
            // cy.expandAll();

            // // Expand the COGS section
            // cy.expandRow(cog.type_name);

            // // Validate the main table company values for the 12th, 13th, and 24th months if provided
            // if (cog.total_company_12) {
            //    cy.checkCompanyValue(cog.type_name, 12, cog.total_company_12); // rowTitle, month, value
            // }

            // if (cog.total_company_13) {
            //    cy.checkCompanyValue(cog.type_name, 13, cog.total_company_13); // rowTitle, month, value
            // }

            // if (cog.total_company_24) {
            //    cy.checkCompanyValue(cog.type_name, 24, cog.total_company_24); // rowTitle, month, value
            // }

            // // Validate the main table business unit 1 values for the 12th, 13th, and 24th months if provided
            // if (cog.total_bu1_12) {
            //    cy.checkBusinessUnitValue(cog.type_name, 'BU1', 12, cog.total_bu1_12); // rowTitle, businessUnitName, month, value
            // }

            // if (cog.total_bu1_13) {
            //    cy.checkBusinessUnitValue(cog.type_name, 'BU1', 13, cog.total_bu1_13); // rowTitle, businessUnitName, month, value
            // }

            // if (cog.total_bu1_24) {
            //    cy.checkBusinessUnitValue(cog.type_name, 'BU1', 24, cog.total_bu1_24); // rowTitle, businessUnitName, month, value
            // }

            // // Validate the main table subunit 1 from BU2 values for the 12th, 13th, and 24th months if provided

            // if (cog.total_sub1_bu2_12) {
            //    // Expand the row
            //    cy.expandBusinessUnit(cog.type_name, 'BU2');

            //    cy.checkSubUnitValue(cog.type_name, 'BU2', 'Subunit 1', 12, cog.total_sub1_bu2_12); // rowTitle, businessUnitName, subunitName, month, value
            // }

            // if (cog.total_sub1_bu2_13) {
            //    cy.checkSubUnitValue(cog.type_name, 'BU2', 'Subunit 1', 13, cog.total_sub1_bu2_13); // rowTitle, businessUnitName, subunitName, month, value
            // }

            // if (cog.total_sub1_bu2_24) {
            //    cy.checkSubUnitValue(cog.type_name, 'BU2', 'Subunit 1', 24, cog.total_sub1_bu2_24); // rowTitle, businessUnitName, subunitName, month, value
            // }
         });
      });
   } else {
      throw new Error('No COGS data found in the fixture');
   }
});