import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product';
import { ProductDto } from './productDto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Product {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() product: ProductDto): Product {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedProduct: ProductDto): Product {
    return this.productService.update(id, updatedProduct);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Product {
    return this.productService.delete(id);
  }
}