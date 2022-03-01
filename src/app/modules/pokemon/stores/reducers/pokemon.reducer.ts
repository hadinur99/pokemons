import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PokemonActions } from '../actions/pokemon.actions';
import { Pokemon } from '../../../../models/pokemon';

export const pokemonFeatureKey = 'pokemonList';

export interface PokemonState extends EntityState<Pokemon> {
  pokemons: Array<Pokemon> | null;
  selectedPokemon: Pokemon | null;
  catchedPokemons: Array<Pokemon> | null;
}

export const pokemonAdapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

export const pokemonInitialState: PokemonState = pokemonAdapter.getInitialState({
  pokemons: null,
  selectedPokemon: null,
  catchedPokemons: null
});

export const _pokemonReducer = createReducer(
  pokemonInitialState,
  on(
    PokemonActions.setPokemon,
    (state: PokemonState, { pokemons }) => {
      return {
        ...state,
        pokemons: [...state.pokemons || [], ...pokemons]
      }
    }
  ),
  on(
    PokemonActions.setSelectedPokemon,
    (state: PokemonState, { pokemon }) => {
      return {
        ...state,
        selectedPokemon: pokemon
      }
    }
  ),
  on(
    PokemonActions.resetSelectedPokemon,
    (state: PokemonState) => {
      return {
        ...state,
        selectedPokemon: null
      }
    }
  ),
  on(
    PokemonActions.catchedPokemons,
    (state: PokemonState, { pokemons }) => {
      return {
        ...state,
        pokemons: [...state.pokemons || [], ...pokemons]
      }  
    }
  )
);

export function pokemonReducer(state: PokemonState | undefined, action: Action) {
  return _pokemonReducer(state, action);
}
