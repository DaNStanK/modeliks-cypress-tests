/// <reference types="cypress" />

describe("Forecast Assets", () => {
   beforeEach(() => {
     // Login the user
     cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
   });
 
    it.only(`Should be able to create blank Assets L1`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Assets')
 
       cy.wait(500);
 
       // Click on Add Asset Stream button
       cy.clickButton('Add Asset');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Assets L1');
 
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
 
    it.only(`Should be able to create blank Assets L2`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Assets')
 
       cy.wait(500);
 
       // Click on Add Asset Stream button
       cy.clickButton('Add Asset');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Assets L2');
 
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
 
    it.only(`Should be able to create blank Assets L3`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Assets')
 
       cy.wait(500);
 
       // Click on Add Asset Stream button
       cy.clickButton('Add Asset');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Assets L1');
 
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