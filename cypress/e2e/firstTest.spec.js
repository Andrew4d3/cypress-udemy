/// <reference types="cypress" />

/* What are we doing here? */
describe("Our first suite", () => {
    it("first test", () => {
        cy.visit("/")
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tag name
        cy.get('input')

        // by Id
        cy.get('#inputEmail1')

        // by class name
        cy.get('.input-full-width')

        // by attribute name (without value)
        cy.get('[placeholder]')

        // by attribute name (with value)
        cy.get('[placeholder="Email"]')

        // by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by tag name with email atributte with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        // The most recommended way in cypress
        cy.get('[data-cy="imputEmail1"]')
    })
})

