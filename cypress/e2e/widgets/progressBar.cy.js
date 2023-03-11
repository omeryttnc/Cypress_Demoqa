
describe('progress bar', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com')
        cy.get('.category-cards> div:nth-child(2)').click()
        cy.get(':nth-child(4) > .group-header > .header-wrapper > .header-text').click()
        cy.get(':nth-child(4) > .element-list > .menu-list > #item-4 > .text').click()
    })

    it('progress bar', () => {
        cy.get('.progress-bar').invoke('attr', 'aria-valuemax').should('contain', '100')

        cy.get('#startStopButton').click()
        cy.wait(3000)
        cy.get('#startStopButton').click()


        cy.get('.progress-bar').invoke('attr', 'aria-valuenow').then(input => {
            cy.log(input)
        })

        cy.get('#startStopButton').click()
        cy.wait(3000)
        cy.get('#startStopButton').click()
        
        const el = cy.get('.progress-bar').invoke('attr', 'aria-valuenow')
        cy.log("out of : "+el)
        cy.get('.progress-bar').invoke('attr', 'aria-valuenow').then(input => {
            cy.wrap(parseInt(input)).should('be.above', 25)
        })
        
        // way 1
        cy.get('.progress-bar').invoke('css', 'background-color').then(input => {
            expect(input).to.equal('rgb(23, 162, 184)')
        })
        // way 2
        cy.get('.progress-bar').should('have.css', 'background-color', 'rgb(23, 162, 184)')  //mavi renk
        
        cy.get('#startStopButton').click()
        cy.wait(3000)
        cy.get('#startStopButton').should('not.exist') // reset oldu
        
        cy.get('.progress-bar').invoke('css', 'background-color').then(input => {
             cy.wrap(input).should('equal', 'rgb(40, 167, 69)')
        })
        cy.get('#resetButton').should('exist')
        
        cy.get('.progress-bar')   .should('have.css', 'background-color', 'rgb(40, 167, 69)')  // yesil renk



    });
})