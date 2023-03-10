class CheckboxPage{
    checkboxButton(){
        return cy.get(':nth-child(1) > .element-list > .menu-list > #item-1')
    }
    checkboxExpand(){
        return cy.xpath("(//*[name()='svg'][@class='rct-icon rct-icon-expand-all'])[1]")
    }
    checkboxDocuments(){
        return cy.get("[id^='tree-node-workspace']")
    }
    checkboxDownloads(){
        return cy.get("[id^='tree-node-downloads']")
    }
}
export default CheckboxPage