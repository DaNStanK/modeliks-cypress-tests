/// <reference types="cypress" />

import revenues from "../fixtures/revenues.json";
import { company } from '../fixtures/company.json';

const {
  product_sales,
  service_revenue,
  twelve_months_subscription_revenue,
  six_month_subscription_revenue,
  revenue_only
} = revenues.revenues_type;

describe('Forecast / Revenues Module', () => {
  beforeEach(() => {
    // Login the user
    cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));

    // cy.intercept('GET', `/api/organizational-structure?CompanyID=${company.number}`).as('oranizationalStructure');
    // cy.intercept('GET', `/api/chart_of_accounts?CompanyID=${company.number}`).as('chartOfAccounts');

    // // Wait for all fetches to complete
    // cy.wait('@oranizationalStructure', { timeout: 100000 })
    //   .its('response.statusCode')
    //   .should('eq', 200);

    // cy.wait('@chartOfAccounts', { timeout: 100000 })
    //   .its('response.statusCode')
    //   .should('eq', 200);
  });

  // All Revenue Only tests;
  revenue_only.forEach(product => {
    // Check if the product sales data is missing
    if (!product) {
      console.log('Product sales data is missing');
      throw new Error('Product sales data is missing');
    }

    // Test per Revenue Only
    it(`Should be able to create revenue only: ${product.type_name}`, () => {
      cy.wait(1000);

      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Add Revenue Stream
      cy.clickButton('Add Revenue Stream');

      // Populate Revenue Name input field
      cy.setRevenueName(product.type_name);

      // Choose the type of revenue
      cy.chooseRevenueType(product);

      // Assert that the actual checkbox is checked after clicking the custom UI
      cy.assertRevenueType(product.index);

      // Select advance settings
      cy.chooseAdvanceSettings();

      // Choose planning level
      cy.choosePlanningLevel(product.level);

      // Set the allocation methodology
      cy.setAllocationMethodology(product.methodology);

      // Click save button in the advanced settings
      cy.clickButton('Save');

      // Click next button and continue to unit sales info section
      cy.clickButton('Next');


      //  *************************************************  \\
      //                    REVENUE SETUP                    \\
      //  *************************************************  \\


      // Set Unit Sales info for the 1st month
      cy.editTableCell(1, 1, product.unit1_revenue_lvl2); // row, month, value

      // Check if the value for the 1st month is correctly applied
      cy.checkCellValue(1, 1, product.unit1_revenue_lvl2); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(1, 1); // row, month

      // Set Unit Sales info for the 12th month
      cy.editTableCell(2, 1, product.unit2_revenue_lvl2); // row, month, value

      // Check if the value is correctly applied on 12th month
      cy.checkCellValue(2, 1, product.unit2_revenue_lvl2); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(2, 1); // row, month

      // Click next button and continue to unit prices setup
      cy.clickButton('Next');


      //  *************************************************  \\
      //    ALLOCATION SETUP FOR SUBUNIT 1 AND 2 OF UNIT 1   \\
      //  *************************************************  \\


      // Click the set button for the subunits of business unit 1 from the org. structure
      cy.setTotals(company.organizationalStructure.levelTwo_unitOne.name);

      // Set subunit 1 of business unit 1 allocation for 1st month
      cy.editAllocationTableCell(1, 1, product.unit1_subunit1_revenue_lvl2); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(1, 1, product.unit1_subunit1_revenue_lvl2); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(1, 1); // row, month

      // Set subunit 1 of business unit 1 allocation for 12th month
      cy.editAllocationTableCell(2, 1, product.unit1_subunit2_revenue_lvl2); // row, month, value

      // Check if the value was set for the 12th month
      cy.checkAllocationCellValue(2, 1, product.unit1_subunit2_revenue_lvl2); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(2, 1); // row, month

      //  *************************************************  \\
      //    ALLOCATION SETUP FOR SUBUNIT 1 AND 2 OF UNIT 2   \\
      //  *************************************************  \\

      // Click the set button for the subunits of business unit 1 from the org. structure
      cy.setTotals(company.organizationalStructure.levelTwo_unitTwo.name);

      // Set subunit 1 of business unit 1 allocation for 1st month
      cy.editAllocationTableCell(1, 1, product.unit2_subunit1_revenue_lvl2); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(1, 1, product.unit2_subunit1_revenue_lvl2); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(1, 1); // row, month

      // Set subunit 1 of business unit 1 allocation for 12th month
      cy.editAllocationTableCell(2, 1, product.unit2_subunit2_revenue_lvl2); // row, month, value

      // Check if the value was set for the 12th month
      cy.checkAllocationCellValue(2, 1, product.unit2_subunit2_revenue_lvl2); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(2, 1); // row, month

      // Click the set button for the subunits of business unit 1 from the org. structure
      cy.setTotals(company.organizationalStructure.levelTwo_unitOne.name);


      //  *************************************************  \\
      //               TOTALS RESULT ASSERTION               \\
      //  *************************************************  \\


      // Assert company revenue 12 month value
      cy.checkTotalCellValue(1, 12, product.company_12); // row, month, value

      // Assert company revenue 1 year value
      cy.checkTotalCellValue(1, 13, product.company_Y1); // row, month, value

      // Assert company revenue 24 month value
      cy.checkTotalCellValue(1, 24, product.company_Y2); // row, month, value

      // Assert company level 2 unit 1 revenue 12 month value
      cy.checkTotalCellValue(2, 12, product.bu1_12); // row, month, value

      // Assert company level 2 unit 1 revenue 1 year value
      cy.checkTotalCellValue(2, 13, product.bu1_Y1); // row, month, value

      // Assert company level 2 unit 1 revenue 24 month value
      cy.checkTotalCellValue(2, 24, product.bu1_Y2); // row, month, value

      // Assert company level 2 unit 2 revenue 12 month value
      cy.checkTotalCellValue(6, 12, product.bu2_subunit1_12); // row, month, value

      // Assert company level 2 unit 2 revenue 1 year value
      cy.checkTotalCellValue(6, 13, product.bu2_subunit1_Y1); // row, month, value

      // Assert company level 2 unit 2 revenue 24 month value
      cy.checkTotalCellValue(6, 24, product.bu2_subunit1_Y2); // row, month, value

      // Click the save and close button
      cy.clickButton('Save & Close');

      // Intercept post revenue fetch
      cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');

      // Assert if the revenue was successfully deleted
      cy.wait('@chartOfAccounts', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 200);
    });
  });

  // All Product Revenue tests;
  product_sales.forEach(product => {
    // Check if the product sales data is missing
    if (!product) {
      console.log('Product sales data is missing');
      throw new Error('Product sales data is missing');
    }

    // Test per Product Revenue
    it(`Should be able to create product sales revenue: ${product.type_name}`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Add Revenue Stream
      cy.clickButton('Add Revenue Stream');

      // Populate Revenue Name input field
      cy.setRevenueName(product.type_name);

      // Choose the type of revenue
      cy.chooseRevenueType(product);

      // Assert that the actual checkbox is checked after clicking the custom UI
      cy.assertRevenueType(product.index);

      // Select advance settings
      cy.chooseAdvanceSettings();

      // Choose planning level
      cy.choosePlanningLevel('Level 1');

      // Set the allocation methodology
      cy.setAllocationMethodology('breakdown');

      // Click save button in the advanced settings
      cy.clickButton('Save');

      // Click next button and continue to unit sales info section
      cy.clickButton('Next');


      //  *************************************************  \\
      //                 UNIT SALES SETUP                    \\
      //  *************************************************  \\


      // Set Unit Sales info for the 1st month
      cy.editTableCell(1, 1, product.unit_sales); // row, month, value

      // Check if the value for the 1st month is correctly applied
      cy.checkCellValue(1, 1, product.unit_sales); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(1, 1); // row, month

      // Set Unit Sales info for the 12th month
      cy.editTableCell(1, 12, product.unit_sales_12); // row, month, value

      // Check if the value is correctly applied on 12th month
      cy.checkCellValue(1, 12, product.unit_sales_12); // row, month, value

      // Set Unit Sales info for 24th month
      cy.editTableCell(1, 24, product.unit_sales_24); // row, month, value

      // Check if the value is correctly applied for 24th month
      cy.checkCellValue(1, 24, product.unit_sales_24); // row, month, value

      // Click next button and continue to unit prices setup
      cy.clickButton('Next');


      //  *************************************************  \\
      //                 UNIT PRICE SETUP                    \\
      //  *************************************************  \\


      // Set Unit Price info for the first month
      cy.editTableCell(1, 1, product.unit_price); // row, month, value

      // Check if the value of the unit price for the first month is correctly applied
      cy.checkCellValue(1, 1, product.unit_price); // row, month, value

      // Apply the unit price for all months
      cy.applyToAllFields(1, 1); // parameters: [row, month]

      // Set Unit Price info for the 12th month
      cy.editTableCell(1, 12, product.unit_price_12); // row, month, value

      // Check if the value of the unit price for the 12th month is correctly applied
      cy.checkCellValue(1, 12, product.unit_price_12); // row, month, value

      // Click next button and continue to allocation
      cy.clickButton('Next');


      //  *************************************************  \\
      //  ALLOCATION SETUP FOR BUSINESS UNIT 1 OF MAIN UNIT  \\
      //  *************************************************  \\


      // Click the set button for the business units of the main unit from the org. structure
      cy.setTotals(company.organizationalStructure.levelOne.name);

      // Set business unit allocation for 1st month
      cy.editAllocationTableCell(1, 1, product.bu1_allocation); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(1, 1, product.bu1_allocation); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(1, 1); // row, month

      // Set business unit allocation for 12th month
      cy.editAllocationTableCell(1, 12, product.bu1_allocation_12); // row, month, value

      // Check if the value was set for the 12th month
      cy.checkAllocationCellValue(1, 12, product.bu1_allocation_12); // row, month, value

      // Set business unit allocation for 24th month
      cy.editAllocationTableCell(1, 24, product.bu1_allocation_24); // row, month, value

      // Check if the value was set for the 24th month
      cy.checkAllocationCellValue(1, 24, product.bu1_allocation_24); // row, month, value


      //  *************************************************  \\
      //  ALLOCATION SETUP FOR BUSINESS UNIT 2 OF MAIN UNIT  \\
      //  *************************************************  \\


      // Set business unit allocation for 1st month
      cy.editAllocationTableCell(2, 1, product.bu2_allocation); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(2, 1, product.bu2_allocation); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(2, 1); // row, month

      // Set business unit allocation for 12th month
      cy.editAllocationTableCell(2, 12, product.bu2_allocation_12); // row, month, value

      // Check if the value was set for the 12th month
      cy.checkAllocationCellValue(2, 12, product.bu2_allocation_12); // row, month, value

      // Set business unit allocation for 24th month
      cy.editAllocationTableCell(2, 24, product.bu2_allocation_24); // row, month, value

      // Check if the value was set for the 24th month
      cy.checkAllocationCellValue(2, 24, product.bu2_allocation_24); // row, month, value


      //  *************************************************  \\
      //  ALLOCATION SETUP FOR SUBUNIT 1 OF BUSINESS UNIT 1  \\
      //  *************************************************  \\


      // Click the set button for the subunits of business unit 1 from the org. structure
      cy.setTotals(company.organizationalStructure.levelTwo_unitOne.name);

      // Set subunit 1 of business unit 1 allocation for 1st month
      cy.editAllocationTableCell(1, 1, product.bu1_subunit1); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(1, 1, product.bu1_subunit1); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(1, 1); // row, month

      // Set subunit 1 of business unit 1 allocation for 12th month
      cy.editAllocationTableCell(1, 12, product.bu1_subunit1_12); // row, month, value

      // Check if the value was set for the 12th month
      cy.checkAllocationCellValue(1, 12, product.bu1_subunit1_12); // row, month, value

      // Set subunit 1 of business unit 1 allocation for 24th month
      cy.editAllocationTableCell(1, 24, product.bu1_subunit1_24); // row, month, value

      // Check if the value was set for the 24th month
      cy.checkAllocationCellValue(1, 24, product.bu1_subunit1_24); // row, month, value


      //  *************************************************  \\
      //  ALLOCATION SETUP FOR SUBUNIT 2 OF BUSINESS UNIT 1  \\
      //  *************************************************  \\


      // Set subunit 1 of business unit 1 allocation for 1st month
      cy.editAllocationTableCell(2, 1, product.bu1_subunit2); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(2, 1, product.bu1_subunit2); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(2, 1); // row, month

      // Set subunit 1 of business unit 1 allocation for 12th month
      cy.editAllocationTableCell(2, 12, product.bu1_subunit2_12); // row, month, value

      // Check if the value was set for the 12th month
      cy.checkAllocationCellValue(2, 12, product.bu1_subunit2_12); // row, month, value

      // Set subunit 1 of business unit 1 allocation for 24th month
      cy.editAllocationTableCell(2, 24, product.bu1_subunit2_24); // row, month, value

      // Check if the value was set for the 24th month
      cy.checkAllocationCellValue(2, 24, product.bu1_subunit2_24); // row, month, value


      //  *************************************************  \\
      //  ALLOCATION SETUP FOR SUBUNIT 1 OF BUSINESS UNIT 2  \\
      //  *************************************************  \\


      // Click the set button for the subunits of business unit 2 from the org. structure
      cy.setTotals(company.organizationalStructure.levelTwo_unitTwo.name);

      // Set subunit 1 of business unit 2 allocation for 1st month
      cy.editAllocationTableCell(1, 1, product.bu2_subunit1); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(1, 1, product.bu2_subunit1); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(1, 1); // row, month


      //  *************************************************  \\
      //  ALLOCATION SETUP FOR SUBUNIT 2 OF BUSINESS UNIT 2  \\
      //  *************************************************  \\


      // // Click the set button for the subunits of business unit 2 from the org. structure
      // cy.setTotals(company.organizationalStructure.levelThree.name);

      // Set subunit 1 of business unit 2 allocation for 1st month
      cy.editAllocationTableCell(2, 1, product.bu2_subunit2); // row, month, value

      // Check if the value was set for the 1st month
      cy.checkAllocationCellValue(2, 1, product.bu2_subunit2); // row, month, value

      // Apply to all remaining months
      cy.applyToAllFieldsAllocation(2, 1); // row, month

      // Click the set button for the subunits of business unit 2 from the org. structure
      cy.setTotals(company.organizationalStructure.levelOne.name);


      //  *************************************************  \\
      //               TOTALS RESULT ASSERTION               \\
      //  *************************************************  \\


      // Assert total unit sales 12 month value
      cy.checkTotalCellValue(1, 12, product.company_12); // row, month, value

      // Assert total unit sales year 1 value
      cy.checkTotalCellValue(1, 13, product.company_Y1); // row, month, value

      // Assert total unit sales year 2 value
      cy.checkTotalCellValue(1, 24, product.company_Y2); // row, month, value

      // Assert total business unit 1 12 month value
      cy.checkTotalCellValue(2, 12, product.bu1_12); // row, month, value

      // Assert business unit 1 sales year 1 value
      cy.checkTotalCellValue(2, 13, product.bu1_Y1); // row, month, value

      // Assert business unit 1 sales year 2 value
      cy.checkTotalCellValue(2, 24, product.bu1_Y2); // row, month, value

      // Assert total business unit 2 subunit 1 12 month value
      cy.checkTotalCellValue(6, 12, product.bu2_subunit1_12); // row, month, value

      // Assert business unit 2 subunit 1 sales year 1 value
      cy.checkTotalCellValue(6, 13, product.bu2_subunit1_Y1); // row, month, value

      // Assert business unit 2 subunit 1 sales year 2 value
      cy.checkTotalCellValue(6, 24, product.bu2_subunit1_Y2); // row, month, value

      // Click the save and close button
      cy.clickButton('Save & Close');

      // // Intercept post revenue fetch
      // cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');

      // // Assert if the revenue was successfully deleted
      // cy.wait('@chartOfAccounts', { timeout: 10000 })
      //   .its('response.statusCode')
      //   .should('eq', 200);


      //  *************************************************  \\
      //                   DELETE REVENUE                    \\
      //  *************************************************  \\


      // // Delete revenue
      // cy.chooseRevenueOption('Delete'); // Choose delete option

      // // Click the confirm button on delete option
      // cy.clickButton('Confirm');
    });
  });

  // All Service Revenue tests;
  service_revenue.forEach(product => {
    // Check if the product sales data is missing
    if (!product) {
      console.log('Product sales data is missing');
      throw new Error('Product sales data is missing');
    }

    // Test per Service Revenue
    it(`Should be able to create service revenue: ${product.type_name}`, () => {
      // Assert if you are on Forecast revenues section
      cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

      // Click on Add Revenue Stream
      cy.clickButton('Add Revenue Stream');

      // Populate Revenue Name input field
      cy.setRevenueName(product.type_name);

      // Choose the type of revenue
      cy.chooseRevenueType(product);

      // Assert that the actual checkbox is checked after clicking the custom UI
      cy.assertRevenueType(product.index);

      // Select advance settings
      cy.chooseAdvanceSettings();

      // Choose planning level
      cy.choosePlanningLevel(product.level);

      // Click save button in the advanced settings
      cy.clickButton('Save');

      // Click next button and continue to unit sales info section
      cy.clickButton('Next');


      //  *************************************************  \\
      //          BUSINESS UNIT 1 BILLABLE HOURS             \\
      //  *************************************************  \\


      // Set billable hours for subunit 1 of business unit 1 for the 1st month
      cy.editTableCell(2, 1, product.bh_bu1_subunit1); // row, month, value

      // Check billable hours for subunit 1 of business unit 1 for the 1st month
      cy.checkCellValue(2, 1, product.bh_bu1_subunit1); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(2, 1); // row, month

      // Set billable hours for subunit 1 of business unit 1 for the 12th month
      cy.editTableCell(2, 12, product.bh_bu1_subunit1_12); // row, month, value

      // Set billable hours for subunit 1 of business unit 1 for the 12th month
      cy.checkCellValue(2, 12, product.bh_bu1_subunit1_12); // row, month, value

      // Set billable hours for subunit 1 of business unit 1 for the 24th month
      cy.editTableCell(2, 24, product.bh_bu1_subunit1_24); // row, month, value

      // Set billable hours for subunit 1 of business unit 1 for the 24th month
      cy.checkCellValue(2, 24, product.bh_bu1_subunit1_24); // row, month, value

      // Set billable hours for subunit 2 of business unit 1 for the 1st month
      cy.editTableCell(3, 1, product.bh_bu1_subunit2); // row, month, value

      // Check billable hours for subunit 2 of business unit 1 for the 1st month
      cy.checkCellValue(3, 1, product.bh_bu1_subunit2); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(3, 1); // row, month


      //  *************************************************  \\
      //          BUSINESS UNIT 2 BILLABLE HOURS             \\
      //  *************************************************  \\



      // Set billable hours for subunit 1 of business unit 2 for the 1st month
      cy.editTableCell(5, 1, product.bh_bu2_subunit1); // row, month, value

      // Check billable hours for subunit 1 of business unit 2 for the 1st month
      cy.checkCellValue(5, 1, product.bh_bu2_subunit1); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(5, 1); // row, month

      // Set billable hours for subunit 2 of business unit 2 for the 1st month
      cy.editTableCell(6, 1, product.bh_bu2_subunit2); // row, month, value

      // Check billable hours for subunit 2 of business unit 2 for the 1st month
      cy.checkCellValue(6, 1, product.bh_bu2_subunit2); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(6, 1); // row, month

      // Click next button and continue to unit prices setup
      cy.clickButton('Next');


      //  *************************************************  \\
      //            BUSINESS UNIT 1 HOURLY RATE              \\
      //  *************************************************  \\


      // Set hourly rate for subunit 1 of business unit 1 for the 1st month
      cy.editTableCell(2, 1, product.hr_bu1_subunit1); // row, month, value

      // Check hourly rate for subunit 1 of business unit 1 for the 1st month
      cy.checkCellValue(2, 1, product.hr_bu1_subunit1); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(2, 1); // row, month

      // Set hourly rate for subunit 1 of business unit 1 for the 12th month
      cy.editTableCell(2, 12, product.hr_bu1_subunit1_12); // row, month, value

      // Set hourly rate for subunit 1 of business unit 1 for the 12th month
      cy.checkCellValue(2, 12, product.hr_bu1_subunit1_12); // row, month, value

      // Set hourly rate for subunit 1 of business unit 1 for the 24th month
      cy.editTableCell(2, 24, product.hr_bu1_subunit1_24); // row, month, value

      // Set hourly rate for subunit 1 of business unit 1 for the 24th month
      cy.checkCellValue(2, 24, product.hr_bu1_subunit1_24); // row, month, value

      // Set hourly rate for subunit 2 of business unit 1 for the 1st month
      cy.editTableCell(3, 1, product.hr_bu1_subunit2); // row, month, value

      // Check hourly rate for subunit 2 of business unit 1 for the 1st month
      cy.checkCellValue(3, 1, product.hr_bu1_subunit2); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(3, 1); // row, month


      //  *************************************************  \\
      //            BUSINESS UNIT 2 HOURLY RATE              \\
      //  *************************************************  \\


      // Set hourly rate for subunit 1 of business unit 2 for the 1st month
      cy.editTableCell(5, 1, product.hr_bu2_subunit1); // row, month, value

      // Check hourly rate for subunit 1 of business unit 2 for the 1st month
      cy.checkCellValue(5, 1, product.hr_bu2_subunit1); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(5, 1); // row, month

      // Set hourly rate for subunit 2 of business unit 2 for the 1st month
      cy.editTableCell(6, 1, product.hr_bu2_subunit2); // row, month, value

      // Check hourly rate for subunit 2 of business unit 2 for the 1st month
      cy.checkCellValue(6, 1, product.hr_bu2_subunit2); // row, month, value

      // Apply the units set for the 1st month to all remaining
      cy.applyToAllFields(6, 1); // row, month

      // Click next button and continue to unit prices setup
      cy.clickButton('Save & Close');

      // Intercept post revenue fetch
      cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');

      // Assert if the revenue was successfully deleted
      cy.wait('@chartOfAccounts', { timeout: 10000 })
        .its('response.statusCode')
        .should('eq', 200);
    });
  });
});