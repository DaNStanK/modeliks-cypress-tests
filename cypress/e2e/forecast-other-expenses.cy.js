/// <reference types="cypress" />

describe("Forecast Employees", () => {
   beforeEach(() => {
     // Login the user
     cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
   });
 
    it(`Should be able to create blank Other Expenses L1`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Other Expenses')
 
       cy.wait(500);
 
       // Click on Add Other Expenses Stream Stream button
       cy.clickButton('Add Other Expenses Stream');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Other Expenses L1');
 
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
 
    it(`Should be able to create blank Other Expenses L2`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Other Expenses')
 
       cy.wait(500);
 
       // Click on Add Other Expenses Stream Stream button
       cy.clickButton('Add Other Expenses Stream');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Other Expenses L2');
 
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
 
    it(`Should be able to create blank Other Expenses L3`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Other Expenses')
 
       cy.wait(500);
 
       // Click on Add Other Expenses Stream Stream button
       cy.clickButton('Add Other Expenses Stream');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Other Expenses L1');
 
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