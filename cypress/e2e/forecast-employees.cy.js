/// <reference types="cypress" />

import { tests } from "../fixtures/employees.json";

describe("Forecast Employees", () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

  it(`Should be able to create blank Employees L1`, () => {
   // Assert if you are on Forecast revenues section
   cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

   // Click on Employees section
   cy.clickButton('Employees')

   cy.wait(500);

   // Assert if you are on Forecast revenues section
   cy.expectedUrl('https://test.hz.modeliks.com/forecast/employees');

   // Click on Add Other Employees Stream button
   cy.clickButton('Add Employees');

   // Populate Employees name input field
   cy.setRevenueName('Blank Employees L1');

   cy.setEmployeeFunction('!!Direct labor (Part of Cost of Goods Sold)');
   
    // Select advance settings
    cy.chooseAdvanceSettings();

    // Choose planning level
    cy.choosePlanningLevel('Level 1');

    // Click save button in the advanced settings
    cy.clickButton('Save');

   // Click next button
   cy.clickButton('Next');

   // Click next button
   cy.clickButton('Next');

   // Click save and close button
   cy.clickButton('Save & Close');
});

  it(`Should be able to create blank Employees L2`, () => {
   // Assert if you are on Forecast revenues section
   cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

   // Click on Employees section
   cy.clickButton('Employees')

   cy.wait(500);

   // Assert if you are on Forecast revenues section
   cy.expectedUrl('https://test.hz.modeliks.com/forecast/employees');

   // Click on Add Other Employees Stream button
   cy.clickButton('Add Employees');

   // Populate Employees name input field
   cy.setRevenueName('Blank Employees L1');

   cy.setEmployeeFunction('!!Direct labor (Part of Cost of Goods Sold)');
   
    // Select advance settings
    cy.chooseAdvanceSettings();

    // Choose planning level
    cy.choosePlanningLevel('BU');

    // Click save button in the advanced settings
    cy.clickButton('Save');

   // Click next button
   cy.clickButton('Next');

   // Click next button
   cy.clickButton('Next');

   // Click save and close button
   cy.clickButton('Save & Close');
});

  it(`Should be able to create blank Employees L3`, () => {
   // Assert if you are on Forecast revenues section
   cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

   // Click on Employees section
   cy.clickButton('Employees')

   cy.wait(500);

   // Assert if you are on Forecast revenues section
   cy.expectedUrl('https://test.hz.modeliks.com/forecast/employees');

   // Click on Add Other Employees Stream button
   cy.clickButton('Add Employees');

   // Populate Employees name input field
   cy.setRevenueName('Blank Employees L1');

   cy.setEmployeeFunction('!!Direct labor (Part of Cost of Goods Sold)');
   
    // Select advance settings
    cy.chooseAdvanceSettings();

    // Choose planning level
    cy.choosePlanningLevel('SU');

    // Click save button in the advanced settings
    cy.clickButton('Save');

   // Click next button
   cy.clickButton('Next');

   // Click next button
   cy.clickButton('Next');

   // Click save and close button
   cy.clickButton('Save & Close');
});

  if (tests && tests.length > 0) {
    tests.forEach(test => {
      const detailsScreen = test.screens.find(step => step.screen === 'Details');
      const advanceSettingsScreen = test.screens.find(step => step.screen === 'Advance Settings');
      const numberOfEmployeesScreen = test.screens.find(t => t.screen === "Number of employees");
      const costPerEmployeesScreen = test.screens.find(t => t.screen === "Cost per employees");
      const burdenRate = test.screens.find(step => step.screen === 'Burden Rate');

      if (!numberOfEmployeesScreen) {
        throw new Error('Number of employees screen is missing');
      }

      const tableOfEmployees = numberOfEmployeesScreen.tables.find(table => table.name === "Number of employees");
      const tableOfCostPerEmployees = costPerEmployeesScreen.tables.find(table => table.name === "Cost per employees");

      if (!tableOfEmployees) {
        throw new Error('Table of employees is missing');
      }

      if (!tableOfCostPerEmployees) {
        throw new Error('Table of cost per employees is missing');
      }

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

      it.only(`should be able to create ${test.type_name}`, () => {
        cy.wait(500);

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

          // Select advance settings
          cy.chooseAdvanceSettings();

          // Choose planning level
          if (advanceSettingsScreen?.level) {
            cy.choosePlanningLevel(advanceSettingsScreen.level);
          } else {
            throw new Error('Planning level is missing');
          }

          // Set allocation methodology if planning level is not Level 3 - SU
          if (advanceSettingsScreen?.level !== 'SU') {
            if (advanceSettingsScreen?.methodology) {
              cy.setAllocationMethodology(advanceSettingsScreen.methodology);
            } else {
              throw new Error('Allocation methodology is missing');
            }
          }

          // Click save button in the advanced settings and continue in the details popup
          cy.clickButton('Save');

          // Click next button and continue to number of employees subsection
          cy.clickButton('Next');

          // Apply values on subunits - Level 3
          if(advanceSettingsScreen?.level === "SU") {  
            // // Check if subunit 1 from business unit 1 value for the table of employees is missing
            // if(tableOfEmployeesValues.su1_bu1[0]) {
            //   cy.setOrAssertValue(tableOfEmployees.name, 2, 1, tableOfEmployeesValues.su1_bu1[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfEmployees.name, 2, 1); // row, month
            // } else {
            //   throw new Error('Subunit 1 of business unit 1 value for the first month is missing');
            // }

            // // Check if subunit 2 from business unit 1 value for the table of employees is missing
            // if(tableOfEmployeesValues.su2_bu1[0]) {
            //   cy.setOrAssertValue(tableOfEmployees.name, 3, 1, tableOfEmployeesValues.su2_bu1[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfEmployees.name, 3, 1); // row, month
            // } else {
            //   throw new Error('Subunit 2 of business unit 1 value for the first month is missing');
            // }

            // // Check if subunit 1 from business unit 2 value for the table of employees is missing
            // if(tableOfEmployeesValues.su1_bu2[0]) {
            //   cy.setOrAssertValue(tableOfEmployees.name, 5, 1, tableOfEmployeesValues.su1_bu2[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfEmployees.name, 5, 1); // row, month
            // } else {
            //   throw new Error('Subunit 1 of business unit 2 value for the first month is missing');
            // }
            
            // // Check if subunit 2 from business unit 2 value for the table of employees is missing
            // if(tableOfEmployeesValues.su2_bu2[0]) {
            //   cy.setOrAssertValue(tableOfEmployees.name, 6, 1, tableOfEmployeesValues.su2_bu2[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfEmployees.name, 6, 1); // row, month
            // } else {
            //   throw new Error('Subunit 2 of business unit 2 value for the first month is missing');
            // }
            
            // // Assert values of company in the number of employees table
            // if(tableOfEmployeesValues.company.length > 0) {
            //   // Assert the value for the 12th Month
            //   cy.setOrAssertValue(tableOfEmployees.name, 0, 12, tableOfEmployeesValues.company[11]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the first year
            //   cy.setOrAssertValue(tableOfEmployees.name, 0, 13, tableOfEmployeesValues.company[12]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the second year
            //   cy.setOrAssertValue(tableOfEmployees.name, 0, 14, tableOfEmployeesValues.company[13]); // tableName, rowIndex, cellIndex, value

            // }

            // // Assert values of business unit 1 in the number of employees table
            // if(tableOfEmployeesValues.bu1.length > 0) {
            //   // Assert the value for the 12th Month
            //   cy.setOrAssertValue(tableOfEmployees.name, 1, 12, tableOfEmployeesValues.bu1[11]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the first year
            //   cy.setOrAssertValue(tableOfEmployees.name, 1, 13, tableOfEmployeesValues.bu1[12]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the second year
            //   cy.setOrAssertValue(tableOfEmployees.name, 1, 14, tableOfEmployeesValues.bu1[13]); // tableName, rowIndex, cellIndex, value

            // }

            // // Assert values of subunit 1 from business unit 2 in the number of employees table
            // if(tableOfEmployeesValues.su1_bu2.length > 0) {
            //   // Assert the value for the 12th Month
            //   cy.setOrAssertValue(tableOfEmployees.name, 5, 12, tableOfEmployeesValues.su1_bu2[11]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the first year
            //   cy.setOrAssertValue(tableOfEmployees.name, 5, 13, tableOfEmployeesValues.su1_bu2[12]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the second year
            //   cy.setOrAssertValue(tableOfEmployees.name, 5, 14, tableOfEmployeesValues.su1_bu2[13]); // tableName, rowIndex, cellIndex, value

            // }

            // // Click next button and continue to cost per employees subsection
            // cy.clickButton('Next');

            // // Check if subunit 1 from business unit 1 value for the table of cost per employees is missing
            // if(tableOfCostPerEmployeesValues.su1_bu1[0]) {
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 2, 1, tableOfCostPerEmployeesValues.su1_bu1[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfCostPerEmployees.name, 2, 1); // row, month
            // } else {
            //   throw new Error('Subunit 1 of business unit 1 value for the first month is missing');
            // }

            // // Check if subunit 2 from business unit 1 value for the table of cost per employees is missing
            // if(tableOfCostPerEmployeesValues.su2_bu1[0]) {
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 3, 1, tableOfCostPerEmployeesValues.su2_bu1[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfCostPerEmployees.name, 3, 1); // row, month
            // } else {
            //   throw new Error('Subunit 2 of business unit 1 value for the first month is missing');
            // }

            // // Check if subunit 1 from business unit 2 value for the table of cost per employees is missing
            // if(tableOfCostPerEmployeesValues.su1_bu2[0]) {
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 5, 1, tableOfCostPerEmployeesValues.su1_bu2[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfCostPerEmployees.name, 5, 1); // row, month
            // } else {
            //   throw new Error('Subunit 1 of business unit 2 value for the first month is missing');
            // }

            // // Check if subunit 2 from business unit 2 value for the table of cost per employees is missing
            // if(tableOfCostPerEmployeesValues.su2_bu2[0]) {
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 6, 1, tableOfCostPerEmployeesValues.su2_bu2[0]); // tableName, rowIndex, cellIndex, value
            //   cy.applyToAllFieldsAllocation(tableOfCostPerEmployees.name, 6, 1); // row, month
            // } else {
            //   throw new Error('Subunit 2 of business unit 2 value for the first month is missing');
            // }

                        
            // // Assert values of company in the number of employees table
            // if(tableOfCostPerEmployeesValues.company.length > 0) {
            //   // Assert the value for the 12th Month
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 0, 12, tableOfCostPerEmployeesValues.company[11]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the first year
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 0, 13, tableOfCostPerEmployeesValues.company[12]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the second year
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 0, 14, tableOfCostPerEmployeesValues.company[13]); // tableName, rowIndex, cellIndex, value

            // }

            // // Assert values of business unit 1 in the number of employees table
            // if(tableOfCostPerEmployeesValues.bu1.length > 0) {
            //   // Assert the value for the 12th Month
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 1, 12, tableOfCostPerEmployeesValues.bu1[11]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the first year
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 1, 13, tableOfCostPerEmployeesValues.bu1[12]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the second year
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 1, 14, tableOfCostPerEmployeesValues.bu1[13]); // tableName, rowIndex, cellIndex, value

            // }

            // // Assert values of subunit 1 from business unit 2 in the number of employees table
            // if(tableOfCostPerEmployeesValues.su1_bu2.length > 0) {
            //   // Assert the value for the 12th Month
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 5, 12, tableOfCostPerEmployeesValues.su1_bu2[11]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the first year
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 5, 13, tableOfCostPerEmployeesValues.su1_bu2[12]); // tableName, rowIndex, cellIndex, value
            //   // Assert the value for the second year
            //   cy.setOrAssertValue(tableOfCostPerEmployees.name, 5, 14, tableOfCostPerEmployeesValues.su1_bu2[13]); // tableName, rowIndex, cellIndex, value
            // }
            
            // Set or assert values for each planning level
            const setOrAssertValues = (tableName, row, values) => {
              values.forEach((value, index) => {
                const cellIndex = index + 1;
                cy.setOrAssertValue(tableName, row, cellIndex, value);
              });
            };

            // Set or assert the cell values in the table of employees
            setOrAssertValues(tableOfEmployees.name, 2, tableOfEmployeesValues.su1_bu1);
            setOrAssertValues(tableOfEmployees.name, 3, tableOfEmployeesValues.su2_bu1);
            setOrAssertValues(tableOfEmployees.name, 5, tableOfEmployeesValues.su1_bu2);
            setOrAssertValues(tableOfEmployees.name, 6, tableOfEmployeesValues.su2_bu2);
            setOrAssertValues(tableOfEmployees.name, 0, tableOfEmployeesValues.company);
            setOrAssertValues(tableOfEmployees.name, 1, tableOfEmployeesValues.bu1);
            setOrAssertValues(tableOfEmployees.name, 4, tableOfEmployeesValues.bu2);

            // Click next button and continue to cost per employees subsection
            cy.clickButton('Next');

            // Set or assert the cell values in the table of cost per employee
            setOrAssertValues(tableOfCostPerEmployees.name, 2, tableOfCostPerEmployeesValues.su1_bu1);
            setOrAssertValues(tableOfCostPerEmployees.name, 3, tableOfCostPerEmployeesValues.su2_bu1);
            setOrAssertValues(tableOfCostPerEmployees.name, 5, tableOfCostPerEmployeesValues.su1_bu2);
            setOrAssertValues(tableOfCostPerEmployees.name, 6, tableOfCostPerEmployeesValues.su2_bu2);
            setOrAssertValues(tableOfCostPerEmployees.name, 0, tableOfCostPerEmployeesValues.company);
            setOrAssertValues(tableOfCostPerEmployees.name, 1, tableOfCostPerEmployeesValues.bu1);
            setOrAssertValues(tableOfCostPerEmployees.name, 4, tableOfCostPerEmployeesValues.bu2);

            // Click Save & Close button
            cy.clickButton('Save & Close');
          }
        }
      });
    });
  }
});