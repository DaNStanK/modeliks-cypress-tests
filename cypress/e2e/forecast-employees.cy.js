/// <reference types="cypress" />

import { tests } from "../fixtures/employees.json";

describe("Forecast Employees", () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

  it.only(`Should be able to create blank Employees L1`, () => {
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

  it.only(`Should be able to create blank Employees L2`, () => {
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

  it.only(`Should be able to create blank Employees L3`, () => {
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
      if (!tableOfEmployees) {
        throw new Error('Table of employees is missing');
      }

      const companyValues = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('company'))?.company || [];
      const bu1 = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('bu1'))?.bu1 || [];
      const bu2 = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('bu2'))?.bu2 || [];
      const su1Bu1Values = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('su1_bu1'))?.su1_bu1 || [];
      const su2Bu1Values = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('su2_bu1'))?.su2_bu1 || [];
      const su1Bu2Values = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('su1_bu2'))?.su1_bu2 || [];
      const su2Bu2Values = tableOfEmployees.value_per_month.find(value => value.hasOwnProperty('su2_bu2'))?.su2_bu2 || [];

      it(`should be able to create ${test.type_name}`, () => {
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
          if (advanceSettingsScreen.level !== 'SU') {
            if (advanceSettingsScreen?.methodology) {
              cy.setAllocationMethodology(advanceSettingsScreen.methodology);
            } else {
              throw new Error('Allocation methodology is missing');
            }
          }

          // Click save button in the advanced settings
          cy.clickButton('Save');

          // Click next button
          cy.clickButton('Next');

          // Set or assert values for each planning level
          const setOrAssertValues = (row, values) => {
            values.forEach((value, index) => {
              const cellIndex = index + 1;
              cy.setOrAssertValue(row, cellIndex, value);
            });
          };

          setOrAssertValues(2, su1Bu1Values);
          setOrAssertValues(3, su2Bu1Values);
          setOrAssertValues(5, su1Bu2Values);
          setOrAssertValues(6, su2Bu2Values);
          setOrAssertValues(0, companyValues);
          setOrAssertValues(1, bu1);
          setOrAssertValues(4, bu2);

          // Click next button
          cy.clickButton('Next');
        }
      });
    });
  }
});