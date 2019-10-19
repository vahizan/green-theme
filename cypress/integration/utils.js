/* eslint-disable no-unused-expressions, func-style */
import {ENVIRONMENT} from './constants';

import credentials from '../../credentials.json';

const ENVIRONMENT_KEY = 'ENVIRONMENT';
export const href = () => {
  const env = Cypress.env(ENVIRONMENT_KEY);
  let hrefValue = '';
  switch (env) {
    case ENVIRONMENT.DEV:
      hrefValue = credentials.dev_url || '';
      break;
    default:
      hrefValue = Cypress.env('SHOPIFY_URL') || '';
      break;
  }
  return hrefValue;
};
export const themeId = () => {
  const env = Cypress.env(ENVIRONMENT_KEY);
  let theme = '';
  switch (env) {
    case ENVIRONMENT.DEV:
      theme = credentials.theme_id || '';
      break;
    default:

      theme = Cypress.env('SHOPIFY_THEME_ID') || '';
      break;
  }
  return theme;
};
