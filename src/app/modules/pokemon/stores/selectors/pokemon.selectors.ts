import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState, pokemonAdapter, pokemonFeatureKey } from '../reducers/pokemon.reducer';

export const SelectPokemonState = createFeatureSelector<PokemonState>(pokemonFeatureKey);


export const selectPokemon = createSelector(
    SelectPokemonState,
    (state: PokemonState) => state.pokemons
)

export const selectCurrentPokemon = createSelector(
    SelectPokemonState,
    (state: PokemonState) => state.selectedPokemon
)

export const selectCatchedPokemons = createSelector(
    SelectPokemonState,
    (state: PokemonState) => state.catchedPokemons
)