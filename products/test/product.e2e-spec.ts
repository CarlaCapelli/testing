import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductDto } from '../src/product/productDto';
import { Product } from '../src/product/product';
import { ProductService } from '../src/product/product.service';

describe('ProductController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  describe('/products', () => {
    it('GET /products debe retornar el array de productos', () => {
      const mockProducts: Product[] = [
        new Product('1', 'Producto 1', 10, 5),
        new Product('2', 'Producto 2', 15, 3),
      ];
      const productService = app.get<ProductService>(ProductService);
      productService.products= mockProducts;
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual(mockProducts);
        })
    });

    it('POST /products debe crear un nuevo producto', () => {
      const product: ProductDto = {
        nombre: 'Product 1',
        precio: 10,
        stock: 100,
      };

      return request(app.getHttpServer())
        .post('/products')
        .send(product)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.nombre).toBe(product.nombre);
          expect(res.body.precio).toBe(product.precio);
          expect(res.body.stock).toBe(product.stock);
        });
    });

    it('GET /products/:id debe retornar el producto', async () => {
      const product: ProductDto = {
        nombre: 'Product 1',
        precio: 10,
        stock: 100,
      };

      const createdProduct = await request(app.getHttpServer())
        .post('/products')
        .send(product)
        .expect(201);

      const productId = createdProduct.body.id;

      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', productId);
          expect(res.body.nombre).toBe(product.nombre);
          expect(res.body.precio).toBe(product.precio);
          expect(res.body.stock).toBe(product.stock);
        });
    });

    it('PUT /products/:id debe actualizar el producto ', async () => {
      const product: ProductDto = {
        nombre: 'Product',
        precio: 10,
        stock: 100,
      };

      const createdProduct = await request(app.getHttpServer())
        .post('/products')
        .send(product)
        .expect(201);

      const productId = createdProduct.body.id;

      const updatedProduct: ProductDto = {
        nombre: 'Updated Product',
        precio: 10,
        stock: 100,
      };

      return request(app.getHttpServer())
        .put(`/products/${productId}`)
        .send(updatedProduct)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', productId);
          expect(res.body.nombre).toBe(updatedProduct.nombre);
          expect(res.body.precio).toBe(updatedProduct.precio);
          expect(res.body.stock).toBe(updatedProduct.stock);
        });
    });

    it('DELETE /products/:id debe eliminar el producto ', async () => {
      const product: ProductDto = {
        nombre: 'Product',
        precio: 10,
        stock: 100,
      };

      const createdProduct = await request(app.getHttpServer())
        .post('/products')
        .send(product)
        .expect(201);

      const productId = createdProduct.body.id;

      return request(app.getHttpServer())
        .delete(`/products/${productId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', productId);
          expect(res.body.nombre).toBe(product.nombre);
          expect(res.body.precio).toBe(product.precio);
          expect(res.body.stock).toBe(product.stock);
        });
    });
  });
});
