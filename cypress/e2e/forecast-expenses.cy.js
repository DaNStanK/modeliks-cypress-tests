/// <reference types="cypress" />

import { tests } from "../fixtures/employees.json";

describe("Forecast Employees", () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

   it.only(`Should be able to create blank Expenses`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on expenses section
      cy.clickButton('Expenses')

      cy.wait(500);

      // Click on Add Other Expenses Stream button
      cy.clickButton('Add Expense');

      // Populate expenses name input field
      cy.setRevenueName('Blank Expenses');

      // Click next button
      cy.clickButton('Next');

      // Click save and close button
      cy.clickButton('Save & Close');
   });
});