import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product';
import { ProductDto } from './productDto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('Debe retornar un array de productos', () => {
      const products: Product[] = [
        { id: '1', nombre: 'Product 1', precio: 10, stock: 2 },
        { id: '2', nombre: 'Product 2', precio: 20, stock: 3 },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(() => products);
      expect(controller.findAll()).toBe(products);
    });
  });

  describe('findById', () => {
    it('Debe retornar el producto con el id ingresado', () => {
      const id = '1';
      const product: Product = {
        id,
        nombre: 'Product 1',
        precio: 10,
        stock: 2,
      };
      jest.spyOn(service, 'findById').mockImplementation(() => product);

      expect(controller.findById(id)).toBe(product);
    });
  });

  describe('create', () => {
    it('Debe crear y retornar un nuevo producto', () => {
      const product: ProductDto = {
        nombre: 'New Product',
        precio: 20,
        stock: 2,
      };
      const createdProduct: Product = {
        id: '1',
        nombre: product.nombre,
        precio: product.precio,
        stock: product.stock,
      };
      jest.spyOn(service, 'create').mockImplementation(() => createdProduct);

      expect(controller.create(product)).toBe(createdProduct);
    });
  });

  describe('update', () => {
    it('debe actualizar y retornar el producto actualizado', () => {
      const id = '1';
      const product: ProductDto = {
        nombre: 'Updated Product',
        precio: 15,
        stock: 2,
      };
      const updatedProduct: Product = {
        id,
        nombre: product.nombre,
        precio: product.precio,
        stock: product.stock,
      };
      jest.spyOn(service, 'update').mockImplementation(() => updatedProduct);

      expect(controller.update(id, product)).toBe(updatedProduct);
    });
  });

  describe('delete', () => {
    it('Debe eliminar y retornar el producto eliminado', () => {
      const id = '1';
      const deletedProduct: Product = {
        id,
        nombre: 'Product 1',
        precio: 10,
        stock: 2,
      };
      jest.spyOn(service, 'delete').mockImplementation(() => deletedProduct);

      expect(controller.delete(id)).toBe(deletedProduct);
    });
  });
});
