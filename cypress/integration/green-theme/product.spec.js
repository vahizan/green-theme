/* eslint-disable promise/always-return,promise/catch-or-return */
import {href} from '../utils';
import {
  cartSelectors,
  productSelectors,
  headerSelectors,
  modalSelectors,
  productCardSelector,
  CART_ENDPOINT, searchSelectors, PRODUCT_FORM_CLASS,
} from '../../../src/scripts/utils/constants';
import {ANIMATION_CLASSES, VISUALLY_HIDDEN} from '../../../src/scripts/utils/main_utils';

context('Product', () => {
  const url = Cypress.env('SHOPIFY_URL') || href();
  const productUrl = `${url}/products/2018-autumn-women-hoodie-casual-long-sleeve-hooded-pullover-sweatshirts-hooded-female-jumper-women-tracksuits-sportswear-clothes`;
  beforeEach(() => {
    cy.visit(productUrl);
  });

  describe('CTA Submit - Cart Add AJAX', () => {
    it('No page refresh', () => {
      cy.get(productSelectors.submitButton).click();
      cy.location().should((location) => {
        // eslint-disable-next-line no-unused-expressions
        expect(location.hash).to.be.empty;
        expect(location.pathname)
          .not
          .to
          .eq('/cart');
      });
    });

    it('Ajax post call fired', () => {
      // first, let's find out the userId of the first user we have
      // eslint-disable-next-line promise/catch-or-return,promise/always-return
      // Instead of writing a response inline you can
      // use a fixture file's content.
      cy.server();
      cy.fixture('cart-add-normal.json').as('addToCart');
      // when application makes an Ajax request matching "GET comments/*"
      // Cypress will intercept it and reply with object
      // from the "comment" alias
      cy.route('POST', CART_ENDPOINT.ADD, '@addToCart').as('getCartResponse');

      cy.get(productSelectors.submitButton).click();

      cy.wait('@getCartResponse').should((xhr) => {
        expect(xhr.responseBody).to.have.property('id', 794864229);
        expect(xhr.responseBody).to.have.property('title', 'Red Rain Coat - Small');
        expect(xhr.responseBody).to.have.property('product_title', 'Red Rain Coat');
        expect(xhr.responseBody).to.have.property('quantity', 1);
        expect(xhr.responseBody).to.have.property('price', 12900);
        expect(xhr.responseBody).to.have.property('line_price', 12900);
      });
    });

    it('Update Cart Quantity', () => {
      cy.server();
      cy.fixture('cart-add-normal.json').as('addToCart');
      cy.route({method: 'POST', url: CART_ENDPOINT.ADD, response: '@addToCart', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
      cy.get(productSelectors.submitButton).click();
      cy.wait('@getCartResponse').should((xhr) => {
        cy.get(cartSelectors.cartItemCount).should('have.text', (xhr.responseBody.quantity).toString());
      });
    });

    it('Add to Cart after refresh should not redirect url', () => {
      cy.reload();
      cy.server();
      cy.fixture('cart-add-normal.json').as('addToCart');
      cy.route({method: 'POST', url: CART_ENDPOINT.ADD, response: '@addToCart', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
      cy.get(productSelectors.submitButton).click();
      cy.location().should((location) => {
        // eslint-disable-next-line no-unused-expressions
        expect(location.hash).to.be.empty;
        expect(location.pathname)
          .not
          .to
          .eq('/cart');
      });
      cy.wait('@getCartResponse').should((xhr) => {
        cy.get(cartSelectors.cartItemCount).should('have.text', (xhr.responseBody.quantity).toString());
      });
    });

    it('Product Card Popup appears after adding item successfully - NO STUB', () => {
      cy.server();
      cy.route({method: 'POST', url: CART_ENDPOINT.ADD, headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
      cy.get(headerSelectors.productPopupContainer).should('have.class', VISUALLY_HIDDEN);
      cy.get(productSelectors.submitButton).click();
      cy.wait('@getCartResponse').should(() => {
        cy.get(headerSelectors.productPopupContainer).should('not.have.class', VISUALLY_HIDDEN);
        cy.get(headerSelectors.productPopupContainer).should('have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      });
    });

    it('Cart and Search Modals still function after popup modal close', () => {
      cy.server();
      cy.route({method: 'POST', url: CART_ENDPOINT.ADD, headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
      cy.get(headerSelectors.productPopupContainer).should('have.class', VISUALLY_HIDDEN);
      cy.get(productSelectors.submitButton).click();
      cy.wait('@getCartResponse');
      cy.get(headerSelectors.productPopupContainer).find(modalSelectors.closeIcon).click();
      cy.get(headerSelectors.productPopupContainer).should('have.class', VISUALLY_HIDDEN);
      cy.get(cartSelectors.cartButton).click();
      cy.get(headerSelectors.cartMenu).should('not.have.class', VISUALLY_HIDDEN);
      cy.get(headerSelectors.cartMenu).find(modalSelectors.closeIcon).click();
      cy.get(headerSelectors.cartMenu).should('have.class', VISUALLY_HIDDEN);
      cy.get(searchSelectors.searchButton).click();
      cy.get(headerSelectors.searchMenu).should('not.have.class', VISUALLY_HIDDEN);
      cy.get(headerSelectors.searchMenu).find(modalSelectors.sectionId).click('bottom');
      cy.get(headerSelectors.searchMenu).should('have.class', VISUALLY_HIDDEN);
    });

    it('Product Card Popup closes properly, slide-down class replaced with slide-up - NO STUB', () => {
      cy.clock();
      cy.server();
      cy.route({method: 'POST', url: CART_ENDPOINT.ADD, headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
      cy.get(headerSelectors.productPopupContainer).should('not.have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      cy.get(productSelectors.submitButton).click();
      cy.wait('@getCartResponse');
      cy.tick(1000);
      cy.get(headerSelectors.productPopupContainer).should('have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      cy.get(productCardSelector.modal).find(modalSelectors.closeIcon).click();
      cy.get(headerSelectors.productPopupContainer).should('not.have.class', ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      cy.get(headerSelectors.productPopupContainer).should('have.class', ANIMATION_CLASSES.SLIDE_UP_FADE);
    });

    describe('Add To Cart Button functionality', () => {
      it('show loading while adding item to cart', () => {
        cy.server();
        cy.fixture('cart-add-normal.json').as('addToCart');
        cy.route({method: 'POST', url: CART_ENDPOINT.ADD, delay: 5000, response: '@addToCart', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
        cy.get(productSelectors.submitButton).click();
        cy.get(productSelectors.submitButtonText).should('have.class', VISUALLY_HIDDEN);
        cy.get(productSelectors.submitLoading).should('be.visible');
        cy.wait('@getCartResponse');
        cy.get(productSelectors.submitLoading).should('not.be.visible');
        cy.get(productSelectors.submitButtonText).should('not.have.class', VISUALLY_HIDDEN);
      });

      it('show error message when network down', () => {
        cy.server();
        cy.fixture('cart-add-normal.json').as('addToCart');
        cy.route({method: 'POST', url: CART_ENDPOINT.ADD, delay: 5000, status: 500, response: '', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getCartResponse');
        cy.get(productSelectors.submitButton).click();
        cy.get(productSelectors.submitButtonText).should('have.class', VISUALLY_HIDDEN);
        cy.get(productSelectors.submitFailure).should('have.class', VISUALLY_HIDDEN);
        cy.wait('@getCartResponse');
        cy.get(productSelectors.submitLoading).should('not.be.visible');
        cy.get(productSelectors.submitFailure).should('not.have.class', VISUALLY_HIDDEN);
        cy.get(productSelectors.submitButtonText).should('have.class', VISUALLY_HIDDEN);
      });
    });

    describe('Populate correct data into product popup', () => {
      it('Product Popup show loading state before presenting data - NO STUB', () => {
        cy.clock();
        cy.server();
        cy.route({method: 'POST', url: CART_ENDPOINT.ADD, status: 200, headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getAddCartResponse');
        cy.get(productSelectors.submitButton).click();
        cy.wait('@getAddCartResponse');
        cy.tick(1000);
        cy.get(headerSelectors.productPopupContainer).find(productCardSelector.quantity).should('have.text', '1');
        cy.get(headerSelectors.productPopupContainer).find(productCardSelector.title).should('have.text', '2018 Autumn Women Hoodie Casual Long Sleeve Hooded Pullover Sweatshirts Hooded Female Jumper Women Tracksuits Sportswear Clothes - Pink / S');
        cy.get(headerSelectors.productPopupContainer)
          .find(productCardSelector.image)
          .find('img')
          .then((imgElement) => {
            expect(imgElement[0].alt).to.equal('2018 Autumn Women Hoodie Casual Long Sleeve Hooded Pullover Sweatshirts Hooded Female Jumper Women Tracksuits Sportswear Clothes');
            expect(imgElement[0].src).to.equal('https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304014.jpg?v=1569178286');
          });
        cy.get(headerSelectors.productPopupContainer).find(productCardSelector.price).should('not.have.text', '');
      });

      it.only('Change product variant before adding to cart - NO STUB', () => {
        cy.clock();
        cy.server();
        cy.route({method: 'POST', url: CART_ENDPOINT.ADD, status: 200, headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}).as('getAddCartResponse');
        cy.get(productSelectors.submitButton).click();
        cy.wait('@getAddCartResponse');
        cy.get(PRODUCT_FORM_CLASS)
          .find('select')
          .first()
          .select('Black');
        cy.get(PRODUCT_FORM_CLASS)
          .find('#Option2-M')
          .click();
        cy.get(productSelectors.submitButton).click();
        cy.wait('@getAddCartResponse');
        cy.get(headerSelectors.productPopupContainer).find(productCardSelector.quantity).should('have.text', '1');
        cy.get(headerSelectors.productPopupContainer).find(productCardSelector.title).should('have.text', '2018 Autumn Women Hoodie Casual Long Sleeve Hooded Pullover Sweatshirts Hooded Female Jumper Women Tracksuits Sportswear Clothes - Black / M');
        cy.tick(5000);
        cy.get(headerSelectors.productPopupContainer)
          .find(productCardSelector.image)
          .find('img')
          .then((imgElement) => {
            console.log(imgElement);
            expect(imgElement[0].alt).to.equal('2018 Autumn Women Hoodie Casual Long Sleeve Hooded Pullover Sweatshirts Hooded Female Jumper Women Tracksuits Sportswear Clothes');
            expect(imgElement[0].dataset.src).to.equal('//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013.jpg?v=1569178289');
          });
        cy.get(headerSelectors.productPopupContainer).find(productCardSelector.price).should('not.have.text', '');
      });
    });
  });
});
