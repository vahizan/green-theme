/* eslint-disable no-alert, no-console, promise/catch-or-return, promise/always-return, no-unused-expressions */
// <reference types="Cypress" />
import {href} from '../utils';

import {sizes} from '../../../src/scripts/utils/constants';

describe('Navigation Menu', () => {
  context('Navigation Main', () => {
    const url = Cypress.env('SHOPIFY_URL') || href();
    beforeEach(() => {
      cy.visit(url);
    });

    // https://on.cypress.io/interacting-with-elements
    describe('Navigation Menu Style', () => {
      sizes.forEach((size) => {
        it(`Navigation menu on '${size}' resolution`, () => {
          cy.setResolution(size);
          cy.matchImageSnapshot(`navigationMenu-${size}`);
        });
      });
    });
  });
});
