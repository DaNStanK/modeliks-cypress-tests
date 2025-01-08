/// <reference types="cypress" />

describe('Forecast Revenues blank tests', () => {
  before(() => {
    // Clear local storage, cookies, and tokens before starting tests
    cy.clearLocalStorage();
    cy.clearCookies();

    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

  it.only(`Should be able to create blank Product Sales Revenue L1`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Product Sales Revenue L1');

    // Choose the type of revenue
    cy.chooseRevenueType(0);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('Level 1');

    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });

  it.only(`Should be able to create blank Product Sales Revenue L2`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Product Sales Revenue L2');

    // Choose the type of revenue
    cy.chooseRevenueType(0);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('BU');

    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });

  it.only(`Should be able to create blank Product Sales Revenue L3`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Product Sales Revenue L3');

    // Choose the type of revenue
    cy.chooseRevenueType(0);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('SU');

    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });
  
  it.only(`Should be able to create blank Service Revenue L1`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Service Revenue L1');

    // Choose the type of revenue
    cy.chooseRevenueType(1);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('Level 1');
    
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });
  
  it.only(`Should be able to create blank Service Revenue L2`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Service Revenue L2');

    // Choose the type of revenue
    cy.chooseRevenueType(1);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('BU');
    
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });
  
  it.only(`Should be able to create blank Service Revenue L3`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Service Revenue L3');

    // Choose the type of revenue
    cy.chooseRevenueType(1);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('SU');
    
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });
  
  it(`Should be able to create blank Subscription Revenue L1`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Subscription Revenue L1');

    // Choose the type of revenue
    cy.chooseRevenueType(2);

    // Enter subscription plan name
    cy.get('input[placeholder="!!Enter name for your subscription plan"]').type('Subscription plan test name');

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('Level 1');
        
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to signups section
    cy.clickButton('Next');

    // Click next button and continue to chun rate section
    cy.clickButton('Next');

    // Click next button and continue to refund section
    cy.clickButton('Next');

    // Click next button and continue to subscription price section
    cy.clickButton('Next');

    // Click save and close button
    cy.clickButton('Save & Close');
  });
  
  it(`Should be able to create blank Subscription Revenue L2`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Subscription Revenue L2');

    // Choose the type of revenue
    cy.chooseRevenueType(2);

    // Enter subscription plan name
    cy.get('input[placeholder="!!Enter name for your subscription plan"]').type('Subscription plan test name');

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('BU');
        
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to signups section
    cy.clickButton('Next');

    // Click next button and continue to chun rate section
    cy.clickButton('Next');

    // Click next button and continue to refund section
    cy.clickButton('Next');

    // Click next button and continue to subscription price section
    cy.clickButton('Next');

    // Click save and close button
    cy.clickButton('Save & Close');
  });
  
  it(`Should be able to create blank Subscription Revenue L3`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Subscription Revenue L3');

    // Choose the type of revenue
    cy.chooseRevenueType(2);

    // Enter subscription plan name
    cy.get('input[placeholder="!!Enter name for your subscription plan"]').type('Subscription plan test name');

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('SU');
        
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to signups section
    cy.clickButton('Next');

    // Click next button and continue to chun rate section
    cy.clickButton('Next');

    // Click next button and continue to refund section
    cy.clickButton('Next');

    // Click next button and continue to subscription price section
    cy.clickButton('Next');

    // Click save and close button
    cy.clickButton('Save & Close');
  });
  
  it.only(`Should be able to create blank Revenue only L1`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Revenue Only L1');

    // Choose the type of revenue
    cy.chooseRevenueType(3);
    
    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('Level 1');
        
    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });

  it.only(`Should be able to create blank Revenue only L2`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Revenue Only L2');

    // Choose the type of revenue
    cy.chooseRevenueType(3);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('BU');

    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });

  it.only(`Should be able to create blank Revenue only L3`, () => {
    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    cy.wait(500);

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName('Blank Revenue Only L3');

    // Choose the type of revenue
    cy.chooseRevenueType(3);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Select level
    cy.choosePlanningLevel('SU');

    // Click save button
    cy.clickButton('Save');

    // Click next button and continue to unit sales info section
    cy.clickButton('Next');

    // Click save and close button and continue to unit sales info section
    cy.clickButton('Save & Close');
  });
});