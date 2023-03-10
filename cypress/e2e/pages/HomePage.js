class HomePage{
    elementsButton(){
        return cy.get('.category-cards> div:nth-child(1)')
    }
    homePageVisit(){
        return cy.visit("https://demoqa.com/")
    }
}
export default HomePage