import {register} from '@shopify/theme-sections';
import {toggleVisibility} from '../utils/main_utils';
import {cartSelectors, headerSelectors, searchSelectors} from '../utils/constants';

const $ = require('jquery');

register('header', {
  // // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    this.cartModal = document.querySelector(headerSelectors.cartMenu);
    this.cartButton = document.querySelector(cartSelectors.cartButton);
    this.searchButton = document.querySelector(searchSelectors.searchButton);
    this.searchModal = document.querySelector(headerSelectors.searchMenu);
    this.cartButtonClick = this.cartButtonClick.bind(this);
    this.searchButtonClick = this.searchButtonClick.bind(this);
    this.cartButton.addEventListener('click', this.cartButtonClick);
    this.searchButton.addEventListener('click', this.searchButtonClick);
  },

  onUnload() {
    this.cartButton.removeEventListener('click', this.cartButtonClick);
    this.searchButton.removeEventListener('click', this.searchButtonClick);
    this.cartModal.destroy();
    this.searchModal.destroy();
    this.searchButton.destroy();
    this.cartButton.destroy();
  },

  cartButtonClick(event) {
    const target = event.target.closest(cartSelectors.cartButton);
    event.preventDefault();
    this._onToggleModal(target, this.cartModal);
  },

  searchButtonClick(event) {
    const target = event.target.closest(searchSelectors.searchButton);
    event.preventDefault();
    this._onToggleModal(target, this.searchModal);
  },

  _onToggleModal(targetElement, modal) {
    if (!targetElement) {
      return;
    }
    toggleVisibility($, modal);
  },

  // _privateMethod: function() {
  //   // Custom private section method
  // },
  //
  //
  // // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  // onUnload: function() {
  //   // Do something when a section instance is unloaded
  // },
  //
  // // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  // onSelect: function() {
  //   // Do something when a section instance is selected
  // },
  //
  // // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  // onDeselect: function() {
  //   // Do something when a section instance is deselected
  // },
  //
  // // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  // onBlockSelect: function() {
  //   // Do something when a section block is selected
  // },
  //
  // // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  // onBlockDeselect: function() {
  //   // Do something when a section block is deselected
  // }
});
