import {
  Controller
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'find_all_product' })
  findAll(@Payload() paginationDTO: PaginationDTO) {
    return this.productsService.findAll(paginationDTO);
  }

  @MessagePattern({ cmd: 'find_product' })
  findOne(@Payload() id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload() id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern({ cmd: 'validate_products' })
  validateProduct( @Payload() ids: number[] ) {
    return this.productsService.validateProducts(ids);
  }
}
