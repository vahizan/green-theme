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

const animationPulseOn = () => {
  $(productSelectors.submitFailure).addClass(VISUALLY_HIDDEN);
  $(productSelectors.submitLoading).css('display', DISPLAY_VALUES.BLOCK);
};
const animationPulseOff = () => {
  $(productSelectors.submitFailure).addClass(VISUALLY_HIDDEN);
  $(productSelectors.submitLoading).css('display', DISPLAY_VALUES.NONE);
};
const failureAnimation = () => {
  $(productSelectors.submitFailure).removeClass(VISUALLY_HIDDEN);
  $(productSelectors.submitLoading).css('display', DISPLAY_VALUES.NONE);
};
export const loadingAnimationProcessor = (loadingAnimationClass) => {
  switch (loadingAnimationClass) {
    case LOADING_ANIMATION_CLASSES.LOADING_PULSE_ON:
      animationPulseOn();
      break;
    case LOADING_ANIMATION_CLASSES.LOADING_PULSE_OFF:
      animationPulseOff();
      break;
    case LOADING_ANIMATION_CLASSES.NETWORK_ERROR:
      failureAnimation();
      break;
  }
};

export const isVisible = (element) => !($(element).hasClass(VISUALLY_HIDDEN));
export const toggleVisibility = (element) => ($(element).hasClass(VISUALLY_HIDDEN) ? $(element).removeClass(VISUALLY_HIDDEN) : $(element).addClass(VISUALLY_HIDDEN));
export const toggleDisplay = (element) => ($(element).css(CSS_PROPS.DISPLAY) === DISPLAY_VALUES.BLOCK ? $(element).css(CSS_PROPS.DISPLAY, DISPLAY_VALUES.NONE) : $(element).css(CSS_PROPS.DISPLAY, DISPLAY_VALUES.BLOCK));

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
