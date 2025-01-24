/// <reference types="cypress" />

import { tests } from "../fixtures/revenues.json";

// Function to get table values based on key
const getTableValues = (table, key) => table.value_per_month.find(value => value.hasOwnProperty(key))?.[key] || [];

// Function to set or assert values in the table
const setOrAssertValues = (modeInput, tableName, rowIndex, values) => {
  if (Array.isArray(values)) {
    values.forEach((cellValue, index) => {
      const cellIndex = index + 1;
      cy.setOrAssertValue(modeInput, tableName, rowIndex, cellIndex, cellValue);
    });
  } else {
    throw new Error('Values is not an array');
  }
};

// Check if there are tests to run
if (tests && tests.length > 0) {
  tests.forEach(test => {
    // Extract screens from the test
    const detailsScreen = test.screens.find(step => step.screen === 'Details');
    if (!detailsScreen) throw new Error('Details screen in JSON file is missing');

    const advanceSettingsScreen = test.screens.find(step => step.screen === 'Advance Settings');
    if (!advanceSettingsScreen) throw new Error('Advance Settings screen in JSON file is missing');

    const revenueDetailsScreen = test.screens.find(t => t.screen === "Revenue details");
    if (!revenueDetailsScreen) throw new Error('Revenue details screen in JSON file is missing');

    const allocationDetailsScreen = test.screens.find(t => t.screen === "Allocation details") || {};

    // Extract tables from the revenue details screen
    const tableOfRevenueDetails = revenueDetailsScreen?.tables?.[0] || {};
    const tableOfRevenueDetailsGrowth = revenueDetailsScreen?.tables?.[1] || {};
    const averageRevenueDetails = revenueDetailsScreen?.tables?.[2] || {};

    // Extract tables from the allocation details screen
    const tableOfAllocationDetails = allocationDetailsScreen?.tables?.[0] || {};

    // Extract values from the tables
    const tableOfRevenueDetailsValues = tableOfRevenueDetails?.value_per_month?.length > 0 ? {
      company: getTableValues(tableOfRevenueDetails, 'company'),
      bu1: getTableValues(tableOfRevenueDetails, 'bu1'),
      bu2: getTableValues(tableOfRevenueDetails, 'bu2'),
      su1_bu1: getTableValues(tableOfRevenueDetails, 'su1_bu1'),
      su2_bu1: getTableValues(tableOfRevenueDetails, 'su2_bu1'),
      su1_bu2: getTableValues(tableOfRevenueDetails, 'su1_bu2'),
      su2_bu2: getTableValues(tableOfRevenueDetails, 'su2_bu2')
    } : {};

    const tableOfRevenueDetailsGrowthValues = tableOfRevenueDetailsGrowth?.value_per_month?.length > 0 ? {
      company: getTableValues(tableOfRevenueDetailsGrowth, 'company'),
      bu1: getTableValues(tableOfRevenueDetailsGrowth, 'bu1'),
      bu2: getTableValues(tableOfRevenueDetailsGrowth, 'bu2'),
      su1_bu1: getTableValues(tableOfRevenueDetailsGrowth, 'su1_bu1'),
      su2_bu1: getTableValues(tableOfRevenueDetailsGrowth, 'su2_bu1'),
      su1_bu2: getTableValues(tableOfRevenueDetailsGrowth, 'su1_bu2'),
      su2_bu2: getTableValues(tableOfRevenueDetailsGrowth, 'su2_bu2')
    } : {};

    const tableOfAllocationDetailsValues = tableOfAllocationDetails?.value_per_month?.length > 0 ? {
      company: getTableValues(tableOfAllocationDetails, 'company'),
      bu1: getTableValues(tableOfAllocationDetails, 'bu1'),
      bu2: getTableValues(tableOfAllocationDetails, 'bu2'),
      su1_bu1: getTableValues(tableOfAllocationDetails, 'su1_bu1'),
      su2_bu1: getTableValues(tableOfAllocationDetails, 'su2_bu1'),
      su1_bu2: getTableValues(tableOfAllocationDetails, 'su1_bu2'),
      su2_bu2: getTableValues(tableOfAllocationDetails, 'su2_bu2')
    } : {};

    describe(`Forecast Revenues - ${detailsScreen?.type_name}`, () => {
      before(() => {
        // Clear local storage, cookies, and tokens before starting tests
        cy.clearLocalStorage();

        // Login the user
        cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
      });

      it.only(`Should be able set the details section for ${detailsScreen?.type_name}`, () => {
        // Visit forecast section
        cy.visit(`/forecast`);

        // Wait for the content to load
        cy.wait(2000);

        // Click on COGS section
        cy.clickButton(test.section);

        // Assert if you are on Forecast COGS section
        cy.expectedUrl(test.section_url);

        // Check the type of test
        if (test.type === "New Revenue") {
          // Click on the add button
          cy.clickButton(test.create_button);

          // Populate COGS Name input field
          if (detailsScreen?.type_name) {
            cy.setRevenueName(detailsScreen?.type_name);
          } else {
            throw new Error('COGS name is missing');
          }

          // Choose revenue type
          if (detailsScreen?.revenue_type) {
            cy.chooseRevenueType(detailsScreen?.revenue_type);

            // Check if the type of revenue is "Subscription Revenue"
            if (detailsScreen.revenue_type === "Subscription Revenue") {
              // Add subscription name
              if (detailsScreen?.subscription_name) {
                cy.addSubscriptionName(detailsScreen.subscription_name);
              } else {
                throw new Error('Subscription name is missing');
              }

              // Add subscription period
              if (detailsScreen?.subscription_period) {
                cy.addSubscriptionPeriod(detailsScreen.subscription_period);
              } else {
                throw new Error('Subscription period is missing');
              }
            }
          } else {
            throw new Error('COGS specific relation stream is missing');
          }
        }
      });

      it.only(`Should be able to choose and set the advance settings for ${detailsScreen?.type_name}`, () => {
        // Select advance settings
        cy.chooseAdvanceSettings();

        // Choose planning level
        if (advanceSettingsScreen?.level) {
          cy.choosePlanningLevel(advanceSettingsScreen?.level);
        } else {
          throw new Error('Planning level is missing');
        }

        // Set allocation methodology if planning level is not Level 3 - SU
        if (advanceSettingsScreen?.level !== 'SU') {
          if (advanceSettingsScreen?.methodology) {
            cy.setAllocationMethodology(advanceSettingsScreen?.methodology);
          } else {
            throw new Error('Allocation methodology is missing');
          }
        }

        // Click save button in the advanced settings
        cy.clickButton('Save');

        // Click next button and continue to unit sales info section
        cy.clickButton('Next');
      });

      if (tableOfRevenueDetails?.value_per_month?.length > 0) {
        it.only(`Should be able to set and check the unit cost table for ${detailsScreen?.type_name}`, () => {
          // Set the unit cost setup level
          if (advanceSettingsScreen?.level === 'SU') {

            // Check if we have some values for a function to be added within the test
            if (tableOfRevenueDetailsGrowth?.value_per_month?.length > 0) {
              // Apply growth function
              cy.applyFunction(tableOfRevenueDetails?.name, "Add Growth");

              // Set the growth value on all subunits of all business units
              setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 9, tableOfRevenueDetailsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 10, tableOfRevenueDetailsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 12, tableOfRevenueDetailsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 13, tableOfRevenueDetailsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
            }

            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", tableOfRevenueDetails.name, 2, tableOfRevenueDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", tableOfRevenueDetails.name, 3, tableOfRevenueDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", tableOfRevenueDetails.name, 5, tableOfRevenueDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", tableOfRevenueDetails.name, 6, tableOfRevenueDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
          }

          if (advanceSettingsScreen?.level === 'BU') {
            if (tableOfRevenueDetailsGrowth?.value_per_month?.length > 0) {
              // Apply growth function
              cy.applyFunction(tableOfRevenueDetails?.name, "Add Growth");

              // Set the growth value on all business units
              setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 4, tableOfRevenueDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 5, tableOfRevenueDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue
            }

            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", tableOfRevenueDetails.name, 1, tableOfRevenueDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", tableOfRevenueDetails.name, 2, tableOfRevenueDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
          }

          // Check if we have some values for a function to be added within the test
          if (tableOfRevenueDetailsGrowth?.value_per_month?.length > 0) {
            // Apply growth function
            cy.applyFunction(tableOfRevenueDetails?.name, "Add Growth");

            // Set the growth value on all units
            setOrAssertValues("Set", tableOfRevenueDetailsGrowth.name, 1, tableOfRevenueDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
          }

          if (advanceSettingsScreen?.level === "Level 1") {
            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", tableOfRevenueDetails.name, 0, tableOfRevenueDetailsValues.company); // modeInput, tableName, rowIndex, cellValue
          }

          // Assert the values of the table of unit cost
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 0, tableOfRevenueDetailsValues.company); // modeInput, tableName, rowIndex, cellValue

          // Assert if we have some values for a function to be added within the test
          if (advanceSettingsScreen.level === "Level 1") {
            if (tableOfRevenueDetailsGrowth?.value_per_month?.length > 0) {
              // Assert the values of the growth table
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 1, tableOfRevenueDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
            }
          }

          // Assert if we have values for the business units
          if (advanceSettingsScreen.level === 'BU') {
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 1, tableOfRevenueDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 2, tableOfRevenueDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue

            // Assert if we have some values for a function to be added within the test
            if (tableOfRevenueDetailsGrowth?.value_per_month?.length > 0) {
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 3, tableOfRevenueDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 4, tableOfRevenueDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 5, tableOfRevenueDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
            }
          }

          // Assert if we have values for the subunits
          if (advanceSettingsScreen.level === 'SU') {
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 1, tableOfRevenueDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 2, tableOfRevenueDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 3, tableOfRevenueDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 4, tableOfRevenueDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 5, tableOfRevenueDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", tableOfRevenueDetails.name, 6, tableOfRevenueDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

            // Assert if we have some values for a function to be added within the test
            if (tableOfRevenueDetailsGrowth?.value_per_month?.length > 0) {
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 7, tableOfRevenueDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 8, tableOfRevenueDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 9, tableOfRevenueDetailsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 10, tableOfRevenueDetailsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 11, tableOfRevenueDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 12, tableOfRevenueDetailsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", tableOfRevenueDetailsGrowth.name, 13, tableOfRevenueDetailsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
            }
          }

          if (advanceSettingsScreen.methodology === "% breakdown") {
            // Click next button
            cy.clickButton('Next');
          } else {
            // Click Save & Close button
            cy.clickButton('Save & Close');

            cy.intercept('POST', 'api/chart_of_accounts').as('cOa');
            cy.intercept('PUT', 'api/cdv/calculateddrivers_v2').as('calculateDrivers');

            // Check if the POST and PUT fetches were successful
            cy.wait(['@cOa', '@calculateDrivers']).then((interceptions) => {
              interceptions.forEach((interception) => {
                expect(interception.response.statusCode).to.eq(200);
              });
            });
          }
        });
      }

      if (tableOfRevenueDetails?.value_per_month?.length > 0 && advanceSettingsScreen.methodology === "% breakdown") {
        it.only(`Should be able to set allocation table for ${detailsScreen?.type_name}`, () => {

          // Click the "Set" button for assigning allocation values on BU1 organisation level
          cy.setOrganizationalLevel("BU1");

          // Set allocation table values for organizational for all subunits on BU1 organisation level
          setOrAssertValues("Set", tableOfAllocationDetails.name, 1, tableOfAllocationDetailsValues.su1_bu1); // modeInput, tableName, rowIndex,
          setOrAssertValues("Set", tableOfAllocationDetails.name, 2, tableOfAllocationDetailsValues.su1_bu2); // modeInput, tableName, rowIndex,

          // Click the "Set" button for assigning allocation values on BU2 organisation level
          cy.setOrganizationalLevel("BU2");

          // Set allocation table values for organizational for all subunits on BU2 organisation level
          setOrAssertValues("Set", tableOfAllocationDetails.name, 1, tableOfAllocationDetailsValues.su2_bu1); // modeInput, tableName, rowIndex,
          setOrAssertValues("Set", tableOfAllocationDetails.name, 2, tableOfAllocationDetailsValues.su2_bu2); // modeInput, tableName, rowIndex,

          // Assert the values of the revenues         
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 0, tableOfRevenueDetailsValues.company); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 1, tableOfRevenueDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 2, tableOfRevenueDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 3, tableOfRevenueDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 4, tableOfRevenueDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 5, tableOfRevenueDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfRevenueDetails.name, 6, tableOfRevenueDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

          // Click the save and close button
          cy.clickButton('Save & Close');

          cy.intercept('POST', 'api/chart_of_accounts').as('cOa');
          cy.intercept('PUT', 'api/cdv/calculateddrivers_v2').as('calculateDrivers');

          // Intercept post and put revenue fetch
          cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
          cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');
        });
      }
    });
  });
}

