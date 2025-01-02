/// <reference types="cypress" />

describe("Forecast Taxes", () => {
   beforeEach(() => {
     // Login the user
     cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
   });
 
    it.only(`Should be able to create blank Income Tax L1`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on Taxes section
       cy.clickButton('Taxes');
 
       cy.wait(500);
 
       // Click on Add Tax Stream button
       cy.clickButton('Add Tax');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Income Tax L1');

       // Choose the type of tax
       cy.setTaxType('Income Tax')
 
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
 
      // Click save and close button
      cy.clickButton('Save & Close');
    });
 
    it(`Should be able to create blank Income Tax L2`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on Taxes section
       cy.clickButton('Taxes');
 
       cy.wait(500);
 
       // Click on Add Tax Stream button
       cy.clickButton('Add Tax');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Income Tax L2');

       // Choose the type of tax
       cy.setTaxType('Income Tax')
 
      // Select advance settings
      cy.chooseAdvanceSettings();
 
      // Choose planning level
      cy.choosePlanningLevel('BU');
 
      // Click save button in the advanced settings
      // Click save button in the advanced settings
      cy.get('div.MuiDialogActions-root.MuiDialogActions-spacing')
         .eq(1)
         .find('button')
         .contains('Save')
         .closest('button')
         .click({ force: true });
 
      // Click save and close button
      cy.clickButton('Save & Close');
    });
 
    it(`Should be able to create blank Income Tax L3`, () => {
       // Assert if you are on Forecast revenues section
       cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');
 
       // Click on Taxes section
       cy.clickButton('Taxes');
 
       cy.wait(500);
 
       // Click on Add Tax Stream button
       cy.clickButton('Add Tax');
 
       // Populate expenses name input field
       cy.setRevenueName('Blank Income Tax L3');

       // Choose the type of tax
       cy.setTaxType('Income Tax')
 
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
     
    it.only(`Should be able to create blank Sales Tax L1`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Taxes section
      cy.clickButton('Taxes');

      cy.wait(500);

      // Click on Add Tax Stream button
      cy.clickButton('Add Tax');

      // Populate expenses name input field
      cy.setRevenueName('Blank Sales Tax L1');

      // Choose the type of tax
      cy.setTaxType('Sales Tax')

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

     // Click save and close button
     cy.clickButton('Save & Close');
   });
     
    it(`Should be able to create blank Sales Tax L2`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Taxes section
      cy.clickButton('Taxes');

      cy.wait(500);

      // Click on Add Tax Stream button
      cy.clickButton('Add Tax');

      // Populate expenses name input field
      cy.setRevenueName('Blank Sales Tax L2');

      // Choose the type of tax
      cy.setTaxType('Sales Tax')

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
     
    it(`Should be able to create blank Sales Tax L3`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Taxes section
      cy.clickButton('Taxes');

      cy.wait(500);

      // Click on Add Tax Stream button
      cy.clickButton('Add Tax');

      // Populate expenses name input field
      cy.setRevenueName('Blank Sales Tax L3');

      // Choose the type of tax
      cy.setTaxType('Sales Tax')

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
       
   it.only(`Should be able to create blank VAT L1`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Taxes section
      cy.clickButton('Taxes');

      cy.wait(500);

      // Click on Add Tax Stream button
      cy.clickButton('Add Tax');

      // Populate expenses name input field
      cy.setRevenueName('Blank VAT L1');

      // Choose the type of tax
      cy.setTaxType('VAT')

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

     // Click save and close button
     cy.clickButton('Save & Close');
   });
       
   it(`Should be able to create blank VAT L2`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Taxes section
      cy.clickButton('Taxes');

      cy.wait(500);

      // Click on Add Tax Stream button
      cy.clickButton('Add Tax');

      // Populate expenses name input field
      cy.setRevenueName('Blank VAT L2');

      // Choose the type of tax
      cy.setTaxType('VAT')

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
       
   it(`Should be able to create blank VAT L3`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Taxes section
      cy.clickButton('Taxes');

      cy.wait(500);

      // Click on Add Tax Stream button
      cy.clickButton('Add Tax');

      // Populate expenses name input field
      cy.setRevenueName('Blank VAT L3');

      // Choose the type of tax
      cy.setTaxType('VAT')

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