import {generateImageDataset, datasetSrc} from '../../../src/scripts/utils/main_utils';

describe('main_utils', () => {
  describe('generateImageDataset', () => {
    const src = 'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013.jpg?v=1569178289';
    const widths = [180, 360, 540, 640];
    const expectedValue = [
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_180x.jpg?v=1569178289 180w',
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_360x.jpg?v=1569178289 360w',
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_540x.jpg?v=1569178289 540w',
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_640x.jpg?v=1569178289 640w',
    ];
    expect(generateImageDataset(src, widths)).to.deep.equals(expectedValue);
  });
  describe('datasetSrc', () => {
    const datasets = [
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_180x.jpg?v=1569178289 180w',
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_360x.jpg?v=1569178289 360w',
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_540x.jpg?v=1569178289 540w',
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_640x.jpg?v=1569178289 640w',
    ];
    const expectedValue = '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_180x.jpg?v=1569178289 180w, ' +
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_360x.jpg?v=1569178289 360w, ' +
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_540x.jpg?v=1569178289 540w, ' +
      '//cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-851304013_640x.jpg?v=1569178289 640w';
    expect(datasetSrc(datasets)).to.equal(expectedValue);
  });
});
