import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response';

@Injectable()
export class SeedService {


  constructor(
    private readonly http: AxiosAdapter,
    private readonly pokemonService: PokemonService) {

  }
  async executeSeed() {
    await this.pokemonService.removeMany();

    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=50");

    const dataFormated = data.results.map(({ name, url }) => {
      const segments = url.split("/");
      const no = +segments[segments.length - 2];
      return { name, no }
    });

    return await this.pokemonService.insertMany(dataFormated);
  }

}
