/// <reference types="cypress" />

import { revenues_type } from "../fixtures/revenues.json";

const {
  product_sales,
  service_revenue,
  subscritpion_revenue,
  revenue_only
} = revenues_type;

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
    cy.setGeneralRevenueInfo(product_sales.name, product_sales.value);

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should delete revenues', () => {

  });
});