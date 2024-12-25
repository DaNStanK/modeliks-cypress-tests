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
      throw new Error('Invalid employee function. It must be a non-empty string.');
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