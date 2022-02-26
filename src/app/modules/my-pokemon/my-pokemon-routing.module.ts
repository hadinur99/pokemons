import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPokemonListComponent } from './pages/my-pokemon-list/my-pokemon-list.component';

const routes: Routes = [
  {
    path: '',
    component: MyPokemonListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPokemonRoutingModule { }
