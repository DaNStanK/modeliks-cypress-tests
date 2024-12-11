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

  it.only('Should be able to create product sales revenues', () => {
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
    cy.assertRevenueType(product_sales.index);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Set the allocation methodology
    cy.setAllocationMethodology('do not allocate');


    // // Click next button
    // cy.get('button > span')
    //   .contains('Next')
    //   .click();

    // // Set Unit Sales info
    // cy.setUnitSalesInfo(product_sales);

    // // Set Unit Price info
    // cy.setUnitPriceInfo(product_sales);
  });

  it('Should be able to create service revenues', () => {
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
    cy.assertRevenueType(service_revenue.index);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set billable hours
    cy.setBillableHours(service_revenue);

    // Set hourly rate
    cy.setHourlyRateInfo(service_revenue);
  });

  // Don't do this tests atm 04 Dec 2024 as the frontend is not finished
  it('Should be able to create 6 month subscription revenues', () => {
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
    cy.assertRevenueType(six_month_subscription_revenue.index);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Sales info
    cy.setUnitSalesInfo(six_month_subscription_revenue);

    // Set Unit Price info
    cy.setUnitPriceInfo(six_month_subscription_revenue);
  });

  // Don't do this tests atm 04 Dec 2024 as the frontend is not finished
  it('Should be able to create 12 months subscription revenues', () => {
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
    cy.assertRevenueType(twelve_months_subscription_revenue.index);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Sales info
    cy.setUnitSalesInfo(twelve_months_subscription_revenue);

    // Set Unit Price info
    cy.setUnitPriceInfo(twelve_months_subscription_revenue);
  });

  it('Should be able to create revenue only', () => {
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
    cy.assertRevenueType(revenue_only.index);

    // Click next button
    cy.get('button > span')
      .contains('Next')
      .click();

    // Set Unit Price info
    cy.setUnitPriceInfo(revenue_only);
  });

  // it('Should delete revenues', () => {

  // });
});