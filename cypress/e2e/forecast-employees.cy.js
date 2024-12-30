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
   
    // Select advance settings
    cy.chooseAdvanceSettings();

    // Choose planning level
    cy.choosePlanningLevel('Level 1');

    // Click save button in the advanced settings
    cy.clickButton('Save');

   // Click next button
   cy.get('.scdfab_dialog_actions_div')
      .eq(1)
      .find('button[type="button"]')
      .contains('Next')
      // .closest('button')
      .click({ force: true });
   // cy.clickButton('Next');

   // Click next button
   cy.clickButton('Next');

   // Click save and close button
   cy.clickButton('Save & Close');
});

//   if (tests && tests.length > 0) {
//      tests.forEach((test) => {
//          const details = test.steps.find(step => step.screen === 'Details');
//          const advanceSettings = test.steps.find(step => step.screen === 'Advance Settings');
//          const unitSales = test.steps.find(step => step.screen === 'Unit Sales');
//          const burdenRate = test.steps.find(step => step.screen === 'Burden Rate');

//        it(`should be able to create ${test.type_name}`, () => {
//          cy.wait(500);

//          // Click on COGS section
//          cy.clickButton(test.section);

//          // Assert if you are on Forecast COGS section
//          cy.expectedUrl(test.section_url);

//          // Check the type of test
//          if (test.type === "New Employees") {
//              // Click on the add button
//              cy.clickButton(test.create_button);

//              // Populate Employee name input field
//              if (details.type_name) {
//                 cy.setEmployeeName(details.type_name);
//              } else {
//                 throw new Error('Employee name is missing');
//              }
             
//              // Choose employee function
//              if (details.function) {
//                 cy.setEmployeeFunction(details.function);
//              } else {
//                 throw new Error('Employee function is missing');
//              }
             
//              // Choose employee salary type
//              if (details.salary_type) {
//                 cy.setEmployeeSalaryType(details.salary_type);
//              } else {
//                 throw new Error('Employee salary type is missing');
//              }             
             
//              // Check if the specific revenue is % of specific revenue stream
//              if(details.salary_type === "% of specific revenue stream") {
//                 // Choose a specific revenue stream
//                 if (details.specific_revenue) {
//                    cy.setRevenueOnlyStream(details.specific_revenue);
//                 } else {
//                    throw new Error('Employee specific revenue stream is missing');
//                 }
//             }
            
//             // Choose employee status
//             if (details.status) {
//                cy.setEmployeeStatus(details.status);
//             } else {
//                throw new Error('Employee status is missing');
//             }

//             // Select advance settings
//             cy.chooseAdvanceSettings();

//             // Choose planning level
//             if (advanceSettings.level) {
//                cy.choosePlanningLevel(advanceSettings.level);
//             } else {
//                throw new Error('Planning level is missing');
//             }

//             // Set allocation methodology if planning level is not Level 3 - SU
//             if (advanceSettings.level !== 'SU') {
//                if (advanceSettings.methodology) {
//                   cy.setAllocationMethodology(advanceSettings.methodology);
//                } else {
//                   throw new Error('Allocation methodology is missing');
//                }
//             }

//             // Click save button in the advanced settings
//                cy.clickButton('Save')

//             // // Click next button and continue to unit sales info section
//                cy.clickButton('Next');


//          }
//        });
//      });
//   }
});