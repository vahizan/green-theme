/* eslint-disable no-alert, no-console, promise/catch-or-return, promise/always-return, no-unused-expressions */
// <reference types="Cypress" />
import {href} from '../utils';

import {VISUALLY_HIDDEN, MODAL_POSITION, isOneOf} from '../../../src/scripts/utils/main_utils';
import {
  sizes,
  desktopTabletSizes,
  mobileSizes,
  cartSelectors,
  modalSelectors,
  headerSelectors,
  clickPositions,
} from '../../../src/scripts/utils/constants';

describe('Cart Menu', () => {
  context('Cart Main', () => {
    const url = Cypress.env('SHOPIFY_URL') || href();
    beforeEach(() => {
      cy.visit(url);
    });
    // https://on.cypress.io/interacting-with-elements
    it('.click() - click on a cart should not do a page load', () => {
      cy.get(cartSelectors.cartButton).click();
      cy.location().should((location) => {
        expect(location.hash).to.be.empty;
        expect(location.pathname)
          .not
          .to
          .eq('/cart');
      });
    });

    it('contains - cart modal with the correct or default attrs', () => {
      cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).should('have.length', 1);
      cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionType).should('have.length', 1);
      /* eslint-disable promise/always-return, promise/catch-or-return*/
      cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).then(($id) => {
        if (!$id.attr(modalSelectors.modalPositionAttr)) {
          cy.get(modalSelectors.defaultModalPosition).should('have.length', 1);
        }
      });
    });

    it('contains - correct data-position atrr value', () => {
      /* eslint-disable promise/always-return, promise/catch-or-return*/
      cy.get(modalSelectors.sectionId).then(($id) => {
        expect(isOneOf(MODAL_POSITION, $id.attr(modalSelectors.modalPositionAttr))).to.be.true;
      });
    });

    describe('cart button click - desktop and tablet', () => {
      desktopTabletSizes.forEach((size) => {
        it(`cart modal appear and disappear on respective clicks '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.get(headerSelectors.cartMenu).should('have.class', VISUALLY_HIDDEN);
          cy.get(cartSelectors.cartButton).click();
          cy.get(headerSelectors.cartMenu).should('not.have.class', VISUALLY_HIDDEN);
          cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).should('be.visible');
          cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).click('left');
          cy.get(headerSelectors.cartMenu).should('have.class', VISUALLY_HIDDEN);
          cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).should('not.be.visible');
        });
      });
    });

    describe('cart button click - mobile', () => {
      mobileSizes.forEach((size) => {
        it(`cart modal appear and disappear on respective clicks '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.get(headerSelectors.cartMenu).should('have.class', VISUALLY_HIDDEN);
          cy.get(cartSelectors.cartButton).click();
          cy.get(headerSelectors.cartMenu).should('not.have.class', VISUALLY_HIDDEN);
          cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).should('be.visible');
          clickPositions.forEach((position) => {
            cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).click(position);
          });
          cy.get(headerSelectors.cartMenu).should('not.have.class', VISUALLY_HIDDEN);
          cy.get(headerSelectors.cartMenu).find(modalSelectors.closeIcon).click();
          cy.get(headerSelectors.cartMenu).find(modalSelectors.sectionId).should('not.be.visible');
        });
      });
    });

    describe('CartButton Original - All Viewports', () => {
      sizes.forEach((size) => {
        it(`button should be visible in '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.get(cartSelectors.cartButton).should('be.visible');
          cy.get(cartSelectors.cartIcon).should('have.class', VISUALLY_HIDDEN);
          cy.get(cartSelectors.cartTitle).should('have.class', VISUALLY_HIDDEN);
          cy.get(headerSelectors.cartMenu).should('have.class', VISUALLY_HIDDEN);
          cy.matchImageSnapshot(`cartClosed-${size}`);
        });
      });
    });

    describe('CartButton Modal Open - All Viewports', () => {
      sizes.forEach((size) => {
        it(`cart modal should be visible in '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.get(cartSelectors.cartButton).click();
          cy.get(cartSelectors.cartIcon).should('have.class', VISUALLY_HIDDEN);
          cy.get(cartSelectors.cartTitle).should('have.class', VISUALLY_HIDDEN);
          cy.get(headerSelectors.cartMenu).should('not.have.class', VISUALLY_HIDDEN);
          cy.matchImageSnapshot(`cartOpen-${size}`);
        });
      });
    });

    describe('Cart Logo Hidden - Desktop and Tablet devices', () => {
      desktopTabletSizes.forEach((size) => {
        it(`cart text shown '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.matchImageSnapshot(`cartTextShown-${size}`);
        });
      });
    });

    describe('Cart Logo Shown - Desktop and Tablet devices', () => {
      mobileSizes.forEach((size) => {
        it(`cart logo shown '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.matchImageSnapshot(`cartLogoShown-${size}`);
        });
      });
    });
  });
});