// describe('Forecast Revenues', () => {
//   beforeEach(() => {
//     // Clear local storage before starting tests
//     cy.clearLocalStorage();

//     // Login the user
//     cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
//   });

//   // Check if revenue only data is missing
//   if (revenue_only && revenue_only.length > 0) {
//     revenue_only.forEach(product => {
//       // All Revenue Only tests
//       it(`Should be able to create ${product.type_name}`, () => {
//         // Assert if you are on Forecast revenues section
//         cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

//         cy.wait(1000);

//         // Click on Add Revenue Stream
//         cy.clickButton('Add Revenue Stream');

//         // Populate Revenue Name input field
//         if (product.type_name) {
//           cy.setRevenueName(product.type_name);
//         } else {
//           throw new Error('Revenue name is missing');
//         }

//         // Choose the type of revenue
//         if (product.index !== undefined) {
//           cy.chooseRevenueType(product.index);

//           // Assert that the actual checkbox is checked after clicking the custom UI
//           cy.assertRevenueType(product.index);
//         } else {
//           throw new Error('Revenue type is missing');
//         }

//         // Select advance settings
//         cy.chooseAdvanceSettings();

//         // Choose planning level
//         if (product.level) {
//           cy.choosePlanningLevel(product.level);
//         } else {
//           throw new Error('Planning level is missing');
//         }

