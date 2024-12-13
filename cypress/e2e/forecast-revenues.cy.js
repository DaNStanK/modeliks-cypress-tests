/// <reference types="cypress" />

import { revenues_type } from "../fixtures/revenues.json";
import { company } from '../fixtures/company.json';

const {
  product_sales,
  service_revenue,
  twelve_months_subscription_revenue,
  six_month_subscription_revenue,
  revenue_only
} = revenues_type;

describe('Forecast / Revenues Module', () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));

    cy.intercept('GET', `/api/organizational-structure?CompanyID=${company.number}`).as('oranizationalStructure');
    cy.intercept('GET', `/api/chart_of_accounts?CompanyID=${company.number}`).as('chartOfAccounts');

    // Wait for all fetches to complete
    cy.wait('@oranizationalStructure', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.wait('@chartOfAccounts', { timeout: 100000 })
      .its('response.statusCode')
      .should('eq', 200);
  });

  it.only('Should be able to create product sales revenues', () => {

    // Assert if you are on Forecast revenues section
    cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

    // Click on Add Revenue Stream
    cy.clickButton('Add Revenue Stream');

    // Populate Revenue Name input field
    cy.setRevenueName(product_sales.name);

    // Choose the type of revenue
    cy.chooseRevenueType(product_sales);

    // Assert that the actual checkbox is checked after clicking the custom UI
    cy.assertRevenueType(product_sales.index);

    // Select advance settings
    cy.chooseAdvanceSettings();

    // Choose planning level
    cy.choosePlanningLevel('Level 1');

    // Set the allocation methodology
    cy.setAllocationMethodology('breakdown');

    // Click save button in the advanced settings
    cy.clickButton('Save');

    // Click next button
    cy.clickButton('Next');

    // Set Unit Sales info
    cy.editTableCell(1, 1, product_sales.unit_sales); // rowIndex, cellIndex, value

    // Check if the value is correctly applied
    cy.checkCellValue(1, 1, product_sales.unit_sales); // rowIndex, cellIndex, value

    // Apply to all fields
    cy.applyToAllFields(1, 1); // parameters: [row, month]

    // Set Unit Sales info
    cy.editTableCell(1, 12, product_sales.unit_sales_12); // rowIndex, cellIndex, value

    // Check if the value is correctly applied
    cy.checkCellValue(1, 12, product_sales.unit_sales_12); // rowIndex, cellIndex, value

    // Set Unit Sales info
    cy.editTableCell(1, 24, product_sales.unit_sales_24); // rowIndex, cellIndex, value

    // Check if the value is correctly applied
    cy.checkCellValue(1, 24, product_sales.unit_sales_24); // rowIndex, cellIndex, value

    // Click next button
    cy.clickButton('Next');

    // Set Unit Price info
    cy.editTableCell(1, 1, product_sales.unit_price); // rowIndex, cellIndex, value

    // Apply to all fields
    cy.applyToAllFields(1, 1); // parameters: [row, month]
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