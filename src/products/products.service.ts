import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product)
      return product;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('unhandled error');
    }
  }

  async findAll() {
    console.log('heeeeeeeeeeeeeeeeey')
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({where: {id: id}});
  }

  async update(id: string, updatedInfo: UpdateProductDto) {

    let info = await this.productRepository.findOne({where: {id: id}});
    if (!info) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);}
    info = Object.assign(info, updatedInfo)
    return await this.productRepository.save(info)
  }

  async remove(id: string) {
    let info = await this.productRepository.findOne({where: {id: id}});
    if (!info) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);}
    return this.productRepository.delete(info);
  }
}
