import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

import { Product } from './product';
import { v4 } from 'uuid';
import { ProductDto } from './productDto';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });
  describe('findAll', () => {
    it('debe retornar un array de productos', () => {
      const product1: Product = {
        id: '1',
        nombre: 'Product 1',
        precio: 10,
        stock: 2,
      };
      const product2: Product = {
        id: '2',
        nombre: 'Product 2',
        precio: 20,
        stock: 3,
      };
      productService.products = [product1, product2];
      expect(productService.findAll()).toEqual([product1, product2]);
    });
  });

  describe('findById', () => {
    it('Debe retornar el producto con el id ingresado', () => {
      const product1: Product = {
        id: '1',
        nombre: 'Product 1',
        precio: 10,
        stock: 2,
      };
      const product2: Product = {
        id: '2',
        nombre: 'Product 2',
        precio: 20,
        stock: 3,
      };
      productService.products = [product1, product2];
      const foundProduct = productService.findById(product1.id);
      expect(foundProduct).toBe(product1);
    });
    it('Debe retornar null', () => {
      const id = '99999';
      const product: Product = {
        id,
        nombre: 'Product 1',
        precio: 10,
        stock: 5,
      };
      productService.products = [product];

      expect(productService.findById('92')).toBe(null);
    });
  });

  describe('create', () => {
    it('Debe crear y retornar el producto agregado', () => {
      const newProduct: Product = {
        id: v4(),
        nombre: 'New Product',
        precio: 20,
        stock: 10,
      };

      const createdProduct = productService.create(newProduct);

      expect(createdProduct.id).toBeDefined();
      expect(createdProduct.nombre).toBe(newProduct.nombre);
      expect(createdProduct.precio).toBe(newProduct.precio);
      expect(createdProduct.stock).toBe(newProduct.stock);
      expect(productService.findById(createdProduct.id)).toBe(createdProduct);
    });
  });

  describe('update', () => {
    it('Debe actualizar y retornar el producto actualizado', () => {
      const product1: Product = {
        id: '1',
        nombre: 'Product 1',
        precio: 10,
        stock: 2,
      };
      const product2: Product = {
        id: '2',
        nombre: 'Product 2',
        precio: 20,
        stock: 3,
      };
      productService.products = [product1, product2];

      const updatedProductDto: ProductDto = {
        nombre: 'Updated Product',
        precio: 15,
        stock: 8,
      };

      expect(productService.update(product1.id, updatedProductDto)).toEqual({
        id: product1.id,
        nombre: updatedProductDto.nombre,
        precio: updatedProductDto.precio,
        stock: updatedProductDto.stock,
      });
      expect(productService.update('999', updatedProductDto)).toBe(null);
      
    });
  });

  describe('delete', () => {
    it('Debe borrar y retornar el producto eliminado', () => {
      const product1: Product = {
        id: '1',
        nombre: 'Product 1',
        precio: 10,
        stock: 2,
      };
      const product2: Product = {
        id: '2',
        nombre: 'Product 2',
        precio: 20,
        stock: 3,
      };
      productService.products = [product1, product2];

      expect(productService.delete(product1.id)).toBe(product1);
      expect(productService.delete('999')).toBe(null);
    });
  });
});
