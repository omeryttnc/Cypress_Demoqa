
// import fakeData from '../../fixtures/fakeData.json'
describe('forms', () => {
    let fakeData
    before(() => {

        cy.generateFixture()
        fakeData = require('../../fixtures/fakeData.json')
    })

    it('first part', () => {
        cy.visit('https://demoqa.com/')
        cy.get('.category-cards> div:nth-child(2)').click()
        cy.wait(1000)
        cy.get('.element-list.collapse.show').click()
        cy.get('#firstName').type(fakeData.firstName).should('have.value', fakeData.firstName)
            .and('be.visible')
            .and('exist')

        cy.get('#lastName').type(fakeData.lastName).should('have.value', fakeData.lastName)
            .and('not.have.value', fakeData.firstName)
            .and('be.visible')
            .and('exist')

        cy.get('#userEmail').type(fakeData.email).should('have.value', fakeData.email)
            .and('not.have.value', fakeData.firstName)
            .and('be.visible')
            .and('exist')


        cy.get('#gender-radio-1').check({ force: true }).should('be.checked')
        cy.get('#gender-radio-2').should('not.be.checked')
        cy.get('#gender-radio-3').should('not.be.checked')


        cy.get('#gender-radio-2').check({ force: true }).should('be.checked')
        cy.get('#gender-radio-1').should('not.be.checked')
        cy.get('#gender-radio-3').should('not.be.checked')


        cy.get('#userNumber').type(fakeData.mobileNumber, { force: true })//.should('have.a.property', 'value')
            .should('have.value', fakeData.mobileNumber)
        //cy.get('#userNumber').should('have.attr','value')

        cy.get('#dateOfBirthInput').click()

        cy.get('.react-datepicker__month-select').select('1').invoke('val').should('eq', '1')
        cy.get('.react-datepicker__month-select option:selected').should('have.text', 'February')

        cy.get('.react-datepicker__month-select').select(4)
        cy.get('.react-datepicker__month-select option:selected').should('have.text', 'May')

        cy.get('.react-datepicker__month-select').select('June')
        cy.get('.react-datepicker__month-select option:selected').should('have.text', 'June')

        cy.get('#userNumber').click()

        cy.get('.subjects-auto-complete__value-container').type('a')

        cy.get('.subjects-auto-complete__menu-list--is-multi > div').each((element, index, list) => {
            cy.log(element.text())
            cy.wrap(element.text().toLowerCase()).should('contain', 'a')

        })
        cy.get('.subjects-auto-complete__menu-list--is-multi > div').first().click()



        cy.get("[id^='hobbies-checkbox-']").check({ force: true }).should('be.checked')
        cy.get("[id^='hobbies-checkbox-']").uncheck({ force: true }).should('not.be.checked')


        cy.get('#uploadPicture').attachFile('flagCanada.png').should('contain.value', 'flagCanada.png')


        cy.get('#currentAddress').type(fakeData.address).should('have.value', fakeData.address)


    });
})