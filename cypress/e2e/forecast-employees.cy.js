/// <reference types="cypress" />

import { tests } from "../fixtures/employees.json";

describe("Forecast Employees", () => {
  before(() => {
    // Clear local storage, cookies, and tokens before starting tests
    cy.clearLocalStorage();
    cy.clearCookies();

    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

  if (tests && tests.length > 0) {
    tests.forEach(test => {
      const detailsScreen = test.screens.find(step => step.screen === 'Details');
      const advanceSettingsScreen = test.screens.find(step => step.screen === 'Advance Settings');
      const numberOfEmployeesScreen = test.screens.find(t => t.screen === "Number of employees");
      const costPerEmployeesScreen = test.screens.find(t => t.screen === "Cost per employees");
      const burdenRate = test.screens.find(step => step.screen === 'Burden Rate');
      const tableOfEmployees = numberOfEmployeesScreen.tables.find(table => table.name === "Number of employees");
      const tableOfCostPerEmployees = costPerEmployeesScreen.tables.find(table => table.name === "Cost per employees");

      const getTableValues = (table, key) => table.value_per_month.find(value => value.hasOwnProperty(key))?.[key] || [];

      const tableOfEmployeesValues = {
         company: getTableValues(tableOfEmployees, 'company'),
         bu1: getTableValues(tableOfEmployees, 'bu1'),
         bu2: getTableValues(tableOfEmployees, 'bu2'),
         su1_bu1: getTableValues(tableOfEmployees, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfEmployees, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfEmployees, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfEmployees, 'su2_bu2')
      };

      const tableOfCostPerEmployeesValues = {
         company: getTableValues(tableOfCostPerEmployees, 'company'),
         bu1: getTableValues(tableOfCostPerEmployees, 'bu1'),
         bu2: getTableValues(tableOfCostPerEmployees, 'bu2'),
         su1_bu1: getTableValues(tableOfCostPerEmployees, 'su1_bu1'),
         su2_bu1: getTableValues(tableOfCostPerEmployees, 'su2_bu1'),
         su1_bu2: getTableValues(tableOfCostPerEmployees, 'su1_bu2'),
         su2_bu2: getTableValues(tableOfCostPerEmployees, 'su2_bu2')
      };

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

      if (!numberOfEmployeesScreen) {
        throw new Error('Number of employees screen is missing');
      }
      
      if (!tableOfEmployees) {
        throw new Error('Table of employees is missing');
      }

      if (!tableOfCostPerEmployees) {
        throw new Error('Table of cost per employees is missing');
      }

      it(`Should be able to login and set the details section`, () => {

        // Visit forecast section
        cy.visit(`/forecast`);

        // Wait the content to load
        cy.wait(2000);

        // Click on the specified section
        cy.clickButton(test.section);

        // Assert if you are on the correct section URL
        cy.expectedUrl(test.section_url);

        // Check the type of test
        if (test.type === "New Employees") {
          // Click on the add button
          cy.clickButton(test.create_button);

          // Populate Employee name input field
          if (detailsScreen?.type_name) {
            cy.setEmployeeName(detailsScreen.type_name);
          } else {
            throw new Error('Employee name is missing');
          }

          // Choose employee function
          if (detailsScreen?.function) {
            cy.setEmployeeFunction(detailsScreen.function);
          } else {
            throw new Error('Employee function is missing');
          }

          // Choose employee salary type
          if (detailsScreen?.salary_type) {
            cy.setEmployeeSalaryType(detailsScreen.salary_type);
          } else {
            throw new Error('Employee salary type is missing');
          }

          // Check if the specific revenue is % of specific revenue stream
          if (detailsScreen.salary_type === "% of specific revenue stream") {
            // Choose a specific revenue stream
            if (detailsScreen?.specific_revenue) {
              cy.setRevenueOnlyStream(detailsScreen.specific_revenue);
            } else {
              throw new Error('Employee specific revenue stream is missing');
            }
          }

          // Choose employee status
          if (detailsScreen?.status) {
            cy.setEmployeeStatus(detailsScreen.status);
          } else {
            throw new Error('Employee status is missing');
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
   
         // Click save button in the advanced settings and continue in the details popup
         cy.clickButton('Save');

         cy.clickButton('Next');
      });

      it('Should be able to set and check the number of employees table', () => { 
          // Set or assert the cell values in the table of employees        
          setOrAssertValues("Set", tableOfEmployees.name, 2, tableOfEmployeesValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfEmployees.name, 2, tableOfEmployeesValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
          
          setOrAssertValues("Set", tableOfEmployees.name, 3, tableOfEmployeesValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfEmployees.name, 3, tableOfEmployeesValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
        
          setOrAssertValues("Set", tableOfEmployees.name, 5, tableOfEmployeesValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfEmployees.name, 5, tableOfEmployeesValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
        
          setOrAssertValues("Set", tableOfEmployees.name, 6, tableOfEmployeesValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfEmployees.name, 6, tableOfEmployeesValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
          
          setOrAssertValues("Assert", tableOfEmployees.name, 0, tableOfEmployeesValues.company); // modeInput, tableName, rowIndex, cellValue
          
          setOrAssertValues("Assert", tableOfEmployees.name, 1, tableOfEmployeesValues.bu1); // modeInput, tableName, rowIndex, cellValue
          
          setOrAssertValues("Assert", tableOfEmployees.name, 4, tableOfEmployeesValues.bu2); // modeInput, tableName, rowIndex, cellValue
    
          // Click next button and continue to cost per employees subsection
          cy.clickButton('Next');
      });

      it('Should be able to set and check the cost per employees table', () => {
         // Set or assert the cell values in the table of cost per employee
         setOrAssertValues("Set", tableOfCostPerEmployees.name, 2, tableOfCostPerEmployeesValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 2, tableOfCostPerEmployeesValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
         
         setOrAssertValues("Set", tableOfCostPerEmployees.name, 3, tableOfCostPerEmployeesValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 3, tableOfCostPerEmployeesValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
         
         setOrAssertValues("Set", tableOfCostPerEmployees.name, 5, tableOfCostPerEmployeesValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 5, tableOfCostPerEmployeesValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
         
         setOrAssertValues("Set", tableOfCostPerEmployees.name, 6, tableOfCostPerEmployeesValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 6, tableOfCostPerEmployeesValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 0, tableOfCostPerEmployeesValues.company); // modeInput, tableName, rowIndex, cellValue
        
         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 1, tableOfCostPerEmployeesValues.bu1); // modeInput, tableName, rowIndex, cellValue
        
         setOrAssertValues("Assert", tableOfCostPerEmployees.name, 4, tableOfCostPerEmployeesValues.bu2); // modeInput, tableName, rowIndex, cellValue
   
         // Click Save & Close button
         cy.clickButton('Save & Close');
      });
    });
  }
});