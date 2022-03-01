import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonState } from 'src/app/modules/pokemon/stores/reducers/pokemon.reducer';
import { selectCatchedPokemons } from 'src/app/modules/pokemon/stores/selectors/pokemon.selectors';
import { PokemonActions } from 'src/app/modules/pokemon/stores/actions/pokemon.actions';

@UntilDestroy()
@Component({
  selector: 'app-my-pokemon-list',
  templateUrl: './my-pokemon-list.component.html',
  styleUrls: ['./my-pokemon-list.component.scss']
})
export class MyPokemonListComponent implements OnInit {

  pokemons!: Array<Pokemon>;
  myPokemonExist: boolean = false;

  constructor(
    private pokemonStore: Store<PokemonState>
  ) { 
    this.pokemonStore
      .pipe(
        select(selectCatchedPokemons),
        untilDestroyed(this)
      )
      .subscribe((pokemons: Array<Pokemon> | null) => {
        this.pokemons = pokemons || [];
        if(this.pokemons.length > 0){
          this.myPokemonExist = true;
        }
      })
   }

  ngOnInit(): void {
    this.loadCatchedPokemon()
  }

  public loadCatchedPokemon() {
    this.pokemonStore.dispatch(
      PokemonActions.loadCatchedPokemons({ loadCatchedPokemon: (this.pokemons) })
    )
  }

}
