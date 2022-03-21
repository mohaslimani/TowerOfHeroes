import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  selectedHero? : Hero;

  heroes : Hero[] = HEROES;

  onSelect(h: Hero) {
    this.selectedHero = h;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
