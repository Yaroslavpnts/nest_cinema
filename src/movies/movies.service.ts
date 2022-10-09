import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

    async getAllCategories() {
        const result = await this.categoryRepository.findAll();
        return result;
    }
}
