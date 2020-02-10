import {
  CART_ENDPOINT, headerSelectors, productCardPopupSelector,
  productCardSelector,
  productSelectors,
} from '../../../src/scripts/utils/constants';
import {ANIMATION_CLASSES, VISUALLY_HIDDEN} from '../../../src/scripts/utils/main_utils';
import {href} from '../utils';

context('Product Card', () => {
  const url = Cypress.env('SHOPIFY_URL') || href();
  const productUrl = `${url}/collections/all`;
  beforeEach(() => {
    cy.visit(productUrl);
  });
  describe('Product Collection', () => {
    it('should load the right number of products in collection page', () => {
      cy.get(productCardSelector.sectionId).should('have.length', 12);
    });
  });
  describe('Add To Cart Button AJAX functionality', () => {
    it('should NOT add to cart when single variant product sold out', () => {
      cy.get('[data-product-id=30272973865048]').find(productSelectors.submitButtonText)
        .should('have.class', 'disabled');
      cy.get('[data-product-id=30272973865048]').find(productSelectors.submitButton)
        .click({force: true});
      cy.get('[data-product-id=30272973865048]').find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
      cy.get('[data-product-id=30272973865048]').find(productSelectors.submitLoading)
        .should('not.be.visible');
    });

    it('should NOT have Add to Cart text for variants', () => {
      // eslint-disable-next-line promise/catch-or-return
      cy.get('[data-product-id=30272977141848]')
        .find(productSelectors.submitButtonText)
        // eslint-disable-next-line promise/always-return
        .then(($id) => {
          expect(Cypress.$($id)[0].innerText).to.equal('View Product');
        });
    });

    it('Clicking on "View Product" Button should load its product page', () => {
      cy.get('[data-product-id=30272977141848]').find(productSelectors.submitButton)
        .click();
      cy.location().should((location) => {
        // eslint-disable-next-line no-unused-expressions
        expect(location.hash).to.be.empty;
        expect(location.pathname)
          .to
          .eq('/products/2018-autumn-women-hoodie-casual-long-sleeve-hooded-pullover-sweatshirts-hooded-female-jumper-women-tracksuits-sportswear-clothes');
      });
      cy.get('[data-product-id=30272977141848]').find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get('[data-product-id=30272977141848]').find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get('[data-product-id=30272977141848]').find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get('[data-product-id=30272977141848]').find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
    });

    it('Adding product should show popup with image', () => {
      cy.server();
      cy.fixture('cart-add-normal.json')
        .as('addToCart');
      cy.route({
        method: 'POST',
        url: CART_ENDPOINT.ADD,
        delay: 5000,
        response: '@addToCart',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      })
        .as('getCartResponse');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButton)
        .click();
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get(headerSelectors.productPopupContainer).should('have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      cy.get(productCardPopupSelector.container).find(productCardSelector.image).should('is.visible');
    });

    it('show loading while adding item to cart', () => {
      cy.server();
      cy.fixture('cart-add-normal.json')
        .as('addToCart');
      cy.route({
        method: 'POST',
        url: CART_ENDPOINT.ADD,
        delay: 5000,
        response: '@addToCart',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      })
        .as('getCartResponse');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButton)
        .click();
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
    });

    it('show error message when network down', () => {
      cy.server();
      cy.fixture('cart-add-normal.json')
        .as('addToCart');
      cy.route({
        method: 'POST',
        url: CART_ENDPOINT.ADD,
        delay: 5000,
        status: 500,
        response: '',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      })
        .as('getCartResponse');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButton)
        .click();
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitFailure)
        .should('have.class', VISUALLY_HIDDEN);
      cy.wait('@getCartResponse');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitFailure)
        .should('not.have.class', VISUALLY_HIDDEN);
      cy.get('[data-product-id=30272967802968]').find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
    });
  });
});