//         // Set the allocation methodology
//         if (product.methodology) {
//           cy.setAllocationMethodology(product.methodology);
//         } else {
//           throw new Error('Allocation methodology is missing');
//         }

//         // Click save button in the advanced settings
//         cy.clickButton('Save');

//         // Click next button and continue to unit sales info section
//         cy.clickButton('Next');

//         //  *************************************************  \\
//         //                    REVENUE SETUP                    \\
//         //  *************************************************  \\

//         // Set business unit 1 Revenue Only for the 1st month
//         if (product.unit1_revenue) {
//           cy.editTableCell(1, 1, product.unit1_revenue); // row, month, value

//           // Check if the value for the 1st month is correctly applied
//           cy.checkCellValue(1, 1, product.unit1_revenue); // row, month, value

//           // Apply the units set for the 1st month to all remaining
//           cy.applyToAllFields(1, 1); // row, month
//         } else {
//           throw new Error('Revenue unit 1 value is missing');
//         }

//         // Set business unit 2 Revenue Only for the 1st month
//         if (product.unit2_revenue) {
//           cy.editTableCell(2, 1, product.unit2_revenue); // row, month, value

//           // Check if the value for the 1st month is correctly applied
//           cy.checkCellValue(2, 1, product.unit2_revenue); // row, month, value

//           // Apply the units set for the 1st month to all remaining
//           cy.applyToAllFields(2, 1); // row, month
//         } else {
//           throw new Error('Revenue unit 2 value is missing');
//         }

//         // Click next button and continue to unit prices setup
//         cy.clickButton('Next');

//         //  *************************************************  \\
//         //    ALLOCATION SETUP FOR SUBUNIT 1 AND 2 OF UNIT 1   \\
//         //  *************************************************  \\

//         cy.setTotals(company.organizationalStructure.levelTwo_unitOne.name);

//         // Set subunit 1 of business unit 1 allocation for 1st month
//         if (product.unit1_subunit1_revenue_lvl2) {
//           cy.editAllocationTableCell(1, 1, product.unit1_subunit1_revenue_lvl2); // row, month, value

//           // Check if the value was set for the 1st month
//           cy.checkAllocationCellValue(1, 1, product.unit1_subunit1_revenue_lvl2); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(1, 1); // row, month
//         } else {
//           throw new Error('Subunit 1 of business unit 1 value is missing');
//         }

//         // Set subunit 2 of business unit 1 allocation for 12th month
//         if (product.unit1_subunit2_revenue_lvl2) {
//           cy.editAllocationTableCell(2, 1, product.unit1_subunit2_revenue_lvl2); // row, month, value

