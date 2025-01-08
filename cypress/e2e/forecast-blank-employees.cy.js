/// <reference types="cypress" />

import { tests } from "../fixtures/employees.json";

describe("Forecast Employees blank tests", () => {
  before(() => {
     // Clear local storage, cookies, and tokens before starting tests
     cy.clearLocalStorage();
     cy.clearCookies();

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
    // // Assert if you are on Forecast revenues section
    // cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    // // Click on Employees section
    // cy.clickButton('Employees')

    // cy.wait(500);

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
    // // Assert if you are on Forecast revenues section
    // cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    // // Click on Employees section
    // cy.clickButton('Employees')

    // cy.wait(500);

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
});