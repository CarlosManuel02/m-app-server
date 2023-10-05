import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities";
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
        // createCategoryDto.icon = "https://picsum.photos/200/300";

        category = this.categoryRepository.create(createCategoryDto);
        return {
            data: await this.categoryRepository.save(category),
            message: 'Category created successfully'
        }

    }

    async findAll(Pagination: PaginationDto, user: any) {
        const { limit = 10, offset = 0 } = Pagination;

        // Utiliza la función "find" para buscar registros en la base de datos
        const categories = await this.categoryRepository.findBy({
            userId: user.userId
        })


        return {
            data: categories,
            count: categories.length
        };
    }


    async findOne(term: string) {
        let category: Category;
        if (isUUID(term)) {
            category = await this.categoryRepository.findOneBy({id: term});
        } else {
            const queryBuilder = this.categoryRepository.createQueryBuilder('category');
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

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        // TODO: Implementar actualización de categoría
        const category = await this.categoryRepository.preload({
            id: id,
            ...updateCategoryDto
        });
        if (!category) throw new NotFoundException(`La categoria con id ${id} no existe`);

        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        await queryRunner.manager.save(category);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return category;
    }

    async remove(id: string) {
        // TODO: Implementar eliminación de categoría
        const category = await this.findOne(id);
        if (!category) throw new NotFoundException(`La categoria con id ${id} no existe`);

        try {
            await this.categoryRepository.delete(id);
            return {
                message: 'La categoria ha sido eliminada'
            }
        } catch (error) {
            return {
                message: 'La categoria no ha podido ser eliminada'
            }
        }
    }


}
