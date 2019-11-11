import {register} from '@shopify/theme-sections';
import {ANIMATION_CLASSES, toggleVisibility} from '../utils/main_utils';
import {modalSelectors} from '../utils/constants';

const $ = require('jquery');

register('modal', {
  // // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    this.modal = document.querySelector(modalSelectors.sectionId);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.container.addEventListener('click', this.onCloseModal);
  },
  onUnload() {
    this.modal.destroy();
    this.removeEventListener('click', this.onCloseModal);
  },
  onCloseModal(event) {
    const closeIcon = event.target.closest(modalSelectors.closeIcon);
    const modalContent = event.target.closest(modalSelectors.modalContent);
    if (!closeIcon && modalContent) {
      return;
    }
    event.preventDefault();
    if ($(this.container.parentNode).hasClass(ANIMATION_CLASSES.SLIDE_DOWN_FADE)) {
      $(this.container.parentNode).removeClass(ANIMATION_CLASSES.SLIDE_DOWN_FADE);
      $(this.container.parentNode).addClass(ANIMATION_CLASSES.SLIDE_UP_FADE);
    } else if ($(this.container.parentNode).hasClass(ANIMATION_CLASSES.SLIDE_UP_FADE)) {
      $(this.container.parentNode).removeClass(ANIMATION_CLASSES.SLIDE_UP_FADE);
      $(this.container.parentNode).removeClass(ANIMATION_CLASSES.SLIDE_DOWN_FADE);
    }
    toggleVisibility(this.container.parentNode);
  },

});
