/// <reference types="cypress" />

import { revenue_names } from '../fixtures/example.json';

describe('Forecast / Revenues Module', () => {
  beforeEach(() => {
    // Login the user
    cy.login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );
  });

  it('Should create revenues', () => {
    // Create Revenue
    cy.createGeneralRevenueInfo();

    // Set General Revenue Info
    cy.setGeneralRevenueInfo(revenue_names.name1, 0);

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should delete revenues', () => {

  });
});