import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {PaginationDto} from "../common/dtos/pagination.dto";

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.transactionsService.findAll(pagination);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.transactionsService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }

    @Get('user/:id')
    findByUser(@Param('id') id: string) {
        return this.transactionsService.getTransactionsByUser(id);
    }

    @Get('account/:id')
    findByAccount(@Param('id') id: string) {
        return this.transactionsService.getTransactionsByAccount(id);
    }
}
