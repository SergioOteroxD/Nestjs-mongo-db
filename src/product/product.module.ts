import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';

@Module({
  providers: [CategoriesService, ProductService, BrandsService],
  controllers: [ProductController, CategoriesController, BrandsController],
})
export class ProductModule {}
