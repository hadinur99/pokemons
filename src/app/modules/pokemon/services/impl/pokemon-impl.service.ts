import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from '../pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonImplService implements PokemonService {

  private POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient
  ) { }
  

  public getListPokemon(numberOfPokemon: number, pageNumber: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.POKE_API_URL + '?limit=' + numberOfPokemon + '&offset=' + pageNumber)
  }

  public getDetailsPokemon(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.POKE_API_URL + pokemonId)
  }

  
}
