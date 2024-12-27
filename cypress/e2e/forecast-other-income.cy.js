/// <reference types="cypress" />

describe("Forecast Employees", () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

   it.only(`Should be able to create blank Other Income`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on expenses section
      cy.clickButton('Other Income')

      cy.wait(500);

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Other Income');

      // Populate expenses name input field
      cy.setRevenueName('Blank Other Income');

      // Click next button
      cy.clickButton('Next');

      // Click save and close button
      cy.clickButton('Save & Close');
   });
});