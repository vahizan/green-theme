/**
 * Product Card Popup Section Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product-card-popup
 */
/* eslint-disable func-style, shopify/prefer-early-return*/

import * as currency from '@shopify/theme-currency';

import {CART_ENDPOINT, headerSelectors, productCardPopupSelector, productCardSelector} from '../utils/constants';
import {
  ANIMATION_CLASSES,
  VISUALLY_HIDDEN,
} from '../utils/main_utils';

const $ = require('jquery');

const _productCardPopup = () => {
  $(headerSelectors.productPopupContainer).removeClass(VISUALLY_HIDDEN);
  $(headerSelectors.productPopupContainer).removeClass(ANIMATION_CLASSES.SLIDE_UP_FADE);
  $(headerSelectors.productPopupContainer).addClass(ANIMATION_CLASSES.SLIDE_DOWN_FADE);
};

const _cartQueryXHR = () => {
  let xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', CART_ENDPOINT.CART, true);
  return xhr;
};

const _onCartQueryStateChange = (result, readyState, status) => {
  if (readyState === XMLHttpRequest.DONE && status === 200) {
    const productPopup = document.querySelector(productCardPopupSelector.container);
    const titleElement = productPopup.querySelector(productCardSelector.title);
    const priceElement = productPopup.querySelector(productCardSelector.price);
    const imgElement = productPopup.querySelector(productCardSelector.image);
    const qtyElement = productPopup.querySelector(productCardSelector.quantity);
    const firstItem = JSON.parse(result).items[0];
    if (!firstItem) {
      return;
    }
    $(titleElement).text(firstItem.title);
    $(qtyElement).text(firstItem.quantity);
    $(priceElement).text(currency.formatMoney(firstItem.price, ''));
    $(imgElement).find('img').attr('src', firstItem.featured_image.url);
    $(imgElement).find('img').attr('alt', firstItem.featured_image.alt);
    _productCardPopup();
  }
};

export const loadLatestCartItem = () => {
  const xhr = _cartQueryXHR();
  xhr.send();
  xhr.onreadystatechange = () => _onCartQueryStateChange(xhr.response, xhr.readyState, xhr.status);
};