//           // Check if the value was set for the 12th month
//           cy.checkAllocationCellValue(2, 1, product.unit1_subunit2_revenue_lvl2); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(2, 1); // row, month
//         } else {
//           throw new Error('Subunit 2 of business unit 1 value is missing');
//         }

//         //  *************************************************  \\
//         //    ALLOCATION SETUP FOR SUBUNIT 1 AND 2 OF UNIT 2   \\
//         //  *************************************************  \\

//         cy.setTotals(company.organizationalStructure.levelTwo_unitTwo.name);

//         // Set subunit 1 of business unit 2 allocation for 1st month
//         if (product.unit2_subunit1_revenue_lvl2) {
//           cy.editAllocationTableCell(1, 1, product.unit2_subunit1_revenue_lvl2); // row, month, value

//           // Check if the value was set for the 1st month
//           cy.checkAllocationCellValue(1, 1, product.unit2_subunit1_revenue_lvl2); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(1, 1); // row, month
//         } else {
//           throw new Error('Subunit 1 of business unit 2 value is missing');
//         }

//         // Set subunit 2 of business unit 2 allocation for 12th month
//         if (product.unit2_subunit2_revenue_lvl2) {
//           cy.editAllocationTableCell(2, 1, product.unit2_subunit2_revenue_lvl2); // row, month, value

//           // Check if the value was set for the 12th month
//           cy.checkAllocationCellValue(2, 1, product.unit2_subunit2_revenue_lvl2); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(2, 1); // row, month
//         } else {
//           throw new Error('Subunit 2 of business unit 2 value is missing');
//         }

//         // Click the set button for the subunits of business unit 1 from the org. structure
//         cy.setTotals(company.organizationalStructure.levelTwo_unitOne.name);

//         //  *************************************************  \\
//         //               TOTALS RESULT ASSERTION               \\
//         //  *************************************************  \\

//         // Assert company revenue 12 month value
//         if (product.company_12) {
//           cy.checkTotalCellValue(1, 12, product.company_12); // row, month, value
//         } else {
//           throw new Error('Company 12 month revenue value is missing');
//         }

//         // Assert company revenue 1 year value
//         if (product.company_Y1) {
//           cy.checkTotalCellValue(1, 13, product.company_Y1); // row, month, value
//         } else {
//           throw new Error('Company 1 year revenue value is missing');
//         }

//         // Assert company revenue 24 month value
//         if (product.company_Y2) {
//           cy.checkTotalCellValue(1, 24, product.company_Y2); // row, month, value
//         } else {
//           throw new Error('Company 24 month revenue value is missing');
//         }

//         // Assert company level 2 unit 1 revenue 12 month value
//         if (product.bu1_12) {
//           cy.checkTotalCellValue(2, 12, product.bu1_12); // row, month, value
//         } else {
//           throw new Error('Business unit 1 12 month revenue value is missing');
//         }

//         // Assert company level 2 unit 1 revenue 1 year value
//         if (product.bu1_Y1) {
//           cy.checkTotalCellValue(2, 13, product.bu1_Y1); // row, month, value
//         } else {
//           throw new Error('Business unit 1 1 year revenue value is missing');
//         }

//         // Assert company level 2 unit 1 revenue 24 month value
//         if (product.bu1_Y2) {
//           cy.checkTotalCellValue(2, 24, product.bu1_Y2); // row, month, value
//         } else {
//           throw new Error('Business unit 1 24 month revenue value is missing');
//         }

//         // Assert company level 2 unit 2 revenue 12 month value
//         if (product.bu2_subunit1_12) {
//           cy.checkTotalCellValue(6, 12, product.bu2_subunit1_12); // row, month, value
//         } else {
//           throw new Error('Business unit 2 subunit 1 12 month revenue value is missing');
//         }

//         // Assert company level 2 unit 2 revenue 1 year value
//         if (product.bu2_subunit1_Y1) {
//           cy.checkTotalCellValue(6, 13, product.bu2_subunit1_Y1); // row, month, value
//         } else {
//           throw new Error('Business unit 2 subunit 1 1 year revenue value is missing');
//         }

//         // Assert company level 2 unit 2 revenue 24 month value
//         if (product.bu2_subunit1_Y2) {
//           cy.checkTotalCellValue(6, 24, product.bu2_subunit1_Y2); // row, month, value
//         } else {
//           throw new Error('Business unit 2 subunit 1 24 month revenue value is missing');
//         }

//         // Click the save and close button
//         cy.clickButton('Save & Close');

//         // Intercept post and put revenue fetch
//         cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
//         cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');

//         // Assert post and put fetches
//         cy.wait(['@chartOfAccounts', '@calculatedDrivers'], { timeout: 10000 })
//           .then(fetches => {
//             // Check if the fetches were successful
//             fetches.forEach(result => {
//               // Check if the fetch was successful
//               expect(result.response.statusCode).to.eq(200);
//             });
//           });
//       });
//     });
//   } else {
//     alert('Revenue only data is missing');
//     throw new Error('Revenue only data is missing');
//   }

//   // Check if product sales data is missing
//   if (product_sales && product_sales.length > 0) {
//     product_sales.forEach(product => {
//       // All Product Revenue tests
//       it(`Should be able to create ${product.type_name}`, () => {
//         // Assert if you are on Forecast revenues section
//         cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

//         // Wait for the page to load
//         cy.wait(1000);

//         // Click on Add Revenue Stream
//         cy.clickButton('Add Revenue Stream');

//         // Populate Revenue Name input field
//         if (product.type_name) {
//           cy.setRevenueName(product.type_name);
//         } else {
//           throw new Error('Revenue name is missing');
//         }

//         // Choose the type of revenue
//         if (product.index !== undefined) {
//           cy.chooseRevenueType(product.index);

