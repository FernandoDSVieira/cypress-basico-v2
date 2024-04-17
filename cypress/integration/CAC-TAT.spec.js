
/// <reference types="Cypress" />

const { should } = require("chai")


describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
       
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    
    
    beforeEach(() => {
        cy.visit('./src/index.html')
    })


    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'aaaaaaaaaaaaaaaaaaaaaaaaaaa, asfaffffffffffffffferfra,aaaaaaaaaaaaaaaaaaaaaaaaaaa, asfaffffffffffffffferfra,aaaaaaaaaaaaaaaaaaaaaaaaaaa, asfaffffffffffffffferfra,aaaaaaaaaaaaaaaaaaaaaaaaaaa, asfaffffffffffffffferfra,aaaaaaaaaaaaaaaaaaaaaaaaaaa, asfaffffffffffffffferfra,'
        cy.get('#firstName').type('Fernando')  
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('fernandodsvieira@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        
    })


    it('exibe mensagem de erro, quando o telefone torna-se obrigatorio mas não é preeenchido antes do formulario ser enviado', function() {
        cy.get('#firstName').type('Fernando')  
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('fernandodsvieira@gmail.com')
        cy.get('#phone-checkbox').check()
        // cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Fernando')  
        cy.get('#lastName').type('Vieira')
        cy.get('#email').type('fernandodsvieira@gmail.com')
        cy.get('#phone-checkbox').click()
        // cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Fernando')
            .should('have.value', 'Fernando')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Vieira')
            .should('have.value', 'Vieira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('fernandodsvieira@gmail.com')
            .should('have.value', 'fernandodsvieira@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11958721292')
            .should('have.value', '11958721292')
            .clear()
            .should('have.value', '')
        cy.get('#phone-checkbox')
            .click()
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
        
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })


    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })


    it('seleciona um produto (Cursos) por seu valor', function() {
        cy.get('#product')
            .select('cursos')
            .should('have.value', 'cursos')
    })


    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })


    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"] ')
            .check('feedback')
            .should('have.value', 'feedback')
    })


    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })


    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('be.not.checked')
            
    })


    it('seleciona arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            should(function($input) {
                expect($input[0].file[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Talking About Testing')
            .should('be.visible')
    })

})




    

        



  