
class Links{


    linkSimple(){
        cy.get("//a[@id='simpleLink']")
    }
    dynamicLink(){
        cy.xpath("//a[@id='dynamicLink']")
    }
}
export default Links