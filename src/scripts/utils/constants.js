export const sizes = [
  'macbook-15',
  'macbook-13',
  'macbook-11',
  'ipad-2',
  'ipad-mini',
  'iphone-6+',
  'iphone-6',
  'iphone-5',
  'iphone-4',
  'iphone-3',
];
export const desktopTabletSizes = [
  'macbook-15',
  'macbook-13',
  'macbook-11',
  'ipad-2',
  'ipad-mini',
];
export const desktopSizes = [
  'macbook-15',
  'macbook-13',
  'macbook-11',
];
export const tabletSizes = [
  'ipad-2',
  'ipad-mini',
];
export const mobileSizes = [
  'iphone-6+',
  'iphone-6',
  'iphone-5',
  'iphone-4',
  'iphone-3',
];

export const clickPositions = [
  'top',
  'right',
  'bottom',
  'left',
  'center',
  'bottomRight',
  'bottomLeft',
  'topRight',
  'topLeft',
];

export const CART_ENDPOINT = {
  ADD: '/cart/add.js',
  CART: '/cart.js',
};

export const headerSelectors = {
  sectionId: '[data-section-id=header]',
  headerChild: '[data-header-child=header_child]',
  searchMenu: '[data-search-menu=data_search_menu]',
  cartMenu: '[data-cart-modal=cart_menu_modal]',
  burgerMenuContainer: '[data-burger-menu-container=container]',
  burgerMenu: '[data-burger-menu=burger_menu]',
  burgerCloseMenu: '[data-burger-close-menu=burger_close_menu]',
  productPopupContainer: '[data-product-cart-popup-container]',
  navigationContent: '[data-navigation-content=content]',
  navigationMenu: '[data-navigation-module=navigation_module]',
  navOpenerLink: '[data-navigation-opener-link=navigation_opener_link]',
  logoModule: '[data-shop-logo-module=shop_logo_module]',
};

export const productSelectors = {
  productPageCta: '[data-product-page-add-cta]',
  submitButton: '[data-submit-button]',
  submitLoading: '[data-button-loading-container]',
  submitSuccess: '[data-button-success-container]',
  submitFailure: '[data-button-failure-container]',
  submitButtonText: '[data-submit-button-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  priceWrapper: '[data-price-wrapper]',
  imageWrapper: '[data-product-image-wrapper]',
  productForm: '[data-product-form]',
  productCartPopup: '[data-product-cart-popup]',
  productPrice: '[data-product-price]',
  thumbnail: '[data-product-single-thumbnail]',
  thumbnailById: (id) => `[data-thumbnail-id='${id}']`,
  thumbnailActive: '[data-product-single-thumbnail][aria-current]',
};

export const navigationSelectors = {
  sectionId: '[data-section-id=navigation]',
  parentLink: '[data-parent-link=parent]',
  parentList: '[data-parent-link-list=parent_link_list]',
  childList: '[data-child-link-list=child_link_list]',
};

export const cartSelectors = {
  cartButton: '[data-cart-button=cart_button]',
  cartIcon: '[data-cart-icon=cart_icon]',
  cartTitle: '[data-cart-title=cart_title]',
  cartItemCount: '[data-cart-item-count=cart_item_count]',
};

export const productCardSelector = {
  modal: '[data-modal-product-popup]',
  title: '[data-product-title]',
  quantity: '[data-product-quantity]',
  price: '[data-product-price]',
  variant: '[data-product-variant]',
  properties: '[data-product-properties]',
  CTA: '[data-product-cta]',
  vendor: '[data-product-vendor]',
  image: '[data-product-image]',
};

export const productCardPopupSelector = {
  sectionId: '[data-section-id=product-card-popup]',
  container: '[data-product-card-popup-container]',
  loadingState: '[data-product-card-popup-state]',
};

export const searchSelectors = {
  sectionId: '[data-section-id=search_module]',
  sectionType: '[data-section-type=search]',
  searchBox: '[data-search-input]',
  searchButton: '[data-product-search-button=product_search_button]',
};

export const modalSelectors = {
  modalPositionAttr: 'data-position',
  modalContent: '[data-modal-content=modal_content]',
  headerContainer: '[data-modal-header-container=header_container]',
  dataContainer: '[data-modal-data-container=data_container]',
  defaultModalPosition: '[data-position=left]',
  closeIcon: '[data-close-icon=close_icon]',
  sectionId: '[data-section-id=modal]',
  sectionType: '[data-section-type=modal]',
};
