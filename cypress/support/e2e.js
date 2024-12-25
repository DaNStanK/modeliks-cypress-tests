// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './global-commands';
import "./organizational-structure";
import './forecast-commands';
import './create-revenues-commands';
import './delete-revenues-commands';
import './login-commands';
import './create-cogs-commands';
import './create-employees';

// Alternatively you can use CommonJS syntax:
// require('./commands')