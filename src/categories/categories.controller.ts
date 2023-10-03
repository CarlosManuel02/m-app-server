import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {PaginationDto} from "../common/dtos/pagination.dto";

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post("/new")
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('/all/:userId')
  findAll(@Query()  pagination: PaginationDto, @Param() userId: string) {
    return this.categoriesService.findAll(pagination, userId);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoriesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
