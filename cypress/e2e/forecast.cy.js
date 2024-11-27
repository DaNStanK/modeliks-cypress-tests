import { data } from '../fixtures/example.json';

describe('Forecast', () => {
  beforeEach(() => {
    // Login the user
    cy.login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('LOGIN_PASSWORD')
    );
  });

  it('passes', () => {

  });
});