import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Hero } from 'src/hero';
import { HEROES } from './mock-heroes';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private msg: MessagesService) { }

  getHeroes() : Observable<Hero[]>{
    const h = of(HEROES);
    this.msg.add('HeroService has fetched the data');
    return h;
  }
}
