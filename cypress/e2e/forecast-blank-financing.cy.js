/// <reference types="cypress" />

describe("Forecast Financing blank tests", () => {
   before(() => {
      // Clear local storage, cookies, and tokens before starting tests
      cy.clearLocalStorage();
      cy.clearCookies();

      // Login the user
      cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
   });
 
    it(`Should be able to create blank Financing L1`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on expenses section
       cy.clickButton('Financing')
 
       cy.wait(500);
 
       // Click on Add Financing Stream button
       cy.clickButton('Add Financing');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Financing L1');

       // Set interest rate
       cy.setInterestRate(10)
 
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
 
    it(`Should be able to create blank Financing L2`, () => {
      //  // Assert if you are on Forecast revenues section
      //  cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
       
      //  // Click on expenses section
      //  cy.clickButton('Financing')
       
      //  cy.wait(500);
       
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/financing');
 
       // Click on Add Financing Stream button
       cy.clickButton('Add Financing');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Financing L2');

       // Set interest rate
       cy.setInterestRate(10)
 
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
 
    it(`Should be able to create blank Financing L3`, () => {
      //  // Assert if you are on Forecast revenues section
      //  cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
       
      //  // Click on expenses section
      //  cy.clickButton('Financing')
       
      //  cy.wait(500);
       
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/financing');
 
       // Click on Add Financing Stream button
       cy.clickButton('Add Financing');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Financing L1');
 
        // Select advance settings
        cy.chooseAdvanceSettings();
 
        // Choose planning level
        cy.choosePlanningLevel('SU');
 
        // Click save button in the advanced settings
        cy.clickButton('Save');

        cy.setInterestRate(10)
                
       // Click next button
       cy.clickButton('Next');
 
       // Click next button
       cy.clickButton('Next');
 
       // Click next button
       cy.clickButton('Next');
 
       // Click save and close button
       cy.clickButton('Save & Close');
    });
 });