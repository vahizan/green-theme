import {register} from '@shopify/theme-sections';
import {toggleVisibility, toggleDisplay, isVisible} from '../utils/main_utils';
import {cartSelectors, headerSelectors, searchSelectors} from '../utils/constants';

register('header', {
  // // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    this.burgerMenu = document.querySelector(headerSelectors.burgerMenu);
    this.burgerCloseMenu = document.querySelector(headerSelectors.burgerCloseMenu);
    this.navigationLink = document.querySelector(headerSelectors.navOpenerLink);
    this.navigationContent = document.querySelector(headerSelectors.navigationContent);
    this.cartModal = document.querySelector(headerSelectors.cartMenu);
    this.cartButton = document.querySelector(cartSelectors.cartButton);
    this.searchButton = document.querySelector(searchSelectors.searchButton);
    this.searchModal = document.querySelector(headerSelectors.searchMenu);
    this.cartButtonClick = this.cartButtonClick.bind(this);
    this.searchButtonClick = this.searchButtonClick.bind(this);
    this.hamburgerMenuClick = this.hamburgerMenuClick.bind(this);
    this.hamburgerCloseMenuClick = this.hamburgerCloseMenuClick.bind(this);
    this.mainNavLinkToggle = this.mainNavLinkToggle.bind(this);
    this.mouseEnterOnNavContentOpen = this.mouseEnterOnNavContentOpen.bind(this);
    this.navigationContentOnMouseLeave = this.navigationContentOnMouseLeave.bind(this);
    this.cartButton.addEventListener('click', this.cartButtonClick);
    this.searchButton.addEventListener('click', this.searchButtonClick);
    this.burgerMenu.addEventListener('click', this.hamburgerMenuClick);
    this.burgerCloseMenu.addEventListener('click', this.hamburgerCloseMenuClick);
    this.navigationLink.addEventListener('click', this.mainNavLinkToggle);
    this.navigationLink.addEventListener('mouseenter', this.mouseEnterOnNavContentOpen);
    this.navigationContent.addEventListener('mouseleave', this.navigationContentOnMouseLeave);


    this.elements = [
      {
        value: this.navigationContent,
      },
      {
        value: this.burgerMenu,
        isDisplay: true,
      },
      {
        value: this.burgerCloseMenu,
      },
    ];
  },

  onUnload() {
    this.cartButton.removeEventListener('click', this.cartButtonClick);
    this.searchButton.removeEventListener('click', this.searchButtonClick);
    this.burgerMenu.removeEventListener('click', this.hamburgerMenuClick);
    this.burgerCloseMenu.removeEventListener('click', this.hamburgerCloseMenuClick);
    this.navigationLink.removeEventListener('click', this.mainNavLinkToggle);
    this.navigationLink.removeEventListener('mouseenter', this.mouseEnterOnNavContentOpen);
    this.navigationContent.removeEventListener('mouseleave', this.mainNavLinkToggle);
    this.cartModal.destroy();
    this.searchModal.destroy();
    this.searchButton.destroy();
    this.cartButton.destroy();
    this.burgerCloseMenu.destroy();
    this.burgerMenu.destroy();
    this.navigationContent.destroy();
  },

  cartButtonClick(event) {
    this._onToggleVisibility(event, cartSelectors.cartButton, this.cartModal);
  },

  searchButtonClick(event) {
    this._onToggleVisibility(event, searchSelectors.searchButton, this.searchModal);
  },

  hamburgerMenuClick(event) {
    this._toggleVisibilityOnAll(event, headerSelectors.burgerMenu, this.elements);
  },

  hamburgerCloseMenuClick(event) {
    this._toggleVisibilityOnAll(event, headerSelectors.burgerCloseMenu, this.elements);
  },

  mainNavLinkToggle(event) {
    this._onToggleVisibility(event, headerSelectors.navOpenerLink, this.navigationContent);
  },

  mouseEnterOnNavContentOpen(event) {
    if (!isVisible(this.navigationContent)) {
      this.mainNavLinkToggle(event);
    }
  },

  navigationContentOnMouseLeave(event) {
    this._onToggleVisibility(event, headerSelectors.navigationContent, this.navigationContent);
  },

  // eslint-disable-next-line shopify/prefer-early-return
  _toggleVisibilityOnAll(event, selector, elements) {
    if (selector && elements) {
      elements.forEach((element) => {
        this._onToggleVisibility(event, selector, element.value, element.isDisplay);
      });
    }
  },

  _onToggleVisibility(event, selector, element, isDisplay) {
    const target = event.target.closest(selector);
    if (!target) {
      return;
    }
    event.preventDefault();
    if (!isDisplay) {
      toggleVisibility(element);
      return;
    }
    toggleDisplay(element);
  },
});
