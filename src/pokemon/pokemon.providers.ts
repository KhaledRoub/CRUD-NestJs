import { DataSource, Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';

export const pokemonProviders = [
    {
        provide: 'Pokemon_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Pokemon),
        inject: ['DATA_SOURCE'],
    },
];
