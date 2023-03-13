import faker from "faker"
describe('Text Box',()=>{   
   
    before(()=>{
        cy.generateFixture()
    })
    const data2=require('../../fixtures/fakeData.json')
    it('By using fixture', () => {
        cy.visit(Cypress.env('demoqaURL'))
        cy.get(':nth-child(1) > :nth-child(1) > .card-up').click()
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-0').click()
        cy.fixture('fakeData').then(data=>{
            cy.get('#userName').type(data.firstName+" "+data.lastName)
            cy.get('#userEmail').type(data.email)
            cy.get('#currentAddress').type(data.address)
            cy.get('#permanentAddress').type(data.permanentAdress)
            cy.get('#submit').click()
            cy.get('#name').should('contain.text',data.firstName+" "+data.lastName)
            cy.get('#email').should('include.text',data.email)
            cy.get('.border > #currentAddress').should('contain.text',data.address)
            cy.get('.border > #permanentAddress').should('contain.text',data.permanentAdress)           

        })
    });    

    let fullName=faker.name.firstName()+" "+faker.name.lastName()
    let email=faker.internet.email()
    let address=faker.address.streetAddress()
    let permanentAdress=faker.address.streetAddress()
    it('By Using Variable', () => {
        cy.visit(Cypress.env('demoqaURL'))
        cy.get(':nth-child(1) > :nth-child(1) > .card-up').click()
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-0').click()
        cy.get('#userName').type(fullName)
        cy.get('#userEmail').type(email)
        cy.get('#currentAddress').type(address)
        cy.get('#permanentAddress').type(permanentAdress)
        cy.get('#submit').click()
        cy.get('#name').should('contain.text',fullName)
        cy.get('#email').should('include.text',email)
        cy.get('.border > #currentAddress').should('contain',address)
        cy.get('.border > #permanentAddress').should('contain.text',permanentAdress)

    });


})