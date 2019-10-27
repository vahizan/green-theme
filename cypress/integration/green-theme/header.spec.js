/* eslint-disable no-alert, no-console, promise/catch-or-return, promise/always-return, no-unused-expressions */
// <reference types="Cypress" />
import {href} from '../utils';

import {VISUALLY_HIDDEN} from '../../../src/scripts/utils/main_utils';
import {
  desktopSizes,
  mobileSizes,
  headerSelectors,
  desktopTabletSizes,
  navigationSelectors,
} from '../../../src/scripts/utils/constants';

describe('Header', () => {
  context('Header Main', () => {
    const url = Cypress.env('SHOPIFY_URL') || href();
    beforeEach(() => {
      cy.visit(url);
    });
    // https://on.cypress.io/interacting-with-elements
    describe('Navigation Menu', () => {
      describe('navigation links', () => {
        mobileSizes.forEach((size) => {
          it(`burger menu to appear on mobile and nav opener hidden - '${size}' resolution`, () => {
            cy.setResolution(size);
            cy.get(headerSelectors.burgerMenu).should('be.visible');
            cy.get(headerSelectors.navOpenerLink).should('not.be.visible');
          });
        });
        desktopTabletSizes.forEach((size) => {
          it(`nav opener link visible and burger menu hidden - '${size}' resolution`, () => {
            cy.setResolution(size);
            cy.get(headerSelectors.burgerMenu).should('not.be.visible');
            cy.get(headerSelectors.burgerCloseMenu).should('not.be.visible');
            cy.get(headerSelectors.navOpenerLink).should('be.visible');
          });
        });
      });
      describe('Burger Menu - Mobile', () => {
        mobileSizes.forEach((size) => {
          it(`burger menu icon click - shows/hide nav menu - '${size}' resolution`, () => {
            cy.setResolution(size);
            cy.get(headerSelectors.burgerMenu).should('be.visible');
            cy.get(headerSelectors.navOpenerLink).should('not.be.visible');
            cy.get(headerSelectors.navigationMenu).should('have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.burgerMenu).click();
            cy.get(headerSelectors.burgerMenu).should('not.be.visible');
            cy.get(headerSelectors.burgerCloseMenu).should('be.visible');
            cy.get(headerSelectors.navigationMenu).should('not.have.class', VISUALLY_HIDDEN);
            cy.get(navigationSelectors.sectionId).should('be.visible');
            cy.get(headerSelectors.burgerCloseMenu).click();
            cy.get(headerSelectors.burgerMenu).should('be.visible');
            cy.get(headerSelectors.navOpenerLink).should('not.be.visible');
            cy.get(headerSelectors.navigationMenu).should('have.class', VISUALLY_HIDDEN);
          });
        });
      });

      describe('Navigation Menu - Desktop and Tablet ', () => {
        desktopTabletSizes.forEach((size) => {
          it(`click - on main parent nav link for navigation menu appear  '${size}' resolution`, () => {
            cy.setResolution(size);
            cy.get(headerSelectors.navigationContent).should('have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navOpenerLink).click();
            cy.get(headerSelectors.navigationContent).should('not.have.class', VISUALLY_HIDDEN);
          });
        });

        desktopSizes.forEach((size) => {
          it(`mouseenter - on main parent nav link for navigation menu appear'${size}' resolution`, () => {
            cy.setResolution(size);
            cy.get(headerSelectors.navigationContent).should('have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navOpenerLink).trigger('mouseenter');
            cy.get(headerSelectors.navigationContent).should('not.have.class', VISUALLY_HIDDEN);
          });

          it(`main navlink mouseleave - hide nav menu only if mouse doesnt enter it - '${size}' resolution`, () => {
            cy.setResolution(size);
            cy.get(headerSelectors.navigationContent).should('have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navOpenerLink).trigger('mouseenter');
            cy.get(headerSelectors.navigationContent).should('not.have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navigationContent).trigger('mouseenter');
            cy.get(headerSelectors.navigationContent).should('not.have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navOpenerLink).trigger('mouseenter');
            cy.get(headerSelectors.navigationContent).should('not.have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navOpenerLink).trigger('mouseleave');
            cy.get(headerSelectors.navigationContent).should('not.have.class', VISUALLY_HIDDEN);
            cy.get(headerSelectors.navigationContent).trigger('mouseleave');
            cy.get(headerSelectors.navigationContent).should('have.class', VISUALLY_HIDDEN);
          });
        });
      });
    });
  });
});

