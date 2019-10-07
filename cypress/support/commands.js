// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
import {themeId} from '../integration/utils';

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const themeID = themeId();
  const fullPath = `${url}?preview_theme_id=${themeID}`;
  // originalFn is the existing `visit` command that you need to call
  // and it will receive whatever you pass in here.
  return originalFn(fullPath, options);
});
