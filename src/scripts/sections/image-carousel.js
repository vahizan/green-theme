/**
 * Image Carousel Section Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Image Carousel template.
 *
 * @namespace image-carousel
 */

import {register} from '@shopify/theme-sections';

import {PRODUCT_ENDPOINT, imageCarouselDataset} from '../utils/constants';

const $ = require('jquery');

register('image-carousel', {
  onLoad() {
    this.handle = this.container.dataset[imageCarouselDataset.IMAGE_CAROUSEL_HANDLE] || '';
    this.getProductJson = this.getProductJson.bind(this);
    this.getProductJson();
    this.populateCarousel = this.populateCarousel.bind(this);

  },

 // onUnload() {},

  populateCarousel(responseText) {
    const response = JSON.parse(responseText);
    //console.log('response', response);
  },

  _productFetchChange(readyState, status) {
    if (readyState === XMLHttpRequest.DONE && status === 200) {
      console.log('readyState', readyState);
    }
  },
  _getProductXHR() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${PRODUCT_ENDPOINT}/${this.handle}`);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.timeout = 10000;
    xhr.onloadend = () => this.populateCarousel(xhr.responseText);
    return xhr;
  },

  getProductJson() {
    const xhr = this._getProductXHR();
    xhr.send();
    xhr.onreadystatechange = () => this._productFetchChange(xhr.readyState, xhr.status);
  },

});
