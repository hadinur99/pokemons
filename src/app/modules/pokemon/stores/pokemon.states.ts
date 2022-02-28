import { Pokemon } from "src/app/models/pokemon";

export interface AppState {
    pokemonState: PokemonState;
}

export interface PokemonState {
    pokemons: Pokemon[];
}