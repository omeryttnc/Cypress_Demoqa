
describe('day2', () => {

    const radioBtn = "#yesRadio"
    const text = "[class=text-success]"

    it("Radio buttona tiklama", ()=>{
       
        cy.visit("https://demoqa.com/elements");

        cy.contains('Radio Button').click();

        // Click the radio button Yes
        cy.get('#yesRadio').check({force:true}).should('be.checked');
       
        // Assert that the 'Yes' text is displayed
        cy.get(text).invoke('text').should('equal', 'Yes');

         // Click the radio button Impressive
        cy.get('div:nth-of-type(3) > .custom-control-label').click();

        // Assert that the 'Impressive' text is displayed
        cy.get(text).invoke('text').should('equal', 'Impressive');

         // Assert that the No button is disabled
         cy.get('.custom-control-label.disabled').should('not.be.enabled');
         
    
        

    });


});