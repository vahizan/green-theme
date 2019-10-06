/* eslint-disable no-alert, no-console */
// <reference types="Cypress" />
import {href} from './utils';

describe('MenuPopover', () => {
  context('Actions', () => {
    beforeEach(() => {
      cy.visit(href());
    });
    // https://on.cypress.io/interacting-with-elements
  });
});

