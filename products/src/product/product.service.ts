import { Injectable } from '@nestjs/common';
import { Product } from './product';
import { v4 } from 'uuid';
import { ProductDto } from './productDto';
@Injectable()
export class ProductService {
  products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product {
    let product = this.products.find((product) => product.id == id);
    if (product != undefined) {
      return product;
    } else {
      return null;
    }
  }

  create(product: ProductDto): Product {
    const newProduct = new Product(
      v4(),
      product.nombre,
      product.precio,
      product.stock,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updatedProduct: ProductDto): Product {
    const product = this.findById(id);
    if (product != null) {
      const updateProduct = Object.assign(product, updatedProduct);
      this.products = this.products.map((product) =>
        product.id == id ? updateProduct : product,
      );
      return updateProduct;
    } else {
      return null;
    }
  }

  delete(id: string): Product {
    const index = this.products.findIndex((product) => product.id == id);
    if (index != -1) {
     return this.products.splice(index, 1)[0];
    } else {
      return null;
    }
  }
}
