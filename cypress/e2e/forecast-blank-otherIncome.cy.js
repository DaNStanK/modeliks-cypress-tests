/// <reference types="cypress" />

describe("Forecast Other Incomes blank tests", () => {
  before(() => {
    // Clear local storage, cookies, and tokens before starting tests
    cy.clearLocalStorage();
    cy.clearCookies();

    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

   it(`Should be able to create blank Other Income L1`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on expenses section
      cy.clickButton('Other Income')

      cy.wait(500);

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Other Income');

      // Populate expenses name input field
      cy.setRevenueName('Blank Other Income L1');

       // Select advance settings
       cy.chooseAdvanceSettings();

       // Choose planning level
       cy.choosePlanningLevel('Level 1');

       // Click save button in the advanced settings
       cy.clickButton('Save');

      // Click next button
      cy.clickButton('Next');

      // Click save and close button
      cy.clickButton('Save & Close');
   });

   it(`Should be able to create blank Other Income L2`, () => {
      // // Assert if you are on Forecast revenues section
      // cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
      
      // // Click on expenses section
      // cy.clickButton('Other Income')
      
      // cy.wait(500);
      
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/other_income');
      
      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Other Income');

      // Populate expenses name input field
      cy.setRevenueName('Blank Other Income L2');

       // Select advance settings
       cy.chooseAdvanceSettings();

       // Choose planning level
       cy.choosePlanningLevel('BU');

       // Click save button in the advanced settings
       cy.clickButton('Save');

      // Click next button
      cy.clickButton('Next');

      // Click save and close button
      cy.clickButton('Save & Close');
   });

   it(`Should be able to create blank Other Income L3`, () => {
      // // Assert if you are on Forecast revenues section
      // cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
      
      // // Click on expenses section
      // cy.clickButton('Other Income')
      
      // cy.wait(500);

      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/other_income');

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Other Income');

      // Populate expenses name input field
      cy.setRevenueName('Blank Other Income L1');

       // Select advance settings
       cy.chooseAdvanceSettings();

       // Choose planning level
       cy.choosePlanningLevel('SU');

       // Click save button in the advanced settings
       cy.clickButton('Save');

      // Click next button
      cy.clickButton('Next');

      // Click save and close button
      cy.clickButton('Save & Close');
   });
});