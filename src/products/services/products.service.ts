import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
  FiltrarProduct,
} from './../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async findAll(param?: FiltrarProduct) {
    const filter: FilterQuery<Product> = {};
    const validateParam =
      param.eqBrand ||
      param.eqCategory ||
      param.eqPrice ||
      param.maxPrice ||
      param.minPrice ||
      param.eqName;
    //console.log(validateParam);
    if (validateParam) {
      // Price
      const validatePrice = param.eqPrice && !param.maxPrice && !param.minPrice;
      if (validatePrice) {
        filter.price = { $eq: param.eqPrice };
      }
      if (param.maxPrice && param.minPrice) {
        filter.price = { $gte: param.minPrice, $lte: param.maxPrice };
      }

      // Stock
      if (param.minStock && param.minStock) {
        filter.stock = { $gte: param.minStock, $lte: param.maxStock };
      } else {
        if (param.eqStock) {
          filter.stock = { $eq: param.eqStock };
        }
      }

      // Brand
      if (param.eqBrand) {
        //console.log(`param.eqBrand: ${param.eqBrand}`);
        const findBrand = await this.brandModel.findById(param.eqBrand);
        if (!findBrand) {
          throw new NotFoundException(`Brand # ${param.eqBrand} not found`);
        }
        filter.brand = { $eq: param.eqBrand };
      }

      //Category
      if (param.eqCategory) {
        const findCategory = await this.categoryModel.findById(
          param.eqCategory,
        );
        if (!findCategory) {
          throw new NotFoundException(
            `Category # ${param.eqCategory} not found`,
          );
        }
        filter.category = { $eq: param.eqCategory };
      }

      //Name
      if (param.eqName) {
        filter.name = { $eq: param.eqName };
      }

      const products = await this.productModel
        .find(filter)
        .skip(param.offset || 0)
        .limit(param.limit || 2)
        .populate('brand')
        .populate('category')
        .exec();

      const count = await this.productModel.find(filter).count().exec();
      return { products, count };
    }
    const products = await this.productModel
      .find()
      .skip(param.offset)
      .limit(param.limit)
      .populate('brand')
      .populate('category')
      .exec();
    const count = await this.productModel.find(filter).count().exec();
    return { products, count };
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('brand')
      .populate('category')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = new this.productModel(data);
    return await product.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    const findProduct = await this.productModel.findById(id).exec();
    if (!findProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const product = await this.productModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return product;
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id).exec();
    return true;
  }
}
