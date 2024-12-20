/// <reference types="cypress" />

Cypress.Commands.add("orgStrCreation", () => {

         //VISIT ORG.STRUCTURE and CREATE LEVELS (Units)

         cy.visit('test.hz.modeliks.com/organizational_structure');
      
         cy.get('.max-h-9 > .bg-primary').click();
         cy.get('.touch-none').type('Busines Units');
         cy.get('.gap-1 > .relative > .left-0').type('BU 1');
         cy.get('.flex > .flex > .bg-transparent > .text-14 > .w-full').click() //surplus
         cy.wait(500)
         cy.get(':nth-child(2) > .flex-col > .touch-none').click().type('BU 2')
         cy.wait(1000)
         cy.get('.MuiDialogActions-root').click()
         cy.get('.MuiDialogActions-root > .border-primary > .text-14').click()
         cy.wait(1000)
         cy.get('.max-h-9 > .bg-primary').click()
         cy.get('.gap-4 > .flex > .touch-none').type('SubUnits')
         cy.get('.gap-1 > .relative > .left-0').type('Subunit 1')
         cy.get('.flex > .flex > .bg-transparent > .text-14 > .w-full').click()
         cy.get('.flex > .flex > .flex:nth-child(2) > .flex > .touch-none').type('Subunit 2')
         cy.get('.flex > .flex > .bg-transparent > .text-14 > .w-full').click() //surplus
         cy.get('.MuiDialog-root > .MuiDialog-container > .MuiPaper-root > .MuiDialogActions-root > .text-white:nth-child(2)').click()
         cy.contains("!!Save").click()   // Saving button
         cy.wait(2000);

})