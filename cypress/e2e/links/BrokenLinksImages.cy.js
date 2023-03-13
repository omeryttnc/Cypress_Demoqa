import Links from "../pages/Links";

describe('bkn link',()=>{

    it('broken links',()=>{
        cy.visit("https://demoqa.com/")

       cy.get('.category-cards> div:nth-child(1)').click()

        cy.xpath("//span[normalize-space()='Broken Links - Images']").click();
        cy.wait(1000)

        // get all links
        cy.get('a').each(link=>{
            if(link.prop('href')){
               
                cy.log(link.prop('href'))
            }
            
           })
        
        //valid link
        cy.get('[href="http://demoqa.com"]').click({force:true})
    cy.go('back')
    
        // broken link
        cy.get('[href="http://the-internet.herokuapp.com/status_codes/500"]').click({force:true})
    })
})