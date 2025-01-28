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

    const firstStepTableScreen = test.screens.find(t => t.screen === "First table screen") || {};
    const secondStepTableScreen = test.screens.find(t => t.screen === "Second table screen") || {};
    const allocationDetailsScreen = test.screens.find(t => t.screen === "Allocation details") || {};

    // Extract tables from the revenue details screen
    const firstStepTableDetails = firstStepTableScreen?.tables?.[0] || {};
    const firstStepTableDetailsGrowth = firstStepTableScreen?.tables?.[1] || {};

    const secondStepTableDetails = secondStepTableScreen?.tables?.[0] || {};
    const secondStepTableDetailsGrowth = secondStepTableScreen?.tables?.[1] || {};

    // Extract tables from the allocation details screen
    const tableOfAllocationDetails = allocationDetailsScreen?.tables?.[0] || {};
    const tableOfAllocationPercentage = allocationDetailsScreen?.tables?.[1] || {};

    // // Extract values from the tables
    const firstStepTableDetailsValues = firstStepTableDetails?.value_per_month?.length > 0 ? {
      company: getTableValues(firstStepTableDetails, 'company'),
      bu1: getTableValues(firstStepTableDetails, 'bu1'),
      bu2: getTableValues(firstStepTableDetails, 'bu2'),
      su1_bu1: getTableValues(firstStepTableDetails, 'su1_bu1'),
      su2_bu1: getTableValues(firstStepTableDetails, 'su2_bu1'),
      su1_bu2: getTableValues(firstStepTableDetails, 'su1_bu2'),
      su2_bu2: getTableValues(firstStepTableDetails, 'su2_bu2')
    } : {};

    const firstStepTableDetailsGrowthValues = firstStepTableDetailsGrowth?.value_per_month?.length > 0 ? {
      company: getTableValues(firstStepTableDetailsGrowth, 'company'),
      bu1: getTableValues(firstStepTableDetailsGrowth, 'bu1'),
      bu2: getTableValues(firstStepTableDetailsGrowth, 'bu2'),
      su1_bu1: getTableValues(firstStepTableDetailsGrowth, 'su1_bu1'),
      su2_bu1: getTableValues(firstStepTableDetailsGrowth, 'su2_bu1'),
      su1_bu2: getTableValues(firstStepTableDetailsGrowth, 'su1_bu2'),
      su2_bu2: getTableValues(firstStepTableDetailsGrowth, 'su2_bu2')
    } : {};

    const secondStepTableDetailsValues = secondStepTableDetails?.value_per_month?.length > 0 ? {
      company: getTableValues(secondStepTableDetails, 'company'),
      bu1: getTableValues(secondStepTableDetails, 'bu1'),
      bu2: getTableValues(secondStepTableDetails, 'bu2'),
      su1_bu1: getTableValues(secondStepTableDetails, 'su1_bu1'),
      su2_bu1: getTableValues(secondStepTableDetails, 'su2_bu1'),
      su1_bu2: getTableValues(secondStepTableDetails, 'su1_bu2'),
      su2_bu2: getTableValues(secondStepTableDetails, 'su2_bu2')
    } : {};

    const secondStepTableDetailsGrowthValues = secondStepTableDetailsGrowth?.value_per_month?.length > 0 ? {
      company: getTableValues(secondStepTableDetailsGrowth, 'company'),
      bu1: getTableValues(secondStepTableDetailsGrowth, 'bu1'),
      bu2: getTableValues(secondStepTableDetailsGrowth, 'bu2'),
      su1_bu1: getTableValues(secondStepTableDetailsGrowth, 'su1_bu1'),
      su2_bu1: getTableValues(secondStepTableDetailsGrowth, 'su2_bu1'),
      su1_bu2: getTableValues(secondStepTableDetailsGrowth, 'su1_bu2'),
      su2_bu2: getTableValues(secondStepTableDetailsGrowth, 'su2_bu2')
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

    const tableOfAllocationPercentageValues = tableOfAllocationPercentage?.value_per_month?.length > 0 ? {
      company: getTableValues(tableOfAllocationPercentage, 'company'),
      bu1: getTableValues(tableOfAllocationPercentage, 'bu1'),
      bu2: getTableValues(tableOfAllocationPercentage, 'bu2'),
      su1_bu1: getTableValues(tableOfAllocationPercentage, 'su1_bu1'),
      su2_bu1: getTableValues(tableOfAllocationPercentage, 'su2_bu1'),
      su1_bu2: getTableValues(tableOfAllocationPercentage, 'su1_bu2'),
      su2_bu2: getTableValues(tableOfAllocationPercentage, 'su2_bu2')
    } : {};


    describe(`Forecast Revenues - ${detailsScreen?.type_name}`, () => {
      before(() => {
        // Clear local storage, cookies, and tokens before starting tests
        cy.clearLocalStorage();

        // Login the user
        cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));
      });

      it(`Should be able set the details section for ${detailsScreen?.type_name}`, () => {
        // Visit forecast section
        cy.visit(`/forecast`);

        // Wait for the content to load
        cy.wait(2000);

        // Click on Revenue section
        cy.clickButton(test.section);

        // Assert if you are on Forecast Revenue section
        cy.expectedUrl(test.section_url);

        // Check the type of test
        if (test.type === "New Revenue") {
          // Click on the add button
          cy.clickButton(test.create_button);

          // Populate Revenue Name input field
          if (detailsScreen?.type_name) {
            cy.setRevenueName(detailsScreen?.type_name);
          } else {
            throw new Error('Revenue name is missing');
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

      it(`Should be able to choose and set the advance settings for ${detailsScreen?.type_name}`, () => {
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

      if (firstStepTableDetails?.value_per_month?.length > 0) {
        it(`Should be able to set and check the values in the first step table for ${detailsScreen?.type_name}`, () => {
          // Set the unit cost setup level
          if (advanceSettingsScreen?.level === 'SU') {

            // Check if we have some values for a function to be added within the test
            if (firstStepTableDetailsGrowth?.value_per_month?.length > 0) {
              // Apply growth function
              cy.applyFunction(firstStepTableDetails?.name, "Add Growth");

              // Set the growth value on all subunits of all business units
              setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 9, firstStepTableDetailsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 10, firstStepTableDetailsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 12, firstStepTableDetailsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 13, firstStepTableDetailsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
            }

            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", firstStepTableDetails.name, 2, firstStepTableDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", firstStepTableDetails.name, 3, firstStepTableDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", firstStepTableDetails.name, 5, firstStepTableDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", firstStepTableDetails.name, 6, firstStepTableDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
          }

          if (advanceSettingsScreen?.level === 'BU') {
            if (firstStepTableDetailsGrowth?.value_per_month?.length > 0) {
              // Apply growth function
              cy.applyFunction(firstStepTableDetails?.name, "Add Growth");

              // Set the growth value on all business units
              setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 4, firstStepTableDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 5, firstStepTableDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue
            }

            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", firstStepTableDetails.name, 1, firstStepTableDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", firstStepTableDetails.name, 2, firstStepTableDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
          }

          // Check if we have some values for a function to be added within the test
          if (firstStepTableDetailsGrowth?.value_per_month?.length > 0) {
            // Apply growth function
            cy.applyFunction(firstStepTableDetails?.name, "Add Growth");

            // Set the growth value on all units
            setOrAssertValues("Set", firstStepTableDetailsGrowth.name, 1, firstStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
          }

          if (advanceSettingsScreen?.level === "Level 1") {
            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", firstStepTableDetails.name, 0, firstStepTableDetailsValues.company); // modeInput, tableName, rowIndex, cellValue
          }

          // Assert the values of the table of unit cost
          setOrAssertValues("Assert", firstStepTableDetails.name, 0, firstStepTableDetailsValues.company); // modeInput, tableName, rowIndex, cellValue

          // Assert if we have some values for a function to be added within the test
          if (advanceSettingsScreen.level === "Level 1") {
            if (firstStepTableDetailsGrowth?.value_per_month?.length > 0) {
              // Assert the values of the growth table
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 1, firstStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
            }
          }

          // Assert if we have values for the business units
          if (advanceSettingsScreen.level === 'BU') {
            setOrAssertValues("Assert", firstStepTableDetails.name, 1, firstStepTableDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", firstStepTableDetails.name, 2, firstStepTableDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue

            // Assert if we have some values for a function to be added within the test
            if (firstStepTableDetailsGrowth?.value_per_month?.length > 0) {
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 3, firstStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 4, firstStepTableDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 5, firstStepTableDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
            }
          }

          // Assert if we have values for the subunits
          if (advanceSettingsScreen.level === 'SU') {
            setOrAssertValues("Assert", firstStepTableDetails.name, 1, firstStepTableDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", firstStepTableDetails.name, 2, firstStepTableDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", firstStepTableDetails.name, 3, firstStepTableDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", firstStepTableDetails.name, 4, firstStepTableDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", firstStepTableDetails.name, 5, firstStepTableDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", firstStepTableDetails.name, 6, firstStepTableDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

            // Assert if we have some values for a function to be added within the test
            if (firstStepTableDetailsGrowth?.value_per_month?.length > 0) {
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 7, firstStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 8, firstStepTableDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 9, firstStepTableDetailsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 10, firstStepTableDetailsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 11, firstStepTableDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 12, firstStepTableDetailsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", firstStepTableDetailsGrowth.name, 13, firstStepTableDetailsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
            }
          }

          if (advanceSettingsScreen.methodology === "% breakdown" || secondStepTableDetails?.value_per_month?.length > 0) {
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

            // Check the URL after successful intercepts
            cy.url().should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
          }
        });
      }

      if (secondStepTableDetails?.value_per_month?.length > 0) {
        it(`Should be able to set and check the values in the second step table for ${detailsScreen?.type_name}`, () => {
          // Set the unit cost setup level
          if (advanceSettingsScreen?.level === 'SU') {

            // Check if we have some values for a function to be added within the test
            if (secondStepTableDetailsGrowth?.value_per_month?.length > 0) {
              // Apply growth function
              cy.applyFunction(secondStepTableDetails?.name, "Add Growth");

              // Set the growth value on all subunits of all business units
              setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 9, secondStepTableDetailsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 10, secondStepTableDetailsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 12, secondStepTableDetailsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 13, secondStepTableDetailsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
            }

            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", secondStepTableDetails.name, 2, secondStepTableDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", secondStepTableDetails.name, 3, secondStepTableDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", secondStepTableDetails.name, 5, secondStepTableDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", secondStepTableDetails.name, 6, secondStepTableDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
          }

          if (advanceSettingsScreen?.level === 'BU') {
            if (secondStepTableDetailsGrowth?.value_per_month?.length > 0) {
              // Apply growth function
              cy.applyFunction(secondStepTableDetails?.name, "Add Growth");

              // Set the growth value on all business units
              setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 4, secondStepTableDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 5, secondStepTableDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue
            }

            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", secondStepTableDetails.name, 1, secondStepTableDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Set", secondStepTableDetails.name, 2, secondStepTableDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
          }

          // Check if we have some values for a function to be added within the test
          if (secondStepTableDetailsGrowth?.value_per_month?.length > 0) {
            // Apply growth function
            cy.applyFunction(secondStepTableDetails?.name, "Add Growth");

            // Set the growth value on all units
            setOrAssertValues("Set", secondStepTableDetailsGrowth.name, 1, secondStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
          }

          if (advanceSettingsScreen?.level === "Level 1") {
            // Set the cell values in the table of unit cost        
            setOrAssertValues("Set", secondStepTableDetails.name, 0, secondStepTableDetailsValues.company); // modeInput, tableName, rowIndex, cellValue
          }

          // Assert the values of the table of unit cost
          setOrAssertValues("Assert", secondStepTableDetails.name, 0, secondStepTableDetailsValues.company); // modeInput, tableName, rowIndex, cellValue

          // Assert if we have some values for a function to be added within the test
          if (advanceSettingsScreen.level === "Level 1") {
            if (secondStepTableDetailsGrowth?.value_per_month?.length > 0) {
              // Assert the values of the growth table
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 1, secondStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
            }
          }

          // Assert if we have values for the business units
          if (advanceSettingsScreen.level === 'BU') {
            setOrAssertValues("Assert", secondStepTableDetails.name, 1, secondStepTableDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", secondStepTableDetails.name, 2, secondStepTableDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue

            // Assert if we have some values for a function to be added within the test
            if (secondStepTableDetailsGrowth?.value_per_month?.length > 0) {
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 3, secondStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 4, secondStepTableDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 5, secondStepTableDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
            }
          }

          // Assert if we have values for the subunits
          if (advanceSettingsScreen.level === 'SU') {
            setOrAssertValues("Assert", secondStepTableDetails.name, 1, secondStepTableDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", secondStepTableDetails.name, 2, secondStepTableDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", secondStepTableDetails.name, 3, secondStepTableDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", secondStepTableDetails.name, 4, secondStepTableDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", secondStepTableDetails.name, 5, secondStepTableDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
            setOrAssertValues("Assert", secondStepTableDetails.name, 6, secondStepTableDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue

            // Assert if we have some values for a function to be added within the test
            if (secondStepTableDetailsGrowth?.value_per_month?.length > 0) {
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 7, secondStepTableDetailsGrowthValues.company); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 8, secondStepTableDetailsGrowthValues.bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 9, secondStepTableDetailsGrowthValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 10, secondStepTableDetailsGrowthValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 11, secondStepTableDetailsGrowthValues.bu2); // modeInput, tableName, rowIndex, cellValue                     
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 12, secondStepTableDetailsGrowthValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
              setOrAssertValues("Assert", secondStepTableDetailsGrowth.name, 13, secondStepTableDetailsGrowthValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
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

            // Check the URL after successful intercepts
            cy.url().should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
          }
        });
      }

      if (tableOfAllocationPercentage?.value_per_month?.length > 0 && advanceSettingsScreen.methodology === "% breakdown") {
        it(`Should be able to set allocation table for ${detailsScreen?.type_name}`, () => {

          if(advanceSettingsScreen.level === "Level 1") {
            // Click the "Set" button for assigning allocation values on company level
            cy.setOrganizationalLevel("Level 1");

            // Set allocation table values for organizational for all subunits on company level
            setOrAssertValues("Set", tableOfAllocationPercentage.name, 1, tableOfAllocationPercentageValues.bu1); // modeInput, tableName, rowIndex,
            setOrAssertValues("Set", tableOfAllocationPercentage.name, 2, tableOfAllocationPercentageValues.bu2); // modeInput, tableName, rowIndex,
          }
          
          // Click the "Set" button for assigning allocation values on BU1 organization level
          cy.setOrganizationalLevel("BU1");

          // Set allocation table values for organizational for all subunits on BU1 organization level
          setOrAssertValues("Set", tableOfAllocationPercentage.name, 1, tableOfAllocationPercentageValues.su1_bu1); // modeInput, tableName, rowIndex,
          setOrAssertValues("Set", tableOfAllocationPercentage.name, 2, tableOfAllocationPercentageValues.su2_bu1); // modeInput, tableName, rowIndex,

          // Click the "Set" button for assigning allocation values on BU2 organization level
          cy.setOrganizationalLevel("BU2");

          // Set allocation table values for organizational for all subunits on BU2 organization level
          setOrAssertValues("Set", tableOfAllocationPercentage.name, 1, tableOfAllocationPercentageValues.su1_bu2); // modeInput, tableName, rowIndex,
          setOrAssertValues("Set", tableOfAllocationPercentage.name, 2, tableOfAllocationPercentageValues.su2_bu2); // modeInput, tableName, rowIndex,  

          // Assert the values of the revenues         
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 0, tableOfAllocationDetailsValues.company); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 1, tableOfAllocationDetailsValues.bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 2, tableOfAllocationDetailsValues.su1_bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 3, tableOfAllocationDetailsValues.su2_bu1); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 4, tableOfAllocationDetailsValues.bu2); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 5, tableOfAllocationDetailsValues.su1_bu2); // modeInput, tableName, rowIndex, cellValue
          setOrAssertValues("Assert", tableOfAllocationDetails.name, 6, tableOfAllocationDetailsValues.su2_bu2); // modeInput, tableName, rowIndex, cellValue
          
          // Click the save and close button
          cy.clickButton('Save & Close');

          cy.intercept('POST', 'api/chart_of_accounts').as('cOa');
          cy.intercept('PUT', 'api/cdv/calculateddrivers_v2').as('calculateDrivers');

          // Intercept post and put revenue fetch
          cy.intercept('POST', `/api/chart_of_accounts`).as('chartOfAccounts');
          cy.intercept('PUT', `/api/cdv/calculateddrivers_v2`).as('calculatedDrivers');

          // Check the URL after successful intercepts
          cy.url().should('eq', 'https://test.hz.modeliks.com/forecast/revenue');
        });
      }
    });
  });
}