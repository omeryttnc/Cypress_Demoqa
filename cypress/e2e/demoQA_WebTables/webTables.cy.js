

describe('day1', () => {

    
    const sutunSayisiPath = ".-header.rt-thead > div[role='row'] >div"
    const sutunIsimleriPath = ".-header.rt-thead > div[role='row'] >div:nth-of-type($name$)"
    it("Sutun isimlerini cekme ve dogrulama", () => {
        cy.viewport(1400,1000)
        cy.visit("https://demoqa.com/webtables")

        cy.get(sutunSayisiPath).then((sutunSayisi) => {
            sutunSayisi = sutunSayisi.length
            cy.log(sutunSayisi)

            //1.YOL:Sutunlarin ismini yazdiralim
            //NOT:Mudahale etmek istedigimiz path'i ters tirnak icine alarak yaziyoruz
            // for (let i = 1; i <= sutunSayisi; i++) {
            //     cy.get(`.-header.rt-thead > div[role='row'] >div:nth-of-type(${i})`)
            //         .invoke("text").then((sutunName) => {
            //             cy.log(sutunName)
            //         })

            // }

            //NOT:replace();Path'in icinde degistirmek istedigimiz alani silip,istedigimiz veriyi girmemizi saglar.
            
            //2.YOL:Sutunlarin ismini yazdiralim(replace kullanimini ogrenelim)
            for (let i = 1; i <= sutunSayisi; i++) {
                let temp = sutunIsimleriPath.replace("$name$", i)  //temporary=gecici
                cy.get(temp).should("be.visible").invoke("text").then((sutunName) => {
                    cy.log(sutunName)
                })
            }
        //Mudahale edececegimiz path'i bir degiskenin icine almissak ya da page sayfasindan cagirarak kullaniyorsak;mudahale icin 
        //replace kullanmek zorunlu hale gelir.

        })
    })

    var sutunGenislikleri = { //inspect'ten cekerek olusturuyoruz
        "First Name": "flex: 100 0 auto; width: 100px;",
        "Last Name": "flex: 100 0 auto; width: 100px;",
        "Age": "flex: 40 0 auto; width: 40px; max-width: 40px;",
        "Email": "flex: 100 0 auto; width: 100px;",
        "Salary": "flex: 80 0 auto; width: 80px; max-width: 80px;",
        "Department": "flex: 100 0 auto; width: 100px;",
        "Action": "flex: 80 0 auto; width: 80px; max-width: 80px;"
    }


     //Datatable'daki sutun genisliklerini cekip,dogrulayalim
     it("Sutun genisligi dogrulama", () => {
        cy.visit("https://demoqa.com/webtables")
        cy.get(sutunSayisiPath).then((sutunSayisi) => {
            sutunSayisi = sutunSayisi.length
            //  cy.log(sutunSayisi)

            for (let i = 1; i <= sutunSayisi; i++) {
                let temp = sutunIsimleriPath.replace("$name$", i)
                cy.get(temp).invoke("text").then((sutunName) => {
                    cy.get(temp).should("have.attr", "style", sutunGenislikleri[sutunName]) //sutunGenislikleri; yukaridaki blogun ismi
                    //Yukaridaki dogrulamada atrr'u cekip,expected degerlerle karsilastiriyoruz.
    //Not:Bir degisken bulogunda value lara ulasmak icin degiskenBlogununAdi[Key] seklinde bir yazim kullaniyoruz.
                    cy.log(sutunName)
                })
                
            }

            
        })
    })


    it.only("Search islemi", () => {
        cy.visit("https://demoqa.com/webtables")
        
        cy.get("div[role='grid'] > .rt-tbody >div").then((satirSayisi) => {
            satirSayisi = satirSayisi.length
            cy.log(satirSayisi)
            cy.get("div[role='grid'] > .rt-tbody >div").should("have.length", "10")


            for (let i = 1; i <= satirSayisi; i++) {

                cy.get(`.rt-tbody > div:nth-of-type(${i}) > div[role='row'] > div:nth-of-type(1)`)
                    .invoke("text").then((firstName) => {
                        cy.log(firstName)
                        // cy.get("#example1_filter [aria-controls]").type(browserName)
                        //Ustteki satir ,input alanini silip yenisini ekleyemedigi icin hata veriyor.

                        cy.ClearAndSendKeys("#searchBox", firstName)
                        cy.wait(1000)
                         cy.get(".rt-tbody > div:nth-of-type(1) > div[role='row'] > div:nth-of-type(1)").should("have.length", "1")  //Assert 1.yol
                         
                        //  cy.get(".rt-tbody > div:nth-of-type(1) > div[role='row'] > div:nth-of-type(1)").should("be.visible").invoke("text").then((firstName) => {
                        //     cy.log(firstName)
                        //    assert.equal(firstName,cy.get("#searchBox").invoke('placeholder'))
                        // })
                        
                     //   cy.get("#searchBox").clear()
                    })

            }



        })

    })

    it("ASC ile siralanmis sutundaki verileri dogrulama",()=>{
        cy.visit("https://demoqa.com/webtables")
        cy.pause()
        cy.get("div:nth-of-type(2) > .rt-resizable-header-content").click()

     cy.pause()
        let liste=[]
        cy.get("div[role='grid'] > .rt-tbody >div").then((satirSayisi)=>{  
            satirSayisi=satirSayisi.length
            for (let i = 1; i <=satirSayisi; i++) {
                cy.get(`.rt-tbody > div:nth-of-type(1) > div[role='row'] > div:nth-of-type(2)`)
                .invoke("text").then((lastNames)=>{
                    liste.push(lastNames)
                    cy.log(lastNames)
                })
                cy.wrap(liste).as("liste")
            }

        })



        cy.get("@liste").then((liste)=>{
            let sortListe =[...liste]  //listeyi klonluyoruz
             cy.log(liste)
            // cy.log(sortListe)
            sortListe.sort(new Intl.Collator("en").compare) //Intl.Collator nesnesi, dile duyarlı dize karşılaştırmasına olanak tanır.compare=karşılaştırmak

           assert.equal(JSON.stringify(liste),JSON.stringify(sortListe),"Siralama dogrulama")
          // JSON.stringify() yöntemi, bir JavaScript nesnesini veya değerini bir JSON dizesine dönüştürür.stringify=dizmek
        })

        
    })


})