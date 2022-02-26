import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPokemonRoutingModule } from './my-pokemon-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyPokemonListComponent } from './pages/my-pokemon-list/my-pokemon-list.component';


@NgModule({
  declarations: [
    MyPokemonListComponent
  ],
  imports: [
    CommonModule,
    MyPokemonRoutingModule,
    SharedModule
  ]
})
export class MyPokemonModule { }
