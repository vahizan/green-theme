/* eslint-disable no-unused-expressions, func-style */
const credentials = require('../../credentials.json');

export const href = () => (Cypress.env('SHOPIFY_URL') ? '' : credentials.url);
export const themeId = () => (Cypress.env('SHOPIFY_THEME_ID') ? '' : credentials.theme_id);
