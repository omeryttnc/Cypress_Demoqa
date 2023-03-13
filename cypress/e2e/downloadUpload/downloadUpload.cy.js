describe('upload download', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/upload-download');
  });

  it('upload', () => {
    //* https://www.npmjs.com/package/cypress-file-upload
    //* attachfile('path') -> attaches/uploads file with the given path
    //? FIRST WAY
    cy.get('#uploadFile').attachFile('flagCanada.png');
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', '.png');

    //? SECOND WAY
    const path = 'flagCanada.png';
    cy.get('#uploadFile').attachFile(path);
    cy.get('#uploadedFilePath').should('be.visible').and('contain.text', path);

    //? THIRD WAY
    const paths = ['flagCanada.png', 'flagTurkey.png', 'flagUnitedKingdom.png'];
    for (let i = 0; i < paths.length; i++) {
      cy.get('#uploadFile').attachFile(paths[i]);
      cy.get('#uploadedFilePath')
        .should('be.visible')
        .and('contain.text', paths[i]);
    }
  });

  it('upload multiple files', () => {
    //? FIRST WAY
    cy.get('#uploadFile').attachFile([
      'flagCanada.png',
      'flagTurkey.png',
      'flagUnitedKingdom.png',
    ]);
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', '.png');

    cy.get('#uploadFile').invoke('attr', 'files').then((input)=>{
        cy.log(input)
    })
    // should('contain.text', '3 files');

    //? SECOND WAY
    const path1 = 'flagCanada.png';
    const path2 = 'flagTurkey.png';
    const path3 = 'flagUnitedKingdom.png';
    const paths = ['flagCanada.png', 'flagTurkey.png', 'flagUnitedKingdom.png'];
    cy.get('#uploadFile').attachFile(paths);

    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', '.png');
  });

  it.only('overriding a file name', () => {
    //* attachFile({filePath:'path', fileName: 'newName'}) -> changes the name of the given file
    cy.get('#uploadFile').attachFile({
      filePath: 'flagCanada.png',
      fileName: 'canada.png',
    });
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('have.text', 'C:\\fakepath\\canada.png');
  });

  it('download', () => {
    cy.get('#downloadButton').click();

    //"D:\sampleFile (1).jpeg"
    it('Verify the downloaded file', () => {
      const downloadsFolder = Cypress.config('downloadsFolder');
      cy.readFile(path.join(downloadsFolder, 'sampleFile.jpeg')).should(
        'exist'
      );
    });
  });
});
