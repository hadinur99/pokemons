import { createAction, props, union } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon';


export const PokemonActions = {

  loadPokemon: createAction('[Pokemon] Load Pokemon', props<{numberOfPokemon: number, pageNumber: number}>()),
  setPokemon: createAction('[Pokemon] Set Pokemon', props<{ pokemons: Pokemon[] }>()),
  
  loadSelectedPokemon: createAction('[Pokemon] Load Selected Pokemon', props<{ pokemonId: string }>()),
  setSelectedPokemon: createAction('[Pokemon] Set Selected Pokemon', props<{ pokemon: Pokemon }>()),
  resetSelectedPokemon: createAction('[Pokemon] Reset Selected Pokemon Id'),

}

const all = union(PokemonActions);
export type PokemonActions = typeof all;
