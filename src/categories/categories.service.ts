import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {DataSource, Repository} from "typeorm";
import {PaginationDto} from "../common/dtos/pagination.dto";
import {v4 as uuidv4, validate as isUUID} from 'uuid';


@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        private readonly datasource: DataSource,
    ) {
    }

    async create(createCategoryDto: CreateCategoryDto) {

        let category = await this.categoryRepository.findOneBy({name: createCategoryDto.name});
        if (category) {
            return {
                message: 'La categoria ya existe'
            }
        }

        createCategoryDto.id = uuidv4();
        createCategoryDto.icon = "https://picsum.photos/200/300";

        category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);

    }

    async findAll(Pagination: PaginationDto) {
        const {limit = 10, offset = 0} = Pagination;

        return this.categoryRepository.find({
            skip: offset,
            take: limit,
        });

    }

    async findOne(term: string) {
        let category: Category;
        if (isUUID(term)) {
            category = await this.categoryRepository.findOneBy({id: term});
        } else {
            const  queryBuilder = this.categoryRepository.createQueryBuilder('category');
            category = await queryBuilder.where('category.name LIKE :name', {
                name: `%${term}%`
            }).getOne();
        }
        if (!category) {
            return {
                message: 'La categoria no existe'
            }
        }
        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        // TODO: Implementar actualización de categoría


    }

    async remove(id: number) {
        // TODO: Implementar eliminación de categoría
    }


}
