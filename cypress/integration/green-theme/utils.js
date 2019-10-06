/* eslint-disable no-unused-expressions, func-style */
export const href = () => {
  const credentials = require('../../../credentials.json');
  return Cypress.env('SHOPIFY_URL') ? '' : credentials.url;
};
