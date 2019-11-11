/**
 * Product Card Popup Section Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product-card-popup
 */
/* eslint-disable func-style, shopify/prefer-early-return*/

import * as currency from '@shopify/theme-currency';

import {
  CART_ENDPOINT,
  headerSelectors,
  LAZYLOAD_PRODUCT_POPUP_IMAGE_SIZES,
  productCardPopupSelector,
  productCardSelector,
} from '../utils/constants';
import {
  ANIMATION_CLASSES, datasetSrc, generateImageDataset, removeProtocol,
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
  xhr.timeout = 10000;
  return xhr;
};

const _onCartQueryStateChange = (result, quantity, readyState, status) => {
  if (readyState === XMLHttpRequest.DONE && status === 200) {
    const productPopup = document.querySelector(productCardPopupSelector.container);
    const titleElement = productPopup.querySelector(productCardSelector.title);
    const priceElement = productPopup.querySelector(productCardSelector.price);
    const imgElement = productPopup.querySelector(productCardSelector.image);
    const qtyElement = productPopup.querySelector(productCardSelector.quantity);
    if (!result) {
      return;
    }
    $(titleElement).text(result.name);
    $(qtyElement).text(quantity);
    $(priceElement).text(currency.formatMoney(result.price, ''));
    const srcNoProtocol = removeProtocol(result.featured_image.src);
    const imageDataset = generateImageDataset(result.featured_image.src, LAZYLOAD_PRODUCT_POPUP_IMAGE_SIZES);
    const datasetSrcs = datasetSrc(imageDataset);
    $(imgElement).find('img').removeClass('lazyload');
    $(imgElement).find('img').attr('data-src', srcNoProtocol);
    $(imgElement).find('img').attr('data-srcset', datasetSrcs);
    $(imgElement).find('img').addClass('lazyload');
    _productCardPopup();
  }
};

export const loadLatestCartItem = (dataset, quantity) => {
  const xhr = _cartQueryXHR();
  xhr.send();
  xhr.onreadystatechange = () => _onCartQueryStateChange(dataset, quantity, xhr.readyState, xhr.status);
};
