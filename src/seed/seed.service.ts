import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  constructor(private readonly pokemonService: PokemonService) {

  }
  async executeSeed() {
    await this.pokemonService.removeMany();
    
    const { data } = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");

    const dataFormated = data.results.map(({ name, url }) => {
      const segments = url.split("/");
      const no = +segments[segments.length - 2];
      return { name, no }
    });

    return await this.pokemonService.insertMany(dataFormated);
  }

}
