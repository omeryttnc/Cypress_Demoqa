import HomePage from "../pages/HomePage";
import Links from "../pages/Links";

describe('links',()=>{
    const homepage=new HomePage();
    const links=new Links();

    it.only('links',()=>{

       cy.visit("https://demoqa.com/")

       cy.get('.category-cards> div:nth-child(1)').click()

       cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click()

       cy.get('#simpleLink').invoke('removeAttr','target').click()

       cy.title().should('eq','DEMOQA')

       cy.go('back')

       cy.get('#dynamicLink').click()
       cy.title().should('eq','DEMOQA')

       cy.get('#created').click()
       cy.xpath("//b[normalize-space()='Created']").should('include.text','Created');

       cy.get('#no-content').click()
       cy.xpath("//b[normalize-space()='No Content']").should('have.text','No Content')
      
       cy.get('#linkWrapper > :nth-child(7)').click()
       cy.xpath("//a[@id='moved']").should('have.text','Moved');

       cy.get('#bad-request').click()
       cy.xpath("//b[normalize-space()='Bad Request']").should('have.text','Bad Request')

       cy.get('#unauthorized').click()
       cy.get('#forbidden').click()
       cy.get('#invalid-url').click()

      


    })
})