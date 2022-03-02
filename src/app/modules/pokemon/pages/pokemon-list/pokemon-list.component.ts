import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pokemon } from 'src/app/models/pokemon';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../stores/reducers/pokemon.reducer';
import { PokemonActions } from '../../stores/actions/pokemon.actions';
import { selectPokemon } from '../../stores/selectors/pokemon.selectors';

@UntilDestroy()
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Array<Pokemon> = new Array<Pokemon>();

  numberOfPokemon = 9;
  pageNumber = 0;
  numberMorePokemon = 9;

  constructor(
    private router: Router,
    private pokemonStore: Store<PokemonState>
  ) { 
    this.pokemonStore
      .pipe(
        select(selectPokemon),
        untilDestroyed(this)
      )
      .subscribe((pokemons: Array<Pokemon> | null) => {
        this.pokemons = pokemons || [];
      })
   }

  ngOnInit(): void {
    this.resetPokemon(); //prevent to load the first same data
    this.listOfPokemon(this.numberOfPokemon, this.pageNumber)
  }

  public listOfPokemon(numberOfPokemon: number, pageNumber: number) {
   
    this.pokemonStore.dispatch(
      PokemonActions.loadPokemon({
        numberOfPokemon, pageNumber
      }))
  }

  public resetPokemon() {
    this.pokemonStore.dispatch(PokemonActions.resetPokemon())
  }


  public pokemonDetails(pokemonId: any) {
    this.router.navigate(['/pokemon/', pokemonId])
  }

  public getMorePokemon() {
    this.numberOfPokemon = this.numberMorePokemon;
    this.pageNumber += this.numberMorePokemon;
    this.listOfPokemon(this.numberOfPokemon, this.pageNumber)
  }

}
