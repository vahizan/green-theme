/* eslint-disable func-style */
/* these functions can be reused throughout the project */

export const VISUALLY_HIDDEN = 'visually-hidden';

export const MODAL_POSITION = {
  TOP: 'top',
  RIGHT: 'right',
  LEFT: 'left',
  BOTTOM: 'bottom',
  CENTER: 'center',
};
export const isVisible = ($, element) => !($(element).hasClass(VISUALLY_HIDDEN));
export const toggleVisibility = ($, element) => ($(element).hasClass(VISUALLY_HIDDEN) ? $(element).removeClass(VISUALLY_HIDDEN) : $(element).addClass(VISUALLY_HIDDEN));

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
