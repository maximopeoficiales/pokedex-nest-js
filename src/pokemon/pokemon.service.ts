import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { isValidObjectId, Model, Types } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

export class PokemonId extends Pokemon {
  @ApiProperty(
    {
      type: "string",
    }
  )
  _id: Types.ObjectId;
}

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT');

  }

  async insertMany(data: CreatePokemonDto[]) {
    try {
      data.forEach((d) => {
        d.name = d.name.toLowerCase();
      });

      const result = await this.pokemonModel.insertMany(data);
      return result as PokemonId[];
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async create(createPokemonDto: CreatePokemonDto): Promise<PokemonId> {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();

      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<PokemonId[]> {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select("-__v");
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id,name or no "${term} not found"`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<UpdatePokemonDto> {

    const pokemon = await this.findOne(term);
    try {

      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;
  }

  async removeMany() {
    await this.pokemonModel.deleteMany({});
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException("Can't create Pokemon - Check Server logs");

  }
}
