import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-pokemon-list',
  templateUrl: './my-pokemon-list.component.html',
  styleUrls: ['./my-pokemon-list.component.scss']
})
export class MyPokemonListComponent implements OnInit {

  myPokemonExist: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
