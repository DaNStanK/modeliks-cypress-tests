/// <reference types="cypress" />

import { company } from "../fixtures/company.json";

// Populate Revenue Name input field
Cypress.Commands.add('setRevenueName', (revenueName) => {
   // Validate input
   if (revenueName == null || typeof revenueName !== 'string') {
      throw new Error('Invalid or missing revenue name. Ensure the revenue name is populated as a parameter in the function and is a string.');
   }

   // Populate Revenue Name input field
   cy.get('input[name="streamName"]')
      .clear() // Clear any existing value
      .type(revenueName); // Type the new revenue name
});

// Choose the type of revenue
Cypress.Commands.add('chooseRevenueType', (typeName) => {
   // Validate input
   if (typeName == null || typeof typeName !== 'string') {
      throw new Error('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is a string.');
   }

   // Choose the revenue type based on the typeName
   cy.get('div[role="dialog"] label')
      .contains(typeName)
      .should('exist') // Ensure the label exists
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});

// Assert Revenue type
Cypress.Commands.add('assertRevenueType', (index) => {
   // Validate input
   if (index == null || typeof index !== 'number') {
      throw new Error('Invalid or missing revenue type. Ensure the revenue type is populated as a parameter in the function and is a number.');
   }

   // Assert that the checkbox for the revenue type is checked
   cy.get('div[role="dialog"] label')
      .eq(index)
      .find('input[type="checkbox"]')
      .should('be.checked');
});

// Add Subscription Name
Cypress.Commands.add('addSubscriptionName', (subscriptionName) => {
   // Validate input
   if (subscriptionName == null || typeof subscriptionName !== 'string') {
      throw new Error('Invalid or missing subscription name. Ensure the subscription name is populated as a parameter in the function and is a string.');
   }

   // Choose the 'Subscription Revenue' type
   cy.chooseRevenueType('Subscription Revenue');

   // Assert that the input field for the subscription name exists and populate it
   cy.get('div[role="dialog"]')
      .find('input[name="SubscriptionName"]')
      .should('exist') // Ensure the input field exists
      .clear() // Clear any existing value
      .type(`${subscriptionName}{enter}`) // Type the new subscription name and press enter
      .blur(); // Remove focus from the input field
});

// Add Subscription period
Cypress.Commands.add('addSubscriptionPeriod', (subscriptionPeriod) => {
   // Validate input
   if (subscriptionPeriod == null || typeof subscriptionPeriod !== 'string') {
      throw new Error('Invalid or missing subscription period. Ensure the subscription period is populated as a parameter in the function and is a string.');
   }

   // Choose the 'Subscription Revenue' type
   cy.chooseRevenueType('Subscription Revenue');

   // Click on subscription period dropdown list
   cy.get('div[role="dialog"]')
      .find('h5')
      .contains("Define Subscription Plan")
      .should('exist') // Ensure the 'Define Subscription Plan' section exists
      .closest('div')
      .find('div#revenueSubPlans')
      .find('button')
      .click(); // Click the dropdown button

   // Select the subscription period from the dropdown
   cy.get('div.fixed')
      .contains(subscriptionPeriod)
      .should('exist') // Ensure the subscription period exists in the dropdown
      .closest('div.cursor-pointer')
      .click(); // Click the subscription period

   // Assert that the selected subscription period is displayed in the dropdown button
   cy.get('div[role="dialog"]')
      .find('h5')
      .contains("Define Subscription Plan")
      .should('exist') // Ensure the 'Define Subscription Plan' section exists
      .closest('div')
      .find('div#revenueSubPlans')
      .find('button')
      .should('contain', subscriptionPeriod); // Verify the selected subscription period is displayed
});