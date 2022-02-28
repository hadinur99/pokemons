import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pokemon } from 'src/app/models/pokemon';
import Swal from 'sweetalert2';

@UntilDestroy()
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemonId!: number;
  pokemon: Pokemon = new Pokemon();

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pokemonId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getDetailPokemon();
  }

  public getDetailPokemon() {
    this.pokemonService.getDetailsPokemon(this.pokemonId)
      .pipe(untilDestroyed(this))
      .subscribe((result: any) => {
        this.pokemon.id = result.id;
        this.pokemon.name = result.name;
        this.pokemon.imageUrl = result.sprites.front_default;
        this.pokemon.weight = result.weight;
        this.pokemon.height = result.height;
        result.types.map((data: any) => {
          this.pokemon.types.push(data.type.name);
        })
        result.moves.map((data: any) => {
          this.pokemon.moves.push(data.move.name);
        })
        result.abilities.map((data: any) => {
          this.pokemon.abilities.push(data.ability.name);
        })
      })
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
          console.log(result.value)
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
