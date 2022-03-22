import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonEffects } from '../../stores/effects/pokemon.effects';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { pokemonFeatureKey, pokemonReducer } from '../../stores/reducers/pokemon.reducer';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      PokemonEffects
    ]),
    StoreModule.forFeature(
      pokemonFeatureKey,
      pokemonReducer
    ),
    InfiniteScrollModule
    
  ]
})
export class PokemonModule { }