//           // Assert that the actual checkbox is checked after clicking the custom UI
//           cy.assertRevenueType(product.index);
//         } else {
//           throw new Error('Revenue type is missing');
//         }

//         // Select advance settings
//         cy.chooseAdvanceSettings();

//         // Choose planning level
//         if (product.level) {
//           cy.choosePlanningLevel(product.level);
//         } else {
//           throw new Error('Planning level is missing');
//         }

//         // Set the allocation methodology
//         if (product.methodology) {
//           cy.setAllocationMethodology(product.methodology);
//         } else {
//           throw new Error('Allocation methodology is missing');
//         }

//         // Click save button in the advanced settings
//         cy.clickButton('Save');

//         // Click next button and continue to unit sales info section
//         cy.clickButton('Next');

//         //  *************************************************  \\
//         //                 UNIT SALES SETUP                    \\
//         //  *************************************************  \\

//         // Set Unit Sales info for the 1st month
//         if (product.unit_sales) {
//           cy.editTableCell(1, 1, product.unit_sales); // row, month, value

//           // Check if the value for the 1st month is correctly applied
//           cy.checkCellValue(1, 1, product.unit_sales); // row, month, value

//           // Apply the units set for the 1st month to all remaining
//           cy.applyToAllFields(1, 1); // row, month
//         } else {
//           throw new Error('Unit sales for the 1st month is missing');
//         }

//         // Set Unit Sales info for the 12th month
//         if (product.unit_sales_12) {
//           cy.editTableCell(1, 12, product.unit_sales_12); // row, month, value

//           // Check if the value is correctly applied on 12th month
//           cy.checkCellValue(1, 12, product.unit_sales_12); // row, month, value
//         } else {
//           throw new Error('Unit sales for the 12th month is missing');
//         }

//         // Set Unit Sales info for 24th month
//         if (product.unit_sales_24) {
//           cy.editTableCell(1, 24, product.unit_sales_24); // row, month, value

//           // Check if the value is correctly applied for 24th month
//           cy.checkCellValue(1, 24, product.unit_sales_24); // row, month, value
//         } else {
//           throw new Error('Unit sales for the 24th month is missing');
//         }

//         // Click next button and continue to unit prices setup
//         cy.clickButton('Next');


//         //  *************************************************  \\
//         //                 UNIT PRICE SETUP                    \\
//         //  *************************************************  \\


//         // Set Unit Price info for the first month
//         if (product.unit_price) {
//           cy.editTableCell(1, 1, product.unit_price); // row, month, value

//           // Check if the value of the unit price for the first month is correctly applied
//           cy.checkCellValue(1, 1, product.unit_price); // row, month, value

//           // Apply the unit price for all months
//           cy.applyToAllFields(1, 1); // parameters: [row, month]
//         } else {
//           throw new Error('Unit price for the first month is missing');
//         }

//         // Set Unit Price info for the 12th month
//         if (product.unit_price_12) {
//           cy.editTableCell(1, 12, product.unit_price_12); // row, month, value

//           // Check if the value of the unit price for the 12th month is correctly applied
//           cy.checkCellValue(1, 12, product.unit_price_12); // row, month, value
//         } else {
//           throw new Error('Unit price for the 12th month is missing');
//         }

//         // Click next button and continue to allocation
//         cy.clickButton('Next');

//         //  *************************************************  \\
//         //  ALLOCATION SETUP FOR BUSINESS UNIT 1 OF MAIN UNIT  \\
//         //  *************************************************  \\

//         // Click the set button for the business units of the main unit from the org. structure
//         cy.setTotals(company.organizationalStructure.levelOne.name);

//         // Set business unit allocation for 1st month
//         if (product.bu1_allocation) {
//           cy.editAllocationTableCell(1, 1, product.bu1_allocation); // row, month, value

//           // Check if the value was set for the 1st month
//           cy.checkAllocationCellValue(1, 1, product.bu1_allocation); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(1, 1); // row, month
//         } else {
//           throw new Error('Business unit 1 allocation for the 1st month is missing');
//         }

//         // Set business unit allocation for 12th month
//         if (product.bu1_allocation_12) {
//           cy.editAllocationTableCell(1, 12, product.bu1_allocation_12); // row, month, value

//           // Check if the value was set for the 12th month
//           cy.checkAllocationCellValue(1, 12, product.bu1_allocation_12); // row, month, value
//         } else {
//           throw new Error('Business unit 1 allocation for the 12th month is missing');
//         }

//         // Set business unit allocation for 24th month
//         if (product.bu1_allocation_24) {
//           cy.editAllocationTableCell(1, 24, product.bu1_allocation_24); // row, month, value

//           // Check if the value was set for the 24th month
//           cy.checkAllocationCellValue(1, 24, product.bu1_allocation_24); // row, month, value
//         } else {
//           throw new Error('Business unit 1 allocation for the 24th month is missing');
//         }


//         //  *************************************************  \\
//         //  ALLOCATION SETUP FOR BUSINESS UNIT 2 OF MAIN UNIT  \\
//         //  *************************************************  \\



//         // Set business unit allocation for 1st month
//         if (product.bu2_allocation) {
//           cy.editAllocationTableCell(2, 1, product.bu2_allocation); // row, month, value
//           cy.checkAllocationCellValue(2, 1, product.bu2_allocation); // row, month, value
//           cy.applyToAllFieldsAllocation(2, 1); // row, month
//         } else {
//           throw new Error('Business unit 2 allocation for the 1st month is missing');
//         }

//         // Set business unit allocation for 12th month
//         if (product.bu2_allocation_12) {
//           cy.editAllocationTableCell(2, 12, product.bu2_allocation_12); // row, month, value
//           cy.checkAllocationCellValue(2, 12, product.bu2_allocation_12); // row, month, value
//         } else {
//           throw new Error('Business unit 2 allocation for the 12th month is missing');
//         }

