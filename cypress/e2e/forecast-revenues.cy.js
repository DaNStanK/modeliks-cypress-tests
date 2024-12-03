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
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
  });

  it('Should create product sales revenues', () => {
    // Assert if you are on Forecast revenues section
    cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');

    // Click on Add Revenue Stream
    cy.addRevenueStream();

    // Populate Revenue Name input field
    cy.setRevenueName(product_sales.name);

    // Choose the type of revenue
    cy.chooseRevenueType(product_sales);

    // Assert that the actual checkbox is checked after clicking the custom UI
    cy.assertRevenueType(product_sales.value);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create service revenues', () => {
    // Assert if you are on Forecast revenues section
    cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');

    // Click on Add Revenue Stream
    cy.addRevenueStream();

    // Populate Revenue Name input field
    cy.setRevenueName(service_revenue.name);

    // Choose the type of revenue
    cy.chooseRevenueType(service_revenue);

    // Assert that the actual checkbox is checked after clicking the custom UI
    cy.assertRevenueType(service_revenue.value);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create 6 month subscription revenues', () => {
    // Assert if you are on Forecast revenues section
    cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');

    // Click on Add Revenue Stream
    cy.addRevenueStream();

    // Populate Revenue Name input field
    cy.setRevenueName(six_month_subscription_revenue.name);

    // Choose the type of revenue
    cy.chooseRevenueType(six_month_subscription_revenue);

    // Assert that the actual checkbox is checked after clicking the custom UI
    cy.assertRevenueType(six_month_subscription_revenue.value);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create 12 months subscription revenues', () => {
    // Assert if you are on Forecast revenues section
    cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');

    // Click on Add Revenue Stream
    cy.addRevenueStream();

    // Populate Revenue Name input field
    cy.setRevenueName(twelve_months_subscription_revenue.name);

    // Choose the type of revenue
    cy.chooseRevenueType(twelve_months_subscription_revenue);

    // Assert that the actual checkbox is checked after clicking the custom UI
    cy.assertRevenueType(twelve_months_subscription_revenue.value);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Sales info
    cy.setUnitSalesInfo();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  it('Should create revenue only', () => {
    // Assert if you are on Forecast revenues section
    cy.url()
      .should('eq', 'https://test.hz.modeliks.com/forecast/revenue');

    // Click on Add Revenue Stream
    cy.addRevenueStream();

    // Populate Revenue Name input field
    cy.setRevenueName(revenue_only.name);

    // Choose the type of revenue
    cy.chooseRevenueType(revenue_only);

    // Assert that the actual checkbox is checked after clicking the custom UI
    cy.assertRevenueType(revenue_only.value);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Price info
    cy.setUnitPriceInfo();
  });

  // it('Should delete revenues', () => {

  // });
});