import { Injectable, Inject } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
@Injectable()
export class PokemonService {
  constructor(
    @Inject('Pokemon_REPOSITORY')
    private pokemonRepository: Repository<Pokemon>,
  ) { }

  create(createPokemonDto: CreatePokemonDto) {
    const newPokemon = this.pokemonRepository.create(createPokemonDto);
    this.pokemonRepository.save(newPokemon);
    return 'This action adds a new pokemon';
  }

  findAll() {
    const pokemons = this.pokemonRepository.find();
    return pokemons;
  }

  findOne(id: number) {
    const pokemons = this.pokemonRepository.findOneBy({ id });
    return pokemons;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    const existingPokemon = await this.pokemonRepository.findOneBy({ id: id })
    if (!existingPokemon)
      return 'Pokemon not found';
    existingPokemon.name = updatePokemonDto.name
    existingPokemon.type = updatePokemonDto.type
    const updatedPokemon = await this.pokemonRepository.save(existingPokemon)
    return `This action updates a #${id} pokemon`;
  }

  async remove(id: number) {
    const pokemonToDelete = await this.pokemonRepository.findOneBy({ id });
    if (!pokemonToDelete)
      return 'Pokemon not found';
    const deletedPokemon = await this.pokemonRepository.delete(id);
    return `This action removes a #${id} pokemon`;
  }

  async evolutionAhead(id: number) {
    const pokemon = await this.pokemonRepository.findOneBy({ id });
    if (!pokemon)
      return 'Pokemon not found';
    pokemon.evlutionStep += 1
    await this.pokemonRepository.save(pokemon)
    return `Evolution ahead for ID: ${id}`;

  }
}