//         // Set business unit allocation for 24th month
//         if (product.bu2_allocation_24) {
//           cy.editAllocationTableCell(2, 24, product.bu2_allocation_24); // row, month, value
//           cy.checkAllocationCellValue(2, 24, product.bu2_allocation_24); // row, month, value
//         } else {
//           throw new Error('Business unit 2 allocation for the 24th month is missing');
//         }

//         //  *************************************************  \\
//         //  ALLOCATION SETUP FOR SUBUNIT 1 OF BUSINESS UNIT 1  \\
//         //  *************************************************  \\


//         // Click the set button for the subunits of business unit 1 from the org. structure
//         cy.setTotals(company.organizationalStructure.levelTwo_unitOne.name);

//         // Set subunit 1 of business unit 1 allocation for 1st month
//         if (product.bu1_subunit1) {
//           cy.editAllocationTableCell(1, 1, product.bu1_subunit1); // row, month, value
//           cy.checkAllocationCellValue(1, 1, product.bu1_subunit1); // row, month, value
//           cy.applyToAllFieldsAllocation(1, 1); // row, month
//         } else {
//           throw new Error('Subunit 1 of business unit 1 allocation for the 1st month is missing');
//         }

//         // Set subunit 1 of business unit 1 allocation for 12th month
//         if (product.bu1_subunit1_12) {
//           cy.editAllocationTableCell(1, 12, product.bu1_subunit1_12); // row, month, value
//           cy.checkAllocationCellValue(1, 12, product.bu1_subunit1_12); // row, month, value
//         } else {
//           throw new Error('Subunit 1 of business unit 1 allocation for the 12th month is missing');
//         }

//         // Set subunit 1 of business unit 1 allocation for 24th month
//         if (product.bu1_subunit1_24) {
//           cy.editAllocationTableCell(1, 24, product.bu1_subunit1_24); // row, month, value
//           cy.checkAllocationCellValue(1, 24, product.bu1_subunit1_24); // row, month, value
//         } else {
//           throw new Error('Subunit 1 of business unit 1 allocation for the 24th month is missing');
//         }


//         //  *************************************************  \\
//         //  ALLOCATION SETUP FOR SUBUNIT 2 OF BUSINESS UNIT 1  \\
//         //  *************************************************  \\


//         // Set subunit 2 of business unit 1 allocation for 1st month
//         if (product.bu1_subunit2) {
//           cy.editAllocationTableCell(2, 1, product.bu1_subunit2); // row, month, value
//           cy.checkAllocationCellValue(2, 1, product.bu1_subunit2); // row, month, value
//           cy.applyToAllFieldsAllocation(2, 1); // row, month
//         } else {
//           throw new Error('Subunit 2 of business unit 1 allocation for the 1st month is missing');
//         }

//         // Set subunit 2 of business unit 1 allocation for 12th month
//         if (product.bu1_subunit2_12) {
//           cy.editAllocationTableCell(2, 12, product.bu1_subunit2_12); // row, month, value
//           cy.checkAllocationCellValue(2, 12, product.bu1_subunit2_12); // row, month, value
//         } else {
//           throw new Error('Subunit 2 of business unit 1 allocation for the 12th month is missing');
//         }

//         // Set subunit 2 of business unit 1 allocation for 24th month
//         if (product.bu1_subunit2_24) {
//           cy.editAllocationTableCell(2, 24, product.bu1_subunit2_24); // row, month, value
//           cy.checkAllocationCellValue(2, 24, product.bu1_subunit2_24); // row, month, value
//         } else {
//           throw new Error('Subunit 2 of business unit 1 allocation for the 24th month is missing');
//         }


//         //  *************************************************  \\
//         //  ALLOCATION SETUP FOR SUBUNIT 1 OF BUSINESS UNIT 2  \\
//         //  *************************************************  \\


//         // Click the set button for the subunits of business unit 2 from the org. structure
//         cy.setTotals(company.organizationalStructure.levelTwo_unitTwo.name);

//         // Set subunit 1 of business unit 2 allocation for 1st month
//         if (product.bu2_subunit1) {
//           cy.editAllocationTableCell(1, 1, product.bu2_subunit1); // row, month, value

//           // Check if the value was set for the 1st month
//           cy.checkAllocationCellValue(1, 1, product.bu2_subunit1); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(1, 1); // row, month
//         } else {
//           throw new Error('Subunit 1 of business unit 2 allocation for the 1st month is missing');
//         }


//         //  *************************************************  \\
//         //  ALLOCATION SETUP FOR SUBUNIT 2 OF BUSINESS UNIT 2  \\
//         //  *************************************************  \\


//         // Set subunit 2 of business unit 2 allocation for 1st month
//         if (product.bu2_subunit2) {
//           cy.editAllocationTableCell(2, 1, product.bu2_subunit2); // row, month, value

//           // Check if the value was set for the 1st month
//           cy.checkAllocationCellValue(2, 1, product.bu2_subunit2); // row, month, value

//           // Apply to all remaining months
//           cy.applyToAllFieldsAllocation(2, 1); // row, month
//         } else {
//           throw new Error('Subunit 2 of business unit 2 allocation for the 1st month is missing');
//         }

//         // Click the set button for the subunits of business unit 2 from the org. structure
//         cy.setTotals(company.organizationalStructure.levelOne.name);


//         //  *************************************************  \\
//         //               TOTALS RESULT ASSERTION               \\
//         //  *************************************************  \\


//         // Assert total unit sales 12 month value
//         if (product.company_12) {
//           cy.checkTotalCellValue(1, 12, product.company_12); // row, month, value
//         } else {
//           throw new Error('Total unit sales for 12 months is missing');
//         }

//         // Assert total unit sales year 1 value
//         if (product.company_Y1) {
//           cy.checkTotalCellValue(1, 13, product.company_Y1); // row, month, value
//         } else {
//           throw new Error('Total unit sales for year 1 is missing');
//         }

//         // Assert total unit sales year 2 value
//         if (product.company_Y2) {
//           cy.checkTotalCellValue(1, 24, product.company_Y2); // row, month, value
//         } else {
//           throw new Error('Total unit sales for year 2 is missing');
//         }

//         // Assert total business unit 1 12 month value
//         if (product.bu1_12) {
//           cy.checkTotalCellValue(2, 12, product.bu1_12); // row, month, value
//         } else {
//           throw new Error('Business unit 1 total sales for 12 months is missing');
//         }

//         // Assert business unit 1 sales year 1 value
//         if (product.bu1_Y1) {
//           cy.checkTotalCellValue(2, 13, product.bu1_Y1); // row, month, value
//         } else {
//           throw new Error('Business unit 1 total sales for year 1 is missing');
//         }

//         // Assert business unit 1 sales year 2 value
//         if (product.bu1_Y2) {
//           cy.checkTotalCellValue(2, 24, product.bu1_Y2); // row, month, value
//         } else {
//           throw new Error('Business unit 1 total sales for year 2 is missing');
//         }

//         // Assert total business unit 2 subunit 1 12 month value
//         if (product.bu2_subunit1_12) {
//           cy.checkTotalCellValue(6, 12, product.bu2_subunit1_12); // row, month, value
//         } else {
//           throw new Error('Business unit 2 subunit 1 total sales for 12 months is missing');
//         }

//         // Assert business unit 2 subunit 1 sales year 1 value
//         if (product.bu2_subunit1_Y1) {
//           cy.checkTotalCellValue(6, 13, product.bu2_subunit1_Y1); // row, month, value
//         } else {
//           throw new Error('Business unit 2 subunit 1 total sales for year 1 is missing');
//         }

//         // Assert business unit 2 subunit 1 sales year 2 value
//         if (product.bu2_subunit1_Y2) {
//           cy.checkTotalCellValue(6, 24, product.bu2_subunit1_Y2); // row, month, value
//         } else {
//           throw new Error('Business unit 2 subunit 1 total sales for year 2 is missing');
//         }

//         // Click the save and close button
//         cy.clickButton('Save & Close');

//         // Intercept post and put revenue fetch
//         cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
//         cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');

//         // Assert post and put fetches
//         cy.wait(['@chartOfAccounts', '@calculatedDrivers'], { timeout: 10000 })
//           .then(fetches => {
//             // Check if the fetches were successful
//             fetches.forEach(result => {
//               // Check if the fetch was successful
//               expect(result.response.statusCode).to.eq(200);
//             });
//           });
//       });
//     });
//   } else {
//     alert('Product sales data is missing');
//     throw new Error('Product sales data is missing');
//   }


//   // Check if service revenue data is missing
//   if (service_revenue && service_revenue.length > 0) {
//     service_revenue.forEach(product => {
//       // All Service Revenue tests
//       it(`Should be able to create ${product.type_name}`, () => {
//         // Assert if you are on Forecast revenues section
//         cy.expectedUrl('https://test.hz.modeliks.com/forecast/revenue');

//         // Wait for the page to load
//         cy.wait(1000);

//         // Click on Add Revenue Stream
//         cy.clickButton('Add Revenue Stream');

//         // Populate Revenue Name input field
//         if (product.type_name) {
//           cy.setRevenueName(product.type_name);
//         } else {
//           throw new Error('Revenue name is missing');
//         }

//         // Choose the type of revenue
//         if (product.index !== undefined) {
//           cy.chooseRevenueType(product.index);

//           // Assert that the actual checkbox is checked after clicking the custom UI
//           cy.assertRevenueType(product.index);
//         } else {
//           throw new Error('Revenue type is missing');
//         }

//         // Select advance settings
//         cy.chooseAdvanceSettings();

//         // Choose planning level
//         if (product.level) {
//           cy.choosePlanningLevel(product.level);
//         } else {
//           throw new Error('Planning level is missing');
//         }

//         // Click save button in the advanced settings
//         cy.clickButton('Save');

//         // Click next button and continue to unit sales info section
//         cy.clickButton('Next');


//         //  *************************************************  \\
//         //          BUSINESS UNIT 1 BILLABLE HOURS             \\
//         //  *************************************************  \\


//         // Set billable hours for subunit 1 of business unit 1 for the 1st month
//         if (product.bh_bu1_subunit1) {
//           cy.editTableCell(2, 1, product.bh_bu1_subunit1); // row, month, value
//           cy.checkCellValue(2, 1, product.bh_bu1_subunit1); // row, month, value
//           cy.applyToAllFields(2, 1); // row, month
//         } else {
//           throw new Error('Billable hours for subunit 1 of business unit 1 for the 1st month is missing');
//         }

//         // Set billable hours for subunit 1 of business unit 1 for the 12th month
//         if (product.bh_bu1_subunit1_12) {
//           cy.editTableCell(2, 12, product.bh_bu1_subunit1_12); // row, month, value
//           cy.checkCellValue(2, 12, product.bh_bu1_subunit1_12); // row, month, value
//         } else {
//           throw new Error('Billable hours for subunit 1 of business unit 1 for the 12th month is missing');
//         }

//         // Set billable hours for subunit 1 of business unit 1 for the 24th month
//         if (product.bh_bu1_subunit1_24) {
//           cy.editTableCell(2, 24, product.bh_bu1_subunit1_24); // row, month, value
//           cy.checkCellValue(2, 24, product.bh_bu1_subunit1_24); // row, month, value
//         } else {
//           throw new Error('Billable hours for subunit 1 of business unit 1 for the 24th month is missing');
//         }

//         // Set billable hours for subunit 2 of business unit 1 for the 1st month
//         if (product.bh_bu1_subunit2) {
//           cy.editTableCell(3, 1, product.bh_bu1_subunit2); // row, month, value
//           cy.checkCellValue(3, 1, product.bh_bu1_subunit2); // row, month, value
//           cy.applyToAllFields(3, 1); // row, month
//         } else {
//           throw new Error('Billable hours for subunit 2 of business unit 1 for the 1st month is missing');
//         }


//         //  *************************************************  \\
//         //          BUSINESS UNIT 2 BILLABLE HOURS             \\
//         //  *************************************************  \\


//         // Set billable hours for subunit 1 of business unit 2 for the 1st month
//         if (product.bh_bu2_subunit1) {
//           cy.editTableCell(5, 1, product.bh_bu2_subunit1); // row, month, value
//           cy.checkCellValue(5, 1, product.bh_bu2_subunit1); // row, month, value
//           cy.applyToAllFields(5, 1); // row, month
//         } else {
//           throw new Error('Billable hours for subunit 1 of business unit 2 for the 1st month is missing');
//         }

//         // Set billable hours for subunit 2 of business unit 2 for the 1st month
//         if (product.bh_bu2_subunit2) {
//           cy.editTableCell(6, 1, product.bh_bu2_subunit2); // row, month, value
//           cy.checkCellValue(6, 1, product.bh_bu2_subunit2); // row, month, value
//           cy.applyToAllFields(6, 1); // row, month
//         } else {
//           throw new Error('Billable hours for subunit 2 of business unit 2 for the 1st month is missing');
//         }

//         // Click next button and continue to unit prices setup
//         cy.clickButton('Next');


//         //  *************************************************  \\
//         //            BUSINESS UNIT 1 HOURLY RATE              \\
//         //  *************************************************  \\


//         // Set hourly rate for subunit 1 of business unit 1 for the 1st month
//         if (product.hr_bu1_subunit1) {
//           cy.editTableCell(2, 1, product.hr_bu1_subunit1); // row, month, value
//           cy.checkCellValue(2, 1, product.hr_bu1_subunit1); // row, month, value
//           cy.applyToAllFields(2, 1); // row, month
//         } else {
//           throw new Error('Hourly rate for subunit 1 of business unit 1 for the 1st month is missing');
//         }

//         // Set hourly rate for subunit 1 of business unit 1 for the 12th month
//         if (product.hr_bu1_subunit1_12) {
//           cy.editTableCell(2, 12, product.hr_bu1_subunit1_12); // row, month, value
//           cy.checkCellValue(2, 12, product.hr_bu1_subunit1_12); // row, month, value
//         } else {
//           throw new Error('Hourly rate for subunit 1 of business unit 1 for the 12th month is missing');
//         }

//         // Set hourly rate for subunit 1 of business unit 1 for the 24th month
//         if (product.hr_bu1_subunit1_24) {
//           cy.editTableCell(2, 24, product.hr_bu1_subunit1_24); // row, month, value
//           cy.checkCellValue(2, 24, product.hr_bu1_subunit1_24); // row, month, value
//         } else {
//           throw new Error('Hourly rate for subunit 1 of business unit 1 for the 24th month is missing');
//         }

//         // Set hourly rate for subunit 2 of business unit 1 for the 1st month
//         if (product.hr_bu1_subunit2) {
//           cy.editTableCell(3, 1, product.hr_bu1_subunit2); // row, month, value
//           cy.checkCellValue(3, 1, product.hr_bu1_subunit2); // row, month, value
//           cy.applyToAllFields(3, 1); // row, month
//         } else {
//           throw new Error('Hourly rate for subunit 2 of business unit 1 for the 1st month is missing');
//         }

//         //  *************************************************  \\
//         //            BUSINESS UNIT 2 HOURLY RATE              \\
//         //  *************************************************  \\

//         // Set hourly rate for subunit 1 of business unit 2 for the 1st month
//         if (product.hr_bu2_subunit1) {
//           cy.editTableCell(5, 1, product.hr_bu2_subunit1); // row, month, value
//           cy.checkCellValue(5, 1, product.hr_bu2_subunit1); // row, month, value
//           cy.applyToAllFields(5, 1); // row, month
//         } else {
//           throw new Error('Hourly rate for subunit 1 of business unit 2 for the 1st month is missing');
//         }

//         // Set hourly rate for subunit 2 of business unit 2 for the 1st month
//         if (product.hr_bu2_subunit2) {
//           cy.editTableCell(6, 1, product.hr_bu2_subunit2); // row, month, value
//           cy.checkCellValue(6, 1, product.hr_bu2_subunit2); // row, month, value
//           cy.applyToAllFields(6, 1); // row, month
//         } else {
//           throw new Error('Hourly rate for subunit 2 of business unit 2 for the 1st month is missing');
//         }

//         // Click save and close button
//         cy.clickButton('Save & Close');

//         // Intercept post and put revenue fetch
//         cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
//         cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');

//         // Assert post and put fetches
//         cy.wait(['@chartOfAccounts', '@calculatedDrivers'], { timeout: 10000 })
//           .then(fetches => {
//             // Check if the fetches were successful
//             fetches.forEach(result => {
//               // Check if the fetch was successful
//               expect(result.response.statusCode).to.eq(200);
//             });
//           });
//       });
//     });
//   } else {
//     alert('Service revenue data is missing');
//     throw new Error('Service revenue data is missing');
//   }
// });