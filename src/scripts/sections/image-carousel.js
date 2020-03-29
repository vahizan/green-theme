/**
 * Image Carousel Section Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Image Carousel template.
 *
 * @namespace image-carousel
 */

import {register} from '@shopify/theme-sections';

import 'lazysizes';

import {
  PRODUCT_ENDPOINT,
  imageCarouselDataset,
  LAZYLOAD_PRODUCT_IMAGE_SIZES,
} from '../utils/constants';
import {
  datasetSrc,
  convertArrayToMap,
  generateImageDataset,
  removeImageSizeFromUrl,
  removeProtocol,
  createResponsiveImg,
} from '../utils/main_utils';

const $ = require('jquery');

register('image-carousel', {
  onLoad() {
    this.handle =
      this.container.dataset[imageCarouselDataset.IMAGE_CAROUSEL_HANDLE] || '';
    this.getProductJson = this.getProductJson.bind(this);
    this.getProductJson();
    this.populateCarousel = this.populateCarousel.bind(this);
  },

  // onUnload() {},
  _removeDuplicateIds(idArray) {
    if (!idArray) {
      return [];
    }
    let idLedger = convertArrayToMap(idArray);
    return Object.keys(idLedger);
  },

  _getValidImageMetadataArray(validImageIdMap, metadataArray) {
    // eslint-disable-next-line array-callback-return
    const validMetadataArray = [];
    let metadata = {};
    for (let i = 0; i < metadataArray.length; i++) {
      metadata = metadataArray[i];
      if (!metadata || !metadata.id || !metadata.src) {
        // eslint-disable-next-line array-callback-return
        return;
      }
      if (Number.isInteger(validImageIdMap[metadata.id])) {
        // eslint-disable-next-line consistent-return
        validMetadataArray.push({
          id: metadata.id,
          src: metadata.src,
        });
      }
    }
    // eslint-disable-next-line consistent-return
    return validMetadataArray;
  },

  _createImageContainer(imageId, imageUrl) {
    const url = removeImageSizeFromUrl(imageUrl) || imageUrl;
    const srcNoProtocol = removeProtocol(url);
    const imageDataset = generateImageDataset(
      srcNoProtocol,
      LAZYLOAD_PRODUCT_IMAGE_SIZES,
    );
    const datasetSrcs = datasetSrc(imageDataset);
    const imageElement = createResponsiveImg(
      srcNoProtocol,
      datasetSrcs,
      'lazyload',
    );
    $(imageElement).attr('id', `image-block-${imageId}`);
    return imageElement;
  },

  _appendImageElementToContainer(container, imageElement) {
    $(container).append(imageElement);
  },

  _appendImageArrayToContainer(container, imageElementArray) {
    imageElementArray.forEach((imageElement) =>
      this._appendImageElementToContainer(container, imageElement),
    );
  },

  _createImageElementArray(imageDataArray) {
    return imageDataArray.map((imageData) =>
      this._createImageContainer(imageData.id, imageData.src),
    );
  },

  populateCarousel(responseText) {
    const response = JSON.parse(responseText);
    if (!(response && response.product)) {
      return;
    }
    const product = response.product;
    // get variant image id array - no duplicates
    const imageIdArray = product.variants.map((variant) => variant.image_id);
    const imageIdArrayNoDuplicates = this._removeDuplicateIds(imageIdArray);
    // get images array
    const imageDataArray = product.images;
    const imageIdMap = convertArrayToMap(imageIdArrayNoDuplicates);
    // access every image from second element to the last of the imageData array
    const validMetadataArray = this._getValidImageMetadataArray(
      imageIdMap,
      imageDataArray,
    );
    // create a lazy image object
    const imageElements = this._createImageElementArray(validMetadataArray);
    this._appendImageArrayToContainer(this.container, imageElements);
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
  },
});
