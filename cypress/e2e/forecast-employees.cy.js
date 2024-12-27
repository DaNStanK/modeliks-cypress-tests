/// <reference types="cypress" />

import { tests } from "../fixtures/employees.json";

describe("Forecast Employees", () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

  if (tests && tests.length > 0) {
     tests.forEach((test) => {
         const details = test.steps.find(step => step.screen === 'Details');
         const advanceSettings = test.steps.find(step => step.screen === 'Advance Settings');
         const unitSales = test.steps.find(step => step.screen === 'Unit Sales');
         const burdenRate = test.steps.find(step => step.screen === 'Burden Rate');

       it(`should be able to create ${test.type_name}`, () => {
         cy.wait(500);

         // Click on COGS section
         cy.clickButton(test.section);

         // Assert if you are on Forecast COGS section
         cy.expectedUrl(test.section_url);

         // Check the type of test
         if (test.type === "New Employees") {
             // Click on the add button
             cy.clickButton(test.create_button);

             // Populate Employee name input field
             if (details.type_name) {
                cy.setEmployeeName(details.type_name);
             } else {
                throw new Error('Employee name is missing');
             }
             
             // Choose employee function
             if (details.function) {
                cy.setEmployeeFunction(details.function);
             } else {
                throw new Error('Employee function is missing');
             }
             
             // Choose employee salary type
             if (details.salary_type) {
                cy.setEmployeeSalaryType(details.salary_type);
             } else {
                throw new Error('Employee salary type is missing');
             }             
             
             // Check if the specific revenue is % of specific revenue stream
             if(details.salary_type === "% of specific revenue stream") {
                // Choose a specific revenue stream
                if (details.specific_revenue) {
                   cy.setRevenueOnlyStream(details.specific_revenue);
                } else {
                   throw new Error('Employee specific revenue stream is missing');
                }
            }
            
            // Choose employee status
            if (details.status) {
               cy.setEmployeeStatus(details.status);
            } else {
               throw new Error('Employee status is missing');
            }


         }
       });
     });
  }
});