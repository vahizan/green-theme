/* eslint-disable func-style */
/* these functions can be reused throughout the project */

import {productSelectors} from './constants';

const $ = require('jquery');

export const VISUALLY_HIDDEN = 'visually-hidden';

export const ANIMATION_CLASSES = {
  SLIDE_DOWN_FADE: 'slide-down',
  SLIDE_UP_FADE: 'slide-up',
};

export const LOADING_ANIMATION_CLASSES = {
  LOADING_PULSE_ON: 'pulse-on',
  LOADING_PULSE_OFF: 'pulse-off',
  NETWORK_ERROR: 'network-error',
};

export const MODAL_POSITION = {
  TOP: 'top',
  RIGHT: 'right',
  POPUP_RIGHT: 'popup-right',
  LEFT: 'left',
  BOTTOM: 'bottom',
  CENTER: 'center',
};
const CSS_PROPS = {
  DISPLAY: 'display',
};
export const DISPLAY_VALUES = {
  BLOCK: 'block',
  NONE: 'none',
  INLINE_BLOCK: 'inline-block',
  INLINE: 'inline',
  LIST_ITEM: 'list-item',
};

const animationPulseOn = (element) => {
  if (element) {
    $(element).find(productSelectors.submitFailure).addClass(VISUALLY_HIDDEN);
    $(element).find(productSelectors.submitLoading).css('display', DISPLAY_VALUES.BLOCK);
    return;
  }
  $(productSelectors.submitFailure).addClass(VISUALLY_HIDDEN);
  $(productSelectors.submitLoading).css('display', DISPLAY_VALUES.BLOCK);
};
const animationPulseOff = (element) => {
  if (element) {
    $(element).find(productSelectors.submitFailure).addClass(VISUALLY_HIDDEN);
    $(element).find(productSelectors.submitLoading).css('display', DISPLAY_VALUES.NONE);
    return;
  }
  $(productSelectors.submitFailure).addClass(VISUALLY_HIDDEN);
  $(productSelectors.submitLoading).css('display', DISPLAY_VALUES.NONE);
};
const failureAnimation = (element) => {
  if (element) {
    $(element).find(productSelectors.submitFailure).removeClass(VISUALLY_HIDDEN);
    $(element).find(productSelectors.submitLoading).css('display', DISPLAY_VALUES.NONE);
    return;
  }
  $(productSelectors.submitFailure).removeClass(VISUALLY_HIDDEN);
  $(productSelectors.submitLoading).css('display', DISPLAY_VALUES.NONE);
};
export const loadingAnimationProcessor = (loadingAnimationClass, element) => {
  switch (loadingAnimationClass) {
    case LOADING_ANIMATION_CLASSES.LOADING_PULSE_ON:
      animationPulseOn(element);
      break;
    case LOADING_ANIMATION_CLASSES.LOADING_PULSE_OFF:
      animationPulseOff(element);
      break;
    case LOADING_ANIMATION_CLASSES.NETWORK_ERROR:
      failureAnimation(element);
      break;
  }
};
export const updateProductCountText = (cartProductCountElement, quantity) => {
  let currentValue = parseInt(cartProductCountElement.innerHTML, 10);
  if (isNaN(currentValue)) {
    return;
  }
  $(cartProductCountElement).html(currentValue + quantity);
};

export const isVisible = (element) => !($(element).hasClass(VISUALLY_HIDDEN));
export const toggleVisibility = (element) => ($(element).hasClass(VISUALLY_HIDDEN) ? $(element).removeClass(VISUALLY_HIDDEN) : $(element).addClass(VISUALLY_HIDDEN));
export const toggleDisplay = (element) => ($(element).css(CSS_PROPS.DISPLAY) === DISPLAY_VALUES.BLOCK ? $(element).css(CSS_PROPS.DISPLAY, DISPLAY_VALUES.NONE) : $(element).css(CSS_PROPS.DISPLAY, DISPLAY_VALUES.BLOCK));
export const removeProtocol = (path) => path.replace(/http(s)?:/, '');
export const removeImageSizeFromUrl = (path) => {
  const match = path.match(/(.+)_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_.@](.+)/);
  return (match && match.length >= 4) ? `${match[1]}.${match[3]}` : '';
};
export const getSizedImageUrl = (src, size) => {
  if (size === null) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    const prefix = src.split(match[0]);
    const suffix = match[0];

    return removeProtocol(`${prefix[0]}_${size}${suffix}`);
  } else {
    return null;
  }
};
export const generateImageDataset = (src, widths) => {
  let srcs = [];
  for (let i = 0; i < widths.length; i++) {
    let size = `${widths[i]}x`;
    let imgSizeSrc = `${getSizedImageUrl(src, size)} ${widths[i]}w`;
    srcs.push(imgSizeSrc);
  }
  return srcs;
};
export const datasetSrc = (datasets) => {
  let src = '';
  for (let i = 0; i < datasets.length; i++) {
    src = src.concat(datasets[i]);
    if (i !== datasets.length - 1) {
      src = src.concat(', ');
    }
  }
  return src;
};

export const isOneOf = (constantsObject, value) => {
  const keys = Object.keys(constantsObject);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (constantsObject[key] === value) {
      return true;
    }
  }
  return false;
};
