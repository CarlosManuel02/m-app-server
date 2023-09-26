import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entities";
import {Transaction} from "./entities";

@Module({
  imports: [
      TypeOrmModule.forFeature([Category, Transaction])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
