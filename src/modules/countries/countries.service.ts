import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { EntityManager, Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRespository: Repository<Country>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCountryDto: CreateCountryDto) {
    const country = new Country(createCountryDto);
    return this.entityManager.save(country);
  }

  findAll() {
    return this.countriesRespository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
