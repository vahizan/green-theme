import {generateImageDataset, datasetSrc, removeImageSizeFromUrl} from '../../../src/scripts/utils/main_utils';

describe('main_utils', () => {
  describe('generateImageDataset', () => {
    it('should return urls with imageSizes', () => {
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
  });
  describe('datasetSrc', () => {
    it('should return comma separated dataset values', () => {
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
  describe('removeImageSizeFromUrl', () => {
    it('should return url without size value', () => {
      const urls = [
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_250x.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_pico.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_icon.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_thumb.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_small.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_compact.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_medium.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_large.jpg?v=1569178274',
        'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_grande.jpg?v=1569178274',
      ];
      const expectedValue = 'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227.jpg?v=1569178274';
      for (let i = 0; i < urls.length; i++) {
        expect(removeImageSizeFromUrl(urls[i])).to.equal(expectedValue);
      }
    });
    it('should return empty value if url has incorrect size', () => {
      const url = 'https://cdn.shopify.com/s/files/1/0258/8436/0792/products/product-image-968463227_250343x.jpg?v=1569178274';
      const expectedValue = '';
      expect(removeImageSizeFromUrl(url)).to.equal(expectedValue);
    });
  });
});
