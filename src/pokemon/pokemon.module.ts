import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { DatabaseModule } from './database/database.module';
import { pokemonProviders } from './pokemon.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PokemonController],
  providers: [...pokemonProviders, PokemonService],
})
export class PokemonModule { }
