/// <reference types="cypress" />

describe('Forecast COGS blank tests', () => {
   before(() => {
      // Clear local storage, cookies, and tokens before starting tests
      cy.clearLocalStorage();
      cy.clearCookies();

      // Login the user
      cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
   });

   it.only('Should be able to create blank COGS L1', () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

       cy.wait(500);

       // Click on COGS section
       cy.clickButton('Cost of Goods Sold');

       // Assert if you are on Forecast COGS section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/costofsales');

       // Click on the add button
       cy.clickButton('Add Cost of Goods Sold');

       // Populate COGS Name input field
       cy.setCostOfGoodsName('Blanks COSG L1');

       // Select advance settings
       cy.chooseAdvanceSettings();

       // Choose planning level
       cy.choosePlanningLevel('Level 1');

       // Click save button in the advanced settings
       cy.clickButton('Save');

       // Click next button and continue to unit sales info section
       cy.clickButton('Next');

      // Click the save and close button
      cy.clickButton('Save & Close');
   });

   it.only('Should be able to create blank COGS L2', () => {
      //  // Assert if you are on Forecast revenues section
      //  cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenues');

      //  cy.wait(500);

       // Click on COGS section
       cy.clickButton('Cost of Goods Sold');

       // Assert if you are on Forecast COGS section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/costofsales');

       // Click on the add button
       cy.clickButton('Add Cost of Goods Sold');

       // Populate COGS Name input field
       cy.setCostOfGoodsName('Blanks COSG L2');

       // Select advance settings
       cy.chooseAdvanceSettings();

       // Choose planning level
       cy.choosePlanningLevel('BU');

       // Click save button in the advanced settings
       cy.clickButton('Save');

       // Click next button and continue to unit sales info section
       cy.clickButton('Next');

      // Click the save and close button
      cy.clickButton('Save & Close');
   });

   it.only('Should be able to create blank COGS L3', () => {
      //  // Assert if you are on Forecast revenues section
      //  cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenues');

      //  cy.wait(500);

       // Click on COGS section
       cy.clickButton('Cost of Goods Sold');

       // Assert if you are on Forecast COGS section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/costofsales');

       // Click on the add button
       cy.clickButton('Add Cost of Goods Sold');

       // Populate COGS Name input field
       cy.setCostOfGoodsName('Blanks COSG L3');

       // Select advance settings
       cy.chooseAdvanceSettings();

       // Choose planning level
       cy.choosePlanningLevel('SU');

       // Click save button in the advanced settings
       cy.clickButton('Save');

       // Click next button and continue to unit sales info section
       cy.clickButton('Next');

      // Click the save and close button
      cy.clickButton('Save & Close');
   });
});