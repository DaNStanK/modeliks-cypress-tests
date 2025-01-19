/// <reference types="cypress" />

import { tests } from "../fixtures/expenses.json";

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

      const expensesScreen = test.screens.find(t => t.screen === "Expense");
      if (!expensesScreen) throw new Error('Expense screen in JSON file is missing');

      // Extract tables from the expenses screen
      const tableOfExpenses = expensesScreen?.tables?.[0] || {};
      const tableOfGrowth = expensesScreen?.tables?.[1] || {};

      // Extract values from the tables
      const tableOfExpensesValues = tableOfExpenses?.value_per_month?.length > 0 ? {
         company: getTableValues(tableOfExpenses, 'company'),
         bu1: getTableValues(tableOfExpenses, 'bu1'),
         bu2: getTableValues(tableOfExpenses, 'bu2'),
         su1_bu1: getTableValues(tableOfExpenses, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfExpenses, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfExpenses, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfExpenses, 'su2_bu2')
      } : {};

      const tableOfGrowthValues = tableOfGrowth?.value_per_month?.length > 0 ? {
         company: getTableValues(tableOfGrowth, 'company'),
         bu1: getTableValues(tableOfGrowth, 'bu1'),
         bu2: getTableValues(tableOfGrowth, 'bu2'),
         su1_bu1: getTableValues(tableOfGrowth, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfGrowth, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfGrowth, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfGrowth, 'su2_bu2')
      } : {};

      describe(`Forecast Employee - ${detailsScreen.type_name}`, () => {
         before(() => {
            // Clear local storage, cookies, and tokens before starting tests
            cy.clearLocalStorage();

            // Login the user
            cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
         });

         it(`Should be able set the details section`, () => {
            // Visit forecast section
            cy.visit(`/forecast`);

            // Wait for the content to load
            cy.wait(2000);

            // Click on the specified section
            cy.clickButton(test.section);

            // Assert if you are on the correct section URL
            cy.expectedUrl(test.section_url);

            // Check the type of test
            if (test.type === "New Expense") {
               // Click on the add button
               cy.clickButton(test.create_button);

               // Populate expense name input field
               if (detailsScreen?.type_name) {
                  cy.setStreamName(detailsScreen.type_name);
               } else {
                  throw new Error('Employee name is missing');
               }

               // Choose expense function
               if (detailsScreen?.function) {
                  cy.setExpenseFunction(detailsScreen.function);
               } else {
                  throw new Error('Employee function is missing');
               }

               // Choose expense enter type
               if (detailsScreen?.enter_type) {
                  cy.setEnterType(detailsScreen.enter_type);
               } else {
                  throw new Error('Employee salary type is missing');
               }

               // Check if the specific revenue is % of specific revenue stream
               if (detailsScreen.enter_type.includes("% of specific revenue stream")) {
                  // Choose a specific revenue stream
                  if (detailsScreen?.specific_revenue) {
                     cy.setRevenueOnlyStream(detailsScreen.specific_revenue);
                  } else {
                     throw new Error('Employee specific revenue stream is missing');
                  }
               }
            }
         });

         it('Should be able to choose and set the advance settings', () => {
            // Select advance settings
            cy.chooseAdvanceSettings();

            // Choose planning level
            if (advanceSettingsScreen?.level) {
               cy.choosePlanningLevel(advanceSettingsScreen.level);
            } else {
               throw new Error('Planning level is missing');
            }

            // Choose allocation methodology
            if (advanceSettingsScreen?.level !== "SU") {
               cy.setAllocationMethodology(advanceSettingsScreen?.methodology);
            }

            // Click save button in the advanced settings and continue in the details popup
            cy.clickButton('Save');

            cy.clickButton('Next');
         });

         if (tableOfExpenses.value_per_month.length > 0) {
            it(`Should be able to set and check the assets table for ${detailsScreen.type_name}`, () => {

               // Check if we have some values for a function to be added within the test
               if (tableOfGrowth?.value_per_month?.length > 0) {
                  // Apply growth function
                  cy.applyFunction(tableOfExpenses.name, "Add Growth");

                  // Set the growth value on all subunits of all business units
                  setOrAssertValues("Set", tableOfGrowth.name, 9, tableOfGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfGrowth.name, 10, tableOfGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfGrowth.name, 12, tableOfGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Set", tableOfGrowth.name, 13, tableOfGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
               }

               // // Set the cell values in the table of employees        
               setOrAssertValues("Set", tableOfExpenses.name, 2, tableOfExpensesValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Set", tableOfExpenses.name, 3, tableOfExpensesValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Set", tableOfExpenses.name, 5, tableOfExpensesValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Set", tableOfExpenses.name, 6, tableOfExpensesValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

               // Assert the values of the table of expenses
               setOrAssertValues("Assert", tableOfExpenses.name, 0, tableOfExpensesValues.company); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Assert", tableOfExpenses.name, 1, tableOfExpensesValues.bu1); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Assert", tableOfExpenses.name, 2, tableOfExpensesValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Assert", tableOfExpenses.name, 3, tableOfExpensesValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Assert", tableOfExpenses.name, 4, tableOfExpensesValues.bu2); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Assert", tableOfExpenses.name, 5, tableOfExpensesValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
               setOrAssertValues("Assert", tableOfExpenses.name, 6, tableOfExpensesValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

               // Check if we have some values for a function to be added within the test
               if (tableOfGrowth?.value_per_month?.length > 0) {
                  // Assert the values of the growth table
                  setOrAssertValues("Assert", tableOfGrowth.name, 7, tableOfGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfGrowth.name, 8, tableOfGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfGrowth.name, 9, tableOfGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfGrowth.name, 10, tableOfGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfGrowth.name, 11, tableOfGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfGrowth.name, 12, tableOfGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
                  setOrAssertValues("Assert", tableOfGrowth.name, 13, tableOfGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
               }

               // Click Save & Close button
               cy.clickButton('Save & Close');

               cy.intercept('POST', 'api/chart_of_accounts').as('cOa');
               cy.intercept('PUT', 'api/cdv/calculateddrivers_v2').as('calculateDrivers');

               cy.wait(['@cOa', '@calculateDrivers']).then((interceptions) => {
                  interceptions.forEach((interception) => {
                     expect(interception.response.statusCode).to.eq(200);
                  });
               });
            });
         }
      });
   });
}