/// <reference types="cypress" />

describe("Forecast Assets blank tests", () => {
   before(() => {
      // Clear local storage, cookies, and tokens before starting tests
     cy.clearLocalStorage();
     cy.clearCookies();

     // Login the user
     cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
   });
 
    it(`Should be able to create blank Assets L1`, () => {
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
        cy.get('div.MuiDialogActions-root.MuiDialogActions-spacing')
         .eq(1)
         .find('button')
         .contains('Save')
         .click();
 
       // Click next button
       cy.clickButton('Save');
    });
 
    it(`Should be able to create blank Assets L2`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/assets');
 
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
        cy.get('div.MuiDialogActions-root.MuiDialogActions-spacing')
         .eq(1)
         .find('button')
         .contains('Save')
         .click();
 
       // Click next button
       cy.clickButton('Next');
 
       // Click save and close button
       cy.clickButton('Save & Close');
    });
 
    it(`Should be able to create blank Assets L3`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/assets');
 
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
        cy.get('div.MuiDialogActions-root.MuiDialogActions-spacing')
         .eq(1)
         .find('button')
         .contains('Save')
         .click();
 
       // Click next button
       cy.clickButton('Next');
 
       // Click save and close button
       cy.clickButton('Save & Close');
    });
 });