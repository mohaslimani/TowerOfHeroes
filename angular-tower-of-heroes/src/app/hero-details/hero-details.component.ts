import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.sass']
})
export class HeroDetailsComponent implements OnInit {
  // @Input() hero?: Hero;
  hero?: Hero;

  constructor(
    private srvHero: HeroService,
    private activR: ActivatedRoute,
    private loc: Location,
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = Number(this.activR.snapshot.paramMap.get('id'));
    this.srvHero.getHero(id).subscribe(data => this.hero = data);
  }

  goBack(){
    this.loc.back();
  }

  save(): void{
    this.srvHero.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
