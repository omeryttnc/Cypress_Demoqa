describe('', () => {

    const alert1 = '#alertButton'
    const alert2 = '#timerAlertButton'
    const alert3 = '#confirmButton'
    const alert4 = '#promtButton'
    beforeEach(() => {
        cy.visit('https://demoqa.com')
        cy.get('.category-cards> div:nth-child(2)').click()
        cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1 > .text').click()
    })

    it('click button to see alert', () => {

        cy.get(alert1).click()

        cy.on('window:alert',t=>{
            expect(t).to.equal('You clicked a button')
            cy.log("printed alert: "+t)        })



    })

    it('click button alert will appear after 5 seconds', () => {

        cy.get(alert2).click()

        cy.on('window:alert',t=>{
            expect(t).to.equal('This alert appeared after 5 seconds')
            cy.log("printed alert: "+t)
        })
    })
    it('click button alert will appear after 5 seconds cancel', () => {

        cy.get(alert3).click()

        cy.on('window:confirm',t=>{
           return false
        })

        cy.get('#confirmResult').then(input=>{
            cy.wrap(input).should('have.text','You selected Cancel')
        })
    })
    it('click button alert will appear after 5 seconds ok', () => {

        cy.get(alert3).click()

        cy.get('#confirmResult').then(input=>{
            cy.wrap(input).should('have.text','You selected Ok')
        })
    })
    it.only('click button alert will appear after 5 seconds', () => {
        
        
        cy.window().then(win=>{
            cy.stub(win,'prompt').returns('omer ali')
            cy.get(alert4).click()
        })
        cy.get('#promptResult').then(input=>{
            cy.wrap(input).should('have.text','You entered omer ali')
        })
    })



})