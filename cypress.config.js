const { defineConfig } = require("cypress");
const dotenv = require('dotenv');
dotenv.config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.LOGIN_USERNAME = process.env.MODELIKS_USERNAME;
      config.env.LOGIN_PASSWORD = process.env.MODELIKS_PASSWORD;
      return config;
    },
    baseUrl: "https://test.hz.modeliks.com"
  },
});
