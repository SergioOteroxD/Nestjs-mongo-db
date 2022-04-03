import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entity/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [CategoriesService, ProductService, BrandsService],
  controllers: [ProductController, CategoriesController, BrandsController],
})
export class ProductModule {}
