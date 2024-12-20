/// <reference types="cypress" />

import { cogs } from "../fixtures/cogs.json";
import { company } from '../fixtures/company.json';

describe('Forecast COGS', () => {
   beforeEach(() => {
      // Login the user
      cy.loginUser(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_PASSWORD'));

   });

   if (cogs && cogs.length > 0) {
      cogs.forEach((cog) => {
         // COGS tests
         it('Add COGS', () => {
            alert('Hello COGS');
         });
      });
   } else {
      throw new Error('No COGS data found in the fixture');
   }
});