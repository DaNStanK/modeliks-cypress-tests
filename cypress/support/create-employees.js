/// <reference types="cypress" />

// Custom Cypress command to set the employee name in the input field
Cypress.Commands.add("setEmployeeName", (employeeName) => {
   // Validate that employeeName is a non-empty string
   if (typeof employeeName !== 'string' || employeeName.trim() === '') {
      throw new Error('Invalid employee name. It must be a non-empty string.');
   }

   // Find the input field for the employee name and type the provided name
   cy.get('span')
      .contains('Name of employee or group of employees')
      .closest('div')
      .find('input')
      .type(employeeName);
});

// Custom Cypress command to set the employee function in the input field
Cypress.Commands.add("setEmployeeFunction", (employeeFunction) => {
   // Validate that employeeFunction is a non-empty string
   if (typeof employeeFunction !== 'string' || employeeFunction.trim() === '') {
      throw new Error('Invalid employee function. It must be a non-empty string.');
   }

   // Find the input field for the employee function and check the provided function
   cy.get('div[role="dialog"] span')
      .contains('Employee function')
      .closest('div')
      .find('div.grid-cols-2 label')
      .contains(employeeFunction)
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});

// Custom Cypress command to set the employee salary type in the input field
Cypress.Commands.add("setEmployeeSalaryType", (employeeSalaryType) => {
   // Validate that employee salary type is a non-empty string
   if (typeof employeeSalaryType !== 'string' || employeeSalaryType.trim() === '') {
      throw new Error('Invalid employee salary type. It must be a non-empty string.');
   }

   // Find the input field for the employee salary type and check the provided type
   cy.get('div[role="dialog"] span')
      .contains('How will you enter employee salaries')
      .closest('div')
      .find('div label')
      .contains(employeeSalaryType)
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});

// Custom Cypress command to set the employee revenue only stream
Cypress.Commands.add("setRevenueOnlyStream", (revenueOnlyStream) => {
   // Validate that revenueOnlyStream is a non-empty string
   if (typeof revenueOnlyStream !== 'string' || revenueOnlyStream.trim() === '') {
      throw new Error('Invalid employee revenue only stream. It must be a non-empty string.');
   }

   // Open the dropdown menu
   cy.get('div[role="dialog"] div.dropdown.relative button')
      .click({ force: true });

   // Find the element for the revenue only stream and click it
   cy.get('div.absolute div.fixed div.cursor-pointer')
      .find('span')
      .contains(revenueOnlyStream)
      .should('be.visible')
      .closest('div.cursor-pointer')
      .click({ force: true });

   // Verify that the selected revenue only stream is displayed correctly
   cy.get('div[role="dialog"] div.dropdown.relative span.px-1.flex.text-grey-dark-3.text-14')
      .should('have.text', revenueOnlyStream);
});

// Custom Cypress command to set the employee status type in the input field
Cypress.Commands.add("setEmployeeStatus", (employeeStatus) => {
   // Validate that employee status is a non-empty string
   if (typeof employeeStatus !== 'string' || employeeStatus.trim() === '') {
      throw new Error('Invalid employee status. It must be a non-empty string.');
   }

   // Find the input field for the employee status type and check the provided type
   cy.get('div[role="dialog"] span')
      .contains('Employment status')
      .closest('div')
      .find('div label')
      .contains(employeeStatus)
      .closest('label')
      .find('input[type="checkbox"]')
      .check({ force: true });
});

//Find cell
Cypress.Commands.add("locateCell", (cellValue) => {
   // Find the cell with the provided value
   cy.get('.scdi_info_dialog_div table tbody tr span[sx="[object Object]"]')
});