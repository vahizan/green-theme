/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product-card
 */

import {register} from '@shopify/theme-sections';
// import {forceFocus} from '@shopify/theme-a11y';

import {CART_ENDPOINT, cartSelectors, productCardSelector, productSelectors} from '../utils/constants';
import {
  LOADING_ANIMATION_CLASSES,
  loadingAnimationProcessor,
  updateProductCountText,
  VISUALLY_HIDDEN,
} from '../utils/main_utils';
import {loadLatestCartItem} from './product-card-popup';

const $ = require('jquery');

const productIdSelector = 'data-product-id';
const viewProductTranslation = theme.strings.viewProduct;
const addToCartTranslation = theme.strings.addToCart;

register('product-card', {
  onLoad() {
    this.productId = ($(this.container).attr(productIdSelector));
    this.productCardButton = $(this.container).find(productSelectors.submitButton)[0];
    this.addToCartButtonUrl = $(this.productCardButton).find(productSelectors.submitButtonUrl).attr('href');
    this.onAddToCartSubmit = this.onAddToCartSubmit.bind(this);
    this.productCardButton.addEventListener('click', this.onAddToCartSubmit);
  },

  onUnload() {
    this.productCardButton.removeEventListener('click', this.onAddToCartSubmit);
  },


  _productVariantObject() {
    const title = $(this.container).find(productCardSelector.title)[0].innerText;
    const price = $(this.container).find(productCardSelector.priceNoFormat)[0].innerText;
    const imgSrc = this.container.querySelector(productCardSelector.image).getElementsByTagName('img')[0].currentSrc;

    return {
      name: title,
      // eslint-disable-next-line camelcase
      featured_image: {
        src: imgSrc,
      },
      price,
    };
  },


  // eslint-disable-next-line shopify/prefer-early-return
  _cartSubmitStateChange(readyState, status) {
    if (readyState === XMLHttpRequest.DONE && status === 200) {
      const cartProductCountElement = document.querySelector(cartSelectors.cartItemCount);
      updateProductCountText(cartProductCountElement, 1);
      loadLatestCartItem(this._productVariantObject(), 1);
    }
  },

  _onAddToCartLoadStart(button) {
    $(button).find(productSelectors.submitButtonText).addClass(VISUALLY_HIDDEN);
    loadingAnimationProcessor(LOADING_ANIMATION_CLASSES.LOADING_PULSE_ON, button);
  },
  _onAddToCartLoadEnd(event, button) {
    const status = event.currentTarget.status;
    const readyState = event.currentTarget.readyState;
    if (status !== 200 && readyState === 4) {
      $(button).find(productSelectors.submitButtonText).addClass(VISUALLY_HIDDEN);
      loadingAnimationProcessor(LOADING_ANIMATION_CLASSES.NETWORK_ERROR, button);
      return;
    }
    loadingAnimationProcessor(LOADING_ANIMATION_CLASSES.LOADING_PULSE_OFF, button);
    $(button).find(productSelectors.submitButtonText).removeClass(VISUALLY_HIDDEN);
  },

  _addToCartXHR() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', CART_ENDPOINT.ADD, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.timeout = 10000;
    xhr.onloadstart = () => this._onAddToCartLoadStart(this.productCardButton);
    xhr.onloadend = (event) => this._onAddToCartLoadEnd(event, this.productCardButton);
    return xhr;
  },

  _addToCart() {
    const cartData = {
      quantity: 1,
      id: this.productId,
    };
    const xhr = this._addToCartXHR();
    xhr.send(JSON.stringify(cartData));
    xhr.onreadystatechange = () => this._cartSubmitStateChange(xhr.readyState, xhr.status);
  },

  _openLink(url) {
    window.location.href = url;
  },

  _handleButtonClick(event) {
    const submitButtonText = event.target.querySelector(productSelectors.submitButtonText);
    switch ((submitButtonText && submitButtonText.innerText) || event.target.innerText) {
      case viewProductTranslation:
        this._openLink(this.addToCartButtonUrl);
        break;
      case addToCartTranslation:
        this._addToCart();
        break;
      default:
        break;
    }
  },

  onAddToCartSubmit(event) {
    event.preventDefault();
    if (!this.productId) {
      return;
    }
    this._handleButtonClick(event);
  },
});
