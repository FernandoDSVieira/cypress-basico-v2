Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName')
        .type('Fernando')
        .should('have.value', 'Fernando')
    cy.get('#lastName')
        .type('Vieira')
        .should('have.value', 'Vieira')

    cy.get('#email')
        .type('fernandodsvieira@gmail.com')
        .should('have.value', 'fernandodsvieira@gmail.com')

    cy.get('#phone')
        .type('11958721292')
        .should('have.value', '11958721292')
        
    cy.get('#phone-checkbox')
        .click()

    cy.get('#open-text-area')
        .type('texto')

    cy.contains('button', 'Enviar')
        .click()

    cy.get('.success')
        .should('be.visible')
})


