require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Load environment variables
      config.env.LOGIN_USERNAME = process.env.MODELIKS_USERNAME;
      config.env.LOGIN_PASSWORD = process.env.MODELIKS_PASSWORD;
      return config;
    },
    viewportWidth: 1440, // Set the default width of the viewport
    viewportHeight: 900, // Set the default height of the viewport
    baseUrl: "https://test.hz.modeliks.com"
  },
});
