import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  selectedHero? : Hero;

  heroes : Hero[] = [];

  onSelect(h: Hero) {
    this.selectedHero = h;
    this.srvMsg.add(`HerosComp says: you selected ${h.name}`);
  }

  constructor(private srvHero: HeroService, private srvMsg: MessagesService) { }

  getHeroes(): void {
    this.srvHero.getHeroes().subscribe(data => this.heroes = data);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
