/* eslint-disable
  no-unused-expressions,
  */
// / <reference types="Cypress" />

context('Location', () => {
  const credentials = Cypress.env('SHOPIFY_URL') ? '' : require('../../../credentials.json');
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/location');
  });

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty');
  });

  it('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    // 'https://example.cypress.io/commands/location'
    cy.location().should((location) => {
      expect(location.hash).to.be.empty;
      expect(location.href).to.eq(`https://example.cypress.io/commands/location?preview_theme_id=${credentials.theme_id}`);
      expect(location.host).to.eq('example.cypress.io');
      expect(location.hostname).to.eq('example.cypress.io');
      expect(location.origin).to.eq('https://example.cypress.io');
      expect(location.pathname).to.eq('/commands/location');
      expect(location.port).to.eq('');
      expect(location.protocol).to.eq('https:');
      expect(location.search).not.to.be.empty;
    });
  });

  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', `https://example.cypress.io/commands/location?preview_theme_id=${credentials.theme_id}`);
  });
});
