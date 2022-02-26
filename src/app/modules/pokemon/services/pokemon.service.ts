import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PokemonImplService } from './impl/pokemon-impl.service';
import { Pokemon } from '../../../models/pokemon';

@Injectable({
  providedIn: 'root',
  useClass: PokemonImplService
})
export abstract class PokemonService {

  constructor() { }

  public abstract getListPokemon(numberOfPokemon: number, pageNumber: number): Observable<Pokemon>;

  public abstract getDetailsPokemon(pokemonId: number): Observable<Pokemon>;



}
