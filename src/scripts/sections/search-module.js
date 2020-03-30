import {register} from '@shopify/theme-sections';
import {searchSelectors} from '../utils/constants';

register('search-module', {
  // // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    this.searchBox = document.querySelector(searchSelectors.searchBox);
    this.searchButton = document.querySelector(searchSelectors.searchButton);
    this.onSearchBoxInput = this.onSearchBoxInput.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.container.addEventListener('input', this.onSearchBoxInput);
    this.container.addEventListener('click', this.onSearchButtonClick);
  },
  onUnload() {
    this.searchBox.destroy();
    this.searchButton.destroy();
    this.removeEventListener('type', this.onSearchBoxInput);
    this.removeEventListener('click', this.onSearchButtonClick);
  },
  onSearchBoxInput(event) {
    console.log(event);
  },

  onSearchButtonClick(event) {
    console.log(event);
  },
});
