import {
  CART_ENDPOINT,
  clickPositions,
  headerSelectors,
  productCardPopupSelector,
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

  describe('Product Card Button Click', () => {
    const singleVariantProductId = '30272967802968';
    const multiVariantProductId = '30272972423256';
    clickPositions.forEach((position) => {
      it(`Click on button at position: '${position}' should load link`, () => {
        cy.get(`[data-product-id=${multiVariantProductId}]`).find(productSelectors.submitButton)
          .click();
        cy.location().should((location) => {
          // eslint-disable-next-line no-unused-expressions
          expect(location.hash).to.be.empty;
          expect(location.href)
            .to
            .contain(`${url}/products/2018-autumn-women-hoodie-casual-long-sleeve-hooded-pullover-sweatshirts-hooded-female-jumper-women-tracksuits-sportswear-clothes`);
        });
      });

      it(`Click on button at position: '${position}' should add to cart`, () => {
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
        cy.get(`[data-product-id=${singleVariantProductId}]`).find(productSelectors.submitButton)
          .click();
        cy.get(`[data-product-id=${singleVariantProductId}]`).find(productSelectors.submitButtonText)
          .should('have.class', VISUALLY_HIDDEN);
        cy.get(`[data-product-id=${singleVariantProductId}]`).find(productSelectors.submitLoading)
          .should('be.visible');
        cy.wait('@getCartResponse');
        cy.get(headerSelectors.productPopupContainer).should('have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
        cy.get(productCardPopupSelector.container).find(productCardSelector.image).should('is.visible');
      });
    });
  });

  describe('Add To Cart Button AJAX functionality', () => {
    it('should NOT add to cart when single variant product sold out', () => {
      const productId = '30272973865048';
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('have.class', 'disabled');
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButton)
        .click({force: true});
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitLoading)
        .should('not.be.visible');
    });

    it('should NOT have Add to Cart text for variants', () => {
      const productId = '30272977141848';
      // eslint-disable-next-line promise/catch-or-return
      cy.get(`[data-product-id=${productId}]`)
        .find(productSelectors.submitButtonText)
        // eslint-disable-next-line promise/always-return
        .then(($id) => {
          expect(Cypress.$($id)[0].innerText).to.equal('View Product');
        });
    });

    it('Clicking on "View Product" Button should load its product page', () => {
      const productId = '30272972423256';
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonUrl)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButton)
        .click();
      cy.location().should((location) => {
        // eslint-disable-next-line no-unused-expressions
        expect(location.hash).to.be.empty;
        expect(location.href)
          .to
          .contain(`${url}/products/2018-autumn-women-hoodie-casual-long-sleeve-hooded-pullover-sweatshirts-hooded-female-jumper-women-tracksuits-sportswear-clothes`);
      });
    });

    it('Adding product should show popup with image', () => {
      const productId = '30272967802968';
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
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonUrl)
        .should('not.be.visible');
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButton)
        .click();
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get(headerSelectors.productPopupContainer).should('have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      cy.get(productCardPopupSelector.container).find(productCardSelector.image).should('is.visible');
    });

    it('show loading while adding item to cart', () => {
      const productId = '30272967802968';
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
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButton)
        .click();
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
    });

    it('show error message when network down', () => {
      const productId = '30272967802968';
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
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButton)
        .click();
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitFailure)
        .should('have.class', VISUALLY_HIDDEN);
      cy.wait('@getCartResponse');
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitFailure)
        .should('not.have.class', VISUALLY_HIDDEN);
      cy.get(`[data-product-id=${productId}]`).find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
    });
  });
});
