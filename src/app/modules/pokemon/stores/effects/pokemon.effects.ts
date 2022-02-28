import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonActions } from '../actions/pokemon.actions';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class PokemonEffects {

  private IMAGE_API_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  private getPokemons(pokemons: Array<Pokemon>): Array<Pokemon> {
    const pokemonList: Array<Pokemon> = new Array<Pokemon>();
    pokemons?.forEach((dataPokemon:any) => {
      let pokemonId = dataPokemon.url.split(/\//)[6];
      const pokemon: Pokemon = new Pokemon();
      pokemon.id = pokemonId;
      pokemon.name = dataPokemon.name;
      pokemon.imageUrl = this.IMAGE_API_URL + pokemonId + '.png';

      pokemonList.push(pokemon);
    })
    return pokemonList;
  }

  loadPokemons$ = createEffect(() => 
  this.actions$.pipe(
    ofType(PokemonActions.loadPokemon),
    switchMap((action) => 
      this.pokemonService
      .getListPokemon(action.numberOfPokemon, action.pageNumber)
      .pipe(
        map((pokemons: any) => {
          return this.getPokemons(pokemons.results);
        }),
        map((pokemons: Array<Pokemon>) => {
          return PokemonActions.setPokemon({ pokemons: pokemons });
        }),
        catchError((error) => {
          return of(error);
        }
      )
    )
  )));

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

}
