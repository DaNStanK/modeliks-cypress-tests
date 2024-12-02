/// <reference types="cypress" />

import { revenues_type } from "../fixtures/revenues.json";

const {
  product_sales,
  service_revenue,
  twelve_months_subscription_revenue,
  six_month_subscription_revenue,
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

  it('Should create product sales revenues', () => {
    // Create Revenue
    cy.createGeneralRevenueInfo();

    // Set General Revenue Info
    cy.setGeneralRevenueInfo(product_sales);

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create service revenues', () => {
    // Create Revenue
    cy.createGeneralRevenueInfo();

    // Set General Revenue Info
    cy.setGeneralRevenueInfo(service_revenue);

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create 6 month subscription revenues', () => {
    // Create Revenue
    cy.createGeneralRevenueInfo();

    // Set General Revenue Info
    cy.setGeneralRevenueInfo(six_month_subscription_revenue);

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create 12 months subscription revenues', () => {
    // Create Revenue
    cy.createGeneralRevenueInfo();

    // Set General Revenue Info
    cy.setGeneralRevenueInfo(twelve_months_subscription_revenue);

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create revenue only', () => {
    // Create Revenue
    cy.createGeneralRevenueInfo();

    // Set General Revenue Info
    cy.setGeneralRevenueInfo(revenue_only);

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  // it('Should delete revenues', () => {

  // });
});