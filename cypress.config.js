require('dotenv').config;
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      LOGIN_USERNAME: process.env.MODELIKS_USERNAME,
      LOGIN_PASSWORD: process.env.MODELIKS_PASSWORD
    },
    baseUrl: "https://test.hz.modeliks.com"
  },
});
