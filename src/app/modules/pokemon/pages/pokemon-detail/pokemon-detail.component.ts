import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pokemon } from 'src/app/models/pokemon';
import Swal from 'sweetalert2';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../../../stores/reducers/pokemon.reducer';
import { PokemonActions } from '../../../../stores/actions/pokemon.actions';
import { selectCurrentPokemon } from '../../../../stores/selectors/pokemon.selectors';

@UntilDestroy()
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemonId!: number;
  pokemon: Pokemon = new Pokemon();
  loadData: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute,
    private pokemonStore: Store<PokemonState>
  ) {
    this.pokemonId = this.route.snapshot.params.id;

    this.pokemonStore
      .pipe(
        select(selectCurrentPokemon),
        untilDestroyed(this)
      )
      .subscribe((pokemon: Pokemon | null) => {
        if(pokemon) { this.loadData = true; this.pokemon = pokemon || new Pokemon(); }
        // this.pokemon = pokemon || new Pokemon();
      })
  }

  ngOnInit(): void {
    this.getDetailPokemon();
  }

  public getDetailPokemon() {
    
    this.pokemonStore.dispatch(
      PokemonActions.loadSelectedPokemon({
        pokemonId: this.pokemonId
      })
    )

  }

  public catchPokemon() {
    let prob = (Math.random() > 0.5) ? true : false;
    if (prob === true) {
      Swal.fire({
        title: 'You caught the pokemon!',
        icon: 'success',
      }).then(() => {
        Swal.fire({
          title: 'Give the pokemon a nickname',
          input: 'text',
        }).then((result) => {

          this.pokemon.nickName = result.value; //fixed assign name
          
          this.pokemonStore.dispatch(
            PokemonActions.setCatchedPokemons({
              setCatchedPokemons: [this.pokemon]
            })
          )
          this.router.navigate(['/my-pokemon'])
        })
      })
    } else {
      Swal.fire({
        title: 'You missed the pokemon!',
        icon: 'error'
      })
    }
  }

}
