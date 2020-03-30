import {
  CART_ENDPOINT,
  clickPositions,
  headerSelectors,
  productCardPopupSelector,
  imageCarouselDataset,
  productCardSelector,
  productSelectors,
  desktopSizes,
  mobileSizes,
  tabletSizes,
} from '../../../src/scripts/utils/constants';
import {
  ANIMATION_CLASSES,
  VISUALLY_HIDDEN,
  WEB_HIDDEN,
} from '../../../src/scripts/utils/main_utils';
import {href} from '../utils';

const DATA_PRODUCT_CARD_ID = productCardSelector.idSelector;

context('Product Card', () => {
  const url = Cypress.env('SHOPIFY_URL') || href();
  const productUrl = `${url}/collections/all`;
  const singleVariantProductId = '30272967802968';
  const multiVariantProductId = '30272972423256';
  beforeEach(() => {
    cy.visit(productUrl);
  });
  describe('Product Collection', () => {
    it('should load the right number of products in collection page', () => {
      cy.get(productCardSelector.sectionId).should('have.length', 12);
    });
  });

  describe('Product Card Details on Hover', () => {
    desktopSizes.forEach((size) => {
      it(`should hide Card CTA on '${size}'`, () => {
        cy.setResolution(size);
        cy.get(`[data-product-card-id=${multiVariantProductId}]`)
          .find('[data-cy=web-hidden]')
          .should('exist');
        cy.get(`[data-product-card-id=${singleVariantProductId}]`)
          .find('[data-cy=web-hidden]')
          .should('exist');
      });
    });
    mobileSizes.forEach((size) => {
      it(`should not hide Card CTA on '${size}'`, () => {
        cy.setResolution(size);
        cy.get(`[data-product-card-id=${multiVariantProductId}]`)
          .find(productCardSelector.ctaContainer)
          .should('be.visible');
        cy.get(`[data-product-card-id=${singleVariantProductId}]`)
          .find(productCardSelector.ctaContainer)
          .should('be.visible');
      });
    });
    tabletSizes.forEach((size) => {
      it(`should not hide Card CTA on '${size}'`, () => {
        cy.setResolution(size);
        cy.get(`[data-product-card-id=${multiVariantProductId}]`)
          .find(productCardSelector.ctaContainer)
          .should('be.visible');
        cy.get(`[data-product-card-id=${singleVariantProductId}]`)
          .find(productCardSelector.ctaContainer)
          .should('be.visible');
      });
    });
  });

  describe('Product Card Variations Info on Hover', () => {
    const soldOutProductId = 30272973865048;
    const highVariantProductId = 30272977141848;
    const variantImageIds = {
      PINK_HOODIE: 'image-block-12736992510040',
      BLACK_HOODIE: 'image-block-12736993034328',
      BURGUNDY_HOODIE: 'image-block-12736993558616',
    };

    it('should not display any variant info if product is sold out', () => {
      cy.get(`[data-product-card-id=${soldOutProductId}]`)
        .find(productCardSelector.variantColorInfo)
        .should('not.exist');
      cy.get(`[data-product-card-id=${soldOutProductId}]`)
        .find(productCardSelector.variantSizeInfo)
        .should('not.exist');
      cy.get(`[data-product-card-id=${soldOutProductId}]`)
        .find(productCardSelector.variantOtherInfo)
        .should('not.exist');
    });

    it('When on default state and product has variants, show text to indicate that size and color variants available', () => {
      // e.g. 4 colours and 5 sizes
      cy.get(`[data-product-card-id=${multiVariantProductId}]`)
        .find(productCardSelector.variantColorInfo)
        .should('be.visible');
      cy.get(`[data-product-card-id=${multiVariantProductId}]`)
        .find(productCardSelector.variantSizeInfo)
        .should('be.visible');
    });

    it('When on hover state, show different variants in a carousel, under main image', () => {
      cy.get(`[data-product-card-id=${multiVariantProductId}]`)
        .find('[data-cy=web-hidden]')
        .should('exist');

      cy.get(`[data-product-card-id=${multiVariantProductId}]`).trigger(
        'mouseover',
      );

      cy.get(`[data-product-card-id=${multiVariantProductId}]`)
        .find(productCardSelector.variantCardImageCarousel)
        .find(`img#${variantImageIds.BLACK_HOODIE}`)
        .should('be.visible');

      cy.get(`[data-product-card-id=${multiVariantProductId}]`)
        .find(productCardSelector.variantCardImageCarousel)
        .find(`img#${variantImageIds.BURGUNDY_HOODIE}`)
        .should('be.visible');

      cy.get(`[data-product-card-id=${multiVariantProductId}]`)
        .find(productCardSelector.variantCardImageCarousel)
        .find(`img#${variantImageIds.PINK_HOODIE}`)
        .should('be.visible');
    });

    it('Given on hover state on a product with more than 3 variants Then only show first 3 variants', () => {
      cy.get(`[data-product-card-id=${highVariantProductId}]`)
        .find('[data-cy=web-hidden]')
        .should('exist');

      cy.get(`[data-product-card-id=${highVariantProductId}]`).trigger(
        'mouseover',
      );
      cy.get(`[data-product-card-id=${highVariantProductId}]`)
        .find(productCardSelector.variantCardImageCarousel)
        .find('img')
        .should('have.length', 3);
    });

    describe('Product Image Carousel Details on Hover', () => {
      desktopSizes.forEach((size) => {
        it(`should hide Image Carousel on '${size}'`, () => {
          cy.setResolution(size);
          cy.get(`[data-product-card-id=${multiVariantProductId}]`)
            .find(productCardSelector.variantCardImageCarousel)
            .should('have.class', WEB_HIDDEN);
        });
      });
      mobileSizes.forEach((size) => {
        it(`should not hide Carousel on '${size}'`, () => {
          cy.setResolution(size);
          cy.get(`[data-product-card-id=${multiVariantProductId}]`)
            .find(productCardSelector.variantCardImageCarousel)
            .should('be.visible');
        });
      });
      tabletSizes.forEach((size) => {
        it(`should not hide image carousel CTA on '${size}'`, () => {
          cy.setResolution(size);
          cy.get(`[data-product-card-id=${multiVariantProductId}]`)
            .find(productCardSelector.variantCardImageCarousel)
            .should('be.visible');
        });
      });
    });
  });

  describe('Product Card Button Click', () => {
    it('Should hide CTA by default', () =>
      cy
        .get(`[${DATA_PRODUCT_CARD_ID}=${multiVariantProductId}]`)
        .find('[data-cy=web-hidden]')
        .should('exist'));

    clickPositions.forEach((position) => {
      it(`Click on button at position: '${position}' should load link`, () => {
        cy.get(`[data-product-card-id=${multiVariantProductId}]`).trigger(
          'mouseover',
        );
        cy.get(`[data-product-card-id=${multiVariantProductId}]`)
          .find(productSelectors.submitButton)
          .click();
        cy.location().should((location) => {
          // eslint-disable-next-line no-unused-expressions
          expect(location.hash).to.be.empty;
          expect(location.href).to.contain(
            `${url}/products/2018-autumn-women-hoodie-casual-long-sleeve-hooded-pullover-sweatshirts-hooded-female-jumper-women-tracksuits-sportswear-clothes`,
          );
        });
      });

      it(`Click on button at position: '${position}' should add to cart`, () => {
        cy.server();
        cy.fixture('cart-add-normal.json').as('addToCart');
        cy.route({
          method: 'POST',
          url: CART_ENDPOINT.ADD,
          delay: 5000,
          response: '@addToCart',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).as('getCartResponse');
        cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`).trigger(
          'mouseover',
        );

        cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
          .find(productSelectors.submitButton)
          .click();
        cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
          .find(productSelectors.submitButtonText)
          .should('have.class', VISUALLY_HIDDEN);
        cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
          .find(productSelectors.submitLoading)
          .should('be.visible');
        cy.wait('@getCartResponse');
        cy.get(headerSelectors.productPopupContainer).should(
          'have.class',
          ANIMATION_CLASSES.SLIDE_DOWN_FADE,
        );
        cy.get(productCardPopupSelector.container)
          .find(productCardSelector.image)
          .should('be.visible');
      });
    });
  });

  describe('Add To Cart Button AJAX functionality', () => {
    it('should NOT add to cart when single variant product sold out', () => {
      const productId = '30272973865048';
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`).trigger('mouseover');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`)
        .find(productSelectors.submitButtonText)
        .should('have.class', 'disabled');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`)
        .find(productSelectors.submitButton)
        .click({force: true});
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`)
        .find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`)
        .find(productSelectors.submitLoading)
        .should('not.be.visible');
    });

    it('should NOT have Add to Cart text for variants', () => {
      const productId = '30272977141848';
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`).trigger('mouseover');
      // eslint-disable-next-line promise/catch-or-return
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${productId}]`)
        .find(productSelectors.submitButtonText)
        // eslint-disable-next-line promise/always-return
        .then(($id) => {
          expect(Cypress.$($id)[0].innerText).to.equal('View Product');
        });
    });

    it('Clicking on "View Product" Button should load its product page', () => {
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${multiVariantProductId}]`).trigger(
        'mouseover',
      );
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${multiVariantProductId}]`)
        .find(productSelectors.submitButtonUrl)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${multiVariantProductId}]`)
        .find(productSelectors.submitButton)
        .click();
      cy.location().should((location) => {
        // eslint-disable-next-line no-unused-expressions
        expect(location.hash).to.be.empty;
        expect(location.href).to.contain(
          `${url}/products/2018-autumn-women-hoodie-casual-long-sleeve-hooded-pullover-sweatshirts-hooded-female-jumper-women-tracksuits-sportswear-clothes`,
        );
      });
    });

    it('Adding product should show popup with image', () => {
      cy.server();
      cy.fixture('cart-add-normal.json').as('addToCart');
      cy.route({
        method: 'POST',
        url: CART_ENDPOINT.ADD,
        delay: 5000,
        response: '@addToCart',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).as('getCartResponse');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButtonUrl)
        .should('not.be.visible');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`).trigger(
        'mouseover',
      );
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButton)
        .click();
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get(headerSelectors.productPopupContainer).should(
        'have.class',
        ANIMATION_CLASSES.SLIDE_DOWN_FADE,
      );
      cy.get(productCardPopupSelector.container)
        .find(productCardSelector.image)
        .should('is.visible');
    });

    it('show loading while adding item to cart', () => {
      cy.server();
      cy.fixture('cart-add-normal.json').as('addToCart');
      cy.route({
        method: 'POST',
        url: CART_ENDPOINT.ADD,
        delay: 5000,
        response: '@addToCart',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).as('getCartResponse');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`).trigger(
        'mouseover',
      );
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButton)
        .click();
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitLoading)
        .should('be.visible');
      cy.wait('@getCartResponse');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButtonText)
        .should('not.have.class', VISUALLY_HIDDEN);
    });

    it('show error message when network down', () => {
      cy.server();
      cy.fixture('cart-add-normal.json').as('addToCart');
      cy.route({
        method: 'POST',
        url: CART_ENDPOINT.ADD,
        delay: 5000,
        status: 500,
        response: '',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).as('getCartResponse');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`).trigger(
        'mouseover',
      );
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButton)
        .click();
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitFailure)
        .should('have.class', VISUALLY_HIDDEN);
      cy.wait('@getCartResponse');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitLoading)
        .should('not.be.visible');
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitFailure)
        .should('not.have.class', VISUALLY_HIDDEN);
      cy.get(`[${DATA_PRODUCT_CARD_ID}=${singleVariantProductId}]`)
        .find(productSelectors.submitButtonText)
        .should('have.class', VISUALLY_HIDDEN);
    });
  });
});
