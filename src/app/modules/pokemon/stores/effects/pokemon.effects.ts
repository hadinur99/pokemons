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

  private getSelectedPokemon(pokemon: any): Pokemon {
    const selectedPokemon: Pokemon = new Pokemon();
    selectedPokemon.id = pokemon.id;
    selectedPokemon.name = pokemon.name;
    selectedPokemon.imageUrl = pokemon.sprites.front_default;
    selectedPokemon.weight = pokemon.weight;
    selectedPokemon.height = pokemon.height;
    pokemon.types.map((data: any) => {
      selectedPokemon.types.push(data.type.name);
    })
    pokemon.moves.map((data: any) => {
      selectedPokemon.moves.push(data.move.name);
    })
    pokemon.abilities.map((data:any) => {
      selectedPokemon.abilities.push(data.ability.name);
    })
    return selectedPokemon;
  }

  loadSelectedPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadSelectedPokemon),
      switchMap((action) =>
        this.pokemonService
        .getDetailsPokemon(action.pokemonId)
        .pipe(
          map((pokemon: any) => {
            return this.getSelectedPokemon(pokemon);
          }),
          map((pokemon: Pokemon) => {
            return PokemonActions.setSelectedPokemon({ pokemon: pokemon });
          }))
        ))
    );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

}
