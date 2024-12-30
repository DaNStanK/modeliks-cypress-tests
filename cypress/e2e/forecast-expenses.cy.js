/// <reference types="cypress" />

describe("Forecast Employees", () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

   it.only(`Should be able to create blank Expenses L1`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on expenses section
      cy.clickButton('Expenses')

      cy.wait(500);

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Expense');

      // Populate expenses name input field
      cy.setRevenueName('Blank Expenses L1');
      
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

   it(`Should be able to create blank Expenses L2`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on expenses section
      cy.clickButton('Expenses')

      cy.wait(500);

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Expense');

      // Populate expenses name input field
      cy.setRevenueName('Blank Expenses L2');
      
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

   it(`Should be able to create blank Expenses L3`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on expenses section
      cy.clickButton('Expenses')

      cy.wait(500);

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Expense');

      // Populate expenses name input field
      cy.setRevenueName('Blank Expenses L3');
      
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