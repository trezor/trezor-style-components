describe('LanguagePicker', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.visit(
            'http://localhost:9001/iframe.html?selectedKind=Other&selectedStory=LanguagePicker&full=0'
        );
    });

    it(`LanguagePicker`, () => {
        cy.getTestElement('language_picker')
            .should('be.visible')
            .matchImageSnapshot();
    });
});
