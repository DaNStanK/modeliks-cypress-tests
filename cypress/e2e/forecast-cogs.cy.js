/// <reference types="cypress" />

import { tests } from "../fixtures/cogs.json";

// Function to get table values based on key
const getTableValues = (table, key) => table.value_per_month.find(value => value.hasOwnProperty(key))?.[key] || [];

// Function to set or assert values in the table
const setOrAssertValues = (modeInput, tableName, rowIndex, values) => {
   if (Array.isArray(values)) {
      values.forEach((cellValue, index) => {
         const cellIndex = index + 1;
         cy.setOrAssertValue(modeInput, tableName, rowIndex, cellIndex, cellValue);
      });
   } else {
      throw new Error('Values is not an array');
   }
};

if (tests && tests.length > 0) {
   tests.forEach(test => {
      // Extract screens from the test
      const detailsScreen = test.screens.find(step => step.screen === 'Details');
      if (!detailsScreen) throw new Error('Details screen in JSON file is missing');

      const advanceSettingsScreen = test.screens.find(step => step.screen === 'Advance Settings');
      if (!advanceSettingsScreen) throw new Error('Advance Settings screen in JSON file is missing');

      const unitCostsScreen = test.screens.find(t => t.screen === "Unit Cost");
      if (!unitCostsScreen) throw new Error('Unit cost screen in JSON file is missing');

      const unitSalesScreen = test.screens.find(t => t.screen === "Unit Sales") || {};

      // Extract tables from the units cost screen
      const tableOfUnitCosts = unitCostsScreen?.tables?.[0] || {};
      const tableOfUnitCostGrowth = unitCostsScreen?.tables?.[1] || {};
      const averageUnitCosts = unitCostsScreen?.tables?.[2] || {};

      // Extract tables from the units sales screen
      const tableOfUnitSales = unitSalesScreen?.tables?.[0] || {};
      const tableOfUnitSalesGrowth = unitSalesScreen?.tables?.[1] || {};
      const averageUnitSales = unitSalesScreen?.tables?.[2] || {};

      // Extract values from the tables
      const tableOfUnitCostsValues = tableOfUnitCosts?.value_per_month?.length > 0 ? {
         company: getTableValues(tableOfUnitCosts, 'company'),
         bu1: getTableValues(tableOfUnitCosts, 'bu1'),
         bu2: getTableValues(tableOfUnitCosts, 'bu2'),
         su1_bu1: getTableValues(tableOfUnitCosts, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfUnitCosts, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfUnitCosts, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfUnitCosts, 'su2_bu2')
      } : {};

      const tableOfUnitSalesValues = tableOfUnitSales?.value_per_month?.length > 0 ? {
         company: getTableValues(tableOfUnitSales, 'company'),
         bu1: getTableValues(tableOfUnitSales, 'bu1'),
         bu2: getTableValues(tableOfUnitSales, 'bu2'),
         su1_bu1: getTableValues(tableOfUnitSales, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfUnitSales, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfUnitSales, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfUnitSales, 'su2_bu2')
      } : {};

      const tableOfUnitCostsGrowthValues = tableOfUnitCostGrowth?.value_per_month?.length > 0 ? {
         company: getTableValues(tableOfUnitCostGrowth, 'company'),
         bu1: getTableValues(tableOfUnitCostGrowth, 'bu1'),
         bu2: getTableValues(tableOfUnitCostGrowth, 'bu2'),
         su1_bu1: getTableValues(tableOfUnitCostGrowth, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfUnitCostGrowth, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfUnitCostGrowth, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfUnitCostGrowth, 'su2_bu2')
      } : {};

      const tableOfUnitSalesGrowthValues = tableOfUnitSalesGrowth?.value_per_month?.length > 0 ? {
         company: getTableValues(tableOfUnitSalesGrowth, 'company'),
         bu1: getTableValues(tableOfUnitSalesGrowth, 'bu1'),
         bu2: getTableValues(tableOfUnitSalesGrowth, 'bu2'),
         su1_bu1: getTableValues(tableOfUnitSalesGrowth, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfUnitSalesGrowth, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfUnitSalesGrowth, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfUnitSalesGrowth, 'su2_bu2')
      } : {};

      describe(`Forecast COGS ${detailsScreen?.type_name}`, () => {
         before(() => {
            // Clear local storage, cookies, and tokens before starting tests
            cy.clearLocalStorage();

            // Login the user
            cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
         });

         it(`Should be able set the details section for ${detailsScreen?.type_name}`, () => {
            // Visit forecast section
            cy.visit(`/forecast`);

            // Wait for the content to load
            cy.wait(2000);

            // Click on COGS section
            cy.clickButton(test.section);

            // Assert if you are on Forecast COGS section
            cy.expectedUrl(test.section_url);

            // Check the type of test
            if (test.type === "New COGS") {
               // Click on the add button
               cy.clickButton(test.create_button);

               // Populate COGS Name input field
               if (detailsScreen?.type_name) {
                  cy.setCostOfGoodsName(detailsScreen?.type_name);
               } else {
                  throw new Error('COGS name is missing');
               }

               // Choose the COGS relation
               if (detailsScreen?.specific_revenue) {
                  cy.selectRelation(detailsScreen?.specific_revenue);
               } else {
                  throw new Error('COGS specific relation stream is missing');
               }

               // Choose the type of cost
               if (detailsScreen?.cost_type) {
                  cy.selectTypeOfCost(detailsScreen?.cost_type);
               } else {
                  throw new Error('Type of cost is missing');
               }
            }
         });

         it(`Should be able to choose and set the advance settings for ${detailsScreen?.type_name}`, () => {
            // Select advance settings
            cy.chooseAdvanceSettings();

            // Choose planning level
            if (advanceSettingsScreen?.level) {
               cy.choosePlanningLevel(advanceSettingsScreen?.level);
            } else {
               throw new Error('Planning level is missing');
            }

            // Set allocation methodology if planning level is not Level 3 - SU
            if (advanceSettingsScreen?.level !== 'SU') {
               if (advanceSettingsScreen?.methodology) {
                  cy.setAllocationMethodology(advanceSettingsScreen?.methodology);
               } else {
                  throw new Error('Allocation methodology is missing');
               }
            }

            // Click save button in the advanced settings
            cy.clickButton('Save');

            // Click next button and continue to unit sales info section
            cy.clickButton('Next');
         });

         if (tableOfUnitCosts?.value_per_month?.length > 0) {
            it(`Should be able to set and check the unit cost table for ${detailsScreen?.type_name}`, () => {
               // Set the unit cost setup level
               if (advanceSettingsScreen.level === 'SU') {

                  // Check if we have some values for a function to be added within the test
                  if (tableOfUnitCostGrowth?.value_per_month?.length > 0) {
                     // Apply growth function
                     cy.applyFunction(tableOfUnitCosts.name, "Add Growth");

                     // Set the growth value on all subunits of all business units
                     setOrAssertValues("Set", tableOfUnitCostGrowth.name, 9, tableOfUnitCostsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Set", tableOfUnitCostGrowth.name, 10, tableOfUnitCostsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Set", tableOfUnitCostGrowth.name, 12, tableOfUnitCostsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Set", tableOfUnitCostGrowth.name, 13, tableOfUnitCostsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
                  }

                  // Set the cell values in the table of unit cost        
                  setOrAssertValues("Set", tableOfUnitCosts.name, 2, tableOfUnitCostsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfUnitCosts.name, 3, tableOfUnitCostsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfUnitCosts.name, 5, tableOfUnitCostsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfUnitCosts.name, 6, tableOfUnitCostsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
               }

               if (advanceSettingsScreen.level === 'BU') {
                  if (tableOfUnitCostGrowth?.value_per_month?.length > 0) {
                     // Apply growth function
                     cy.applyFunction(tableOfUnitCosts.name, "Add Growth");

                     // Set the growth value on all business units
                     setOrAssertValues("Set", tableOfUnitCostGrowth.name, 8, tableOfUnitCostsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Set", tableOfUnitCostGrowth.name, 11, tableOfUnitCostsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue
                  }

                  // Set the cell values in the table of unit cost        
                  setOrAssertValues("Set", tableOfUnitCosts.name, 1, tableOfUnitCostsValues.bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfUnitCosts.name, 4, tableOfUnitCostsValues.bu2); // modeInput, tableName, rowIndex, cellValue
               }

               // Check if we have some values for a function to be added within the test
               if (tableOfUnitCostGrowth?.value_per_month?.length > 0) {
                  // Apply growth function
                  cy.applyFunction(tableOfUnitCosts.name, "Add Growth");

                  // Set the growth value on all units
                  setOrAssertValues("Set", tableOfUnitCostGrowth.name, 1, tableOfUnitCostsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
               }

               if (advanceSettingsScreen.level === "Level 1") {
                  // Set the cell values in the table of unit cost        
                  setOrAssertValues("Set", tableOfUnitCosts.name, 0, tableOfUnitCostsValues.company); // modeInput, tableName, rowIndex, cellValue
               }

               // Assert the values of the table of unit cost
               setOrAssertValues("Assert", tableOfUnitCosts.name, 0, tableOfUnitCostsValues.company); // modeInput, tableName, rowIndex, cellValue

               // Assert if we have some values for a function to be added within the test
               if (tableOfUnitCostGrowth?.value_per_month?.length > 0) {
                  // Assert the values of the growth table
                  setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 7, tableOfUnitCostsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
               }

               // Assert if we have values for the business units
               if (advanceSettingsScreen.level === 'BU') {
                  setOrAssertValues("Assert", tableOfUnitCosts.name, 1, tableOfUnitCostsValues.bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfUnitCosts.name, 4, tableOfUnitCostsValues.bu2); // modeInput, tableName, rowIndex, cellValue

                  // Assert if we have some values for a function to be added within the test
                  if (tableOfUnitCostGrowth?.value_per_month?.length > 0) {
                     setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 8, tableOfUnitCostsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 11, tableOfUnitCostsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
                  }
               }

               // Assert if we have values for the subunits
               if (advanceSettingsScreen.level === 'SU') {
                  setOrAssertValues("Assert", tableOfUnitCosts.name, 2, tableOfUnitCostsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfUnitCosts.name, 3, tableOfUnitCostsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfUnitCosts.name, 5, tableOfUnitCostsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfUnitCosts.name, 6, tableOfUnitCostsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

                  // Assert if we have some values for a function to be added within the test
                  if (tableOfUnitCostGrowth?.value_per_month?.length > 0) {
                     setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 9, tableOfUnitCostsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 10, tableOfUnitCostsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 12, tableOfUnitCostsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
                     setOrAssertValues("Assert", tableOfUnitCostGrowth.name, 13, tableOfUnitCostsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
                  }
               }

               if (advanceSettingsScreen.methodology === "% breakdown") {
                  // Click next button
                  cy.clickButton('Next');
               } else {
                  // Click Save & Close button
                  cy.clickButton('Save & Close');

                  cy.intercept('POST', 'api/chart_of_accounts').as('cOa');
                  cy.intercept('PUT', 'api/cdv/calculateddrivers_v2').as('calculateDrivers');

                  // Check if the POST and PUT fetches were successful
                  cy.wait(['@cOa', '@calculateDrivers']).then((interceptions) => {
                     interceptions.forEach((interception) => {
                        expect(interception.response.statusCode).to.eq(200);
                     });
                  });
               }
            });
         }

         if (advanceSettingsScreen.methodology === "% breakdown") {
            it(`Should be able to set and check the unit sales table for ${detailsScreen?.type_name}`, () => {

            });
         }

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
      });
   });

}
