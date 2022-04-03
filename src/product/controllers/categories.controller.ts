import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  async findAll() {
    return 'a';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return `${id}`;
  }

  @Post()
  async create(@Body() data: string) {
    return `${data}`;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() changes: string) {
    return `${changes}`;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return `${id}`;
  }
}
