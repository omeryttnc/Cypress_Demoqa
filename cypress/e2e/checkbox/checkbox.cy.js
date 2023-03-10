import CheckboxPage from "../pages/CheckboxPage";
import HomePage from "../pages/HomePage";

describe('checkbox',()=>{

    const homepage=new HomePage
   const checkbox=new CheckboxPage

    it('checkbox', () => {
    //siteye giris
    homepage.homePageVisit()

    //elementlere tiklama
    homepage.elementsButton().click()

    //checkbox a tiklama
    checkbox.checkboxButton().click()

    //checkbox kutucuklarini genisletme
    checkbox.checkboxExpand().click()


    //documents checkbox una tiklama
    checkbox.checkboxDocuments().check({ force: true }).should('be.checked')


    //documents tikini kaldirma

    checkbox.checkboxDocuments().uncheck({ force: true }).should('be.not.checked')

    //downloads checkboxunu tiklama
    checkbox.checkboxDownloads().check({ force: true }).should('be.checked')


    });
    
    
   




})