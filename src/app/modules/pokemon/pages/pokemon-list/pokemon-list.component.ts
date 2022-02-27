import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pokemon } from 'src/app/models/pokemon';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Array<Pokemon> = new Array<Pokemon>();

  numberOfPokemon = 12;
  pageNumber = 0;
  numberMorePokemon = 12;

  private IMAGE_API_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listOfPokemon(this.numberOfPokemon, this.pageNumber)
  }

  public listOfPokemon(numberOfPokemon: number, pageNumber: number){
    this.pokemonService.getListPokemon(numberOfPokemon, pageNumber)
    .pipe(untilDestroyed(this))
    .subscribe((result:any) => {
      result?.results.map((data:any) => {
        let pokemonId = data.url.split(/\//)[6];
        const pokemon: Pokemon = new Pokemon();
        pokemon.id = pokemonId;
        pokemon.name = data.name;
        pokemon.imageUrl = this.IMAGE_API_URL + pokemonId + '.png';

        this.pokemons.push(pokemon);
      })
    })
  }
  
  public pokemonDetails(pokemonId: any){
    this.router.navigate(['/pokemon/', pokemonId])
  }

  public getMorePokemon() {
    this.numberOfPokemon = this.numberMorePokemon;
    this.pageNumber += this.numberMorePokemon;
    this.listOfPokemon(this.numberOfPokemon, this.pageNumber)
  }

}
