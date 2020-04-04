/* eslint-disable no-alert, no-console, promise/catch-or-return, promise/always-return, no-unused-expressions */
// <reference types="Cypress" />
import {href} from '../utils';

import {VISUALLY_HIDDEN} from '../../../src/scripts/utils/main_utils';
import {
  sizes,
  modalSelectors,
  searchSelectors,
  headerSelectors,
} from '../../../src/scripts/utils/constants';

describe('Search Menu', () => {
  context('Search Main', () => {
    const url = Cypress.env('SHOPIFY_URL') || href();
    beforeEach(() => {
      cy.visit(url);
    });
    // https://on.cypress.io/interacting-with-elements
    it('.click() - click on search icon should not do a page load', () => {
      cy.get(searchSelectors.searchButton).click();
      cy.location().should((location) => {
        expect(location.hash).to.be.empty;
        expect(location.pathname).not.to.eq('/search');
      });
    });

    describe('search button click - all devices', () => {
      sizes.forEach((size) => {
        it(`search modal appear and disappear on respective clicks '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.get(headerSelectors.searchMenu).should(
            'have.class',
            VISUALLY_HIDDEN,
          );
          cy.get(modalSelectors.sectionId).should('not.be.visible');
          cy.get(searchSelectors.searchButton).click();
          cy.get(headerSelectors.searchMenu).should(
            'not.have.class',
            VISUALLY_HIDDEN,
          );
          cy.get(modalSelectors.sectionId).should('be.visible');
          cy.get(searchSelectors.sectionId).should('be.visible');
          cy.get(headerSelectors.searchMenu)
            .find(modalSelectors.sectionId)
            .click('bottom');
          cy.get(headerSelectors.searchMenu).should(
            'have.class',
            VISUALLY_HIDDEN,
          );
          cy.get(modalSelectors.sectionId).should('not.be.visible');
          cy.get(searchSelectors.sectionId).should('not.be.visible');
        });
      });
    });
    describe('click - outside the visible search menu - all devices', () => {
      sizes.forEach((size) => {
        it(`click - close visible search modal when clicked outside '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.get(searchSelectors.searchButton).click();
          cy.get(headerSelectors.searchMenu).should(
            'not.have.class',
            VISUALLY_HIDDEN,
          );
          cy.get('body').click('center');
          cy.get(headerSelectors.searchMenu).should(
            'have.class',
            VISUALLY_HIDDEN,
          );
        });
      });
    });

    it('contains - search modal with correct attrs', () => {
      cy.get(headerSelectors.searchMenu)
        .find(modalSelectors.sectionId)
        .should('have.length', 1);
      cy.get(headerSelectors.searchMenu)
        .find(modalSelectors.sectionType)
        .should('have.length', 1);
      cy.get(modalSelectors.headerContainer).should(
        'have.class',
        VISUALLY_HIDDEN,
      );
      /* eslint-disable promise/always-return, promise/catch-or-return, shopify/prefer-early-return*/
      cy.get(headerSelectors.searchMenu)
        .find(modalSelectors.sectionId)
        .then(($id) => {
          if (!$id.attr(modalSelectors.modalPositionAttr)) {
            cy.get(modalSelectors.defaultModalPosition).should(
              'have.length',
              1,
            );
          }
        });
    });
    it('contains - search modal with correct data shown', () => {
      cy.get(headerSelectors.searchMenu)
        .find(searchSelectors.sectionId)
        .should('have.length', 1);
    });

    describe('Search Menu Style', () => {
      sizes.forEach((size) => {
        it(`search menu on '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.matchImageSnapshot(`searchBoxHidden-${size}`);
        });
      });
    });
  });
});
