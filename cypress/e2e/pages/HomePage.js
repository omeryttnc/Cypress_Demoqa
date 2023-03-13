class HomePage{
    elementsButton(){
        return cy.get('.category-cards> div:nth-child(1)')
    }
    homePageVisit(){
        return cy.visit("https://demoqa.com/")
    }
    homePageLinks(){
        return cy.get("(//li[@id='item-5'])[1]")
    }
}
export default HomePage