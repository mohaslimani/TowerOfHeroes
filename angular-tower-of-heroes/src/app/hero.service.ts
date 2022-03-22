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

  getHero(id: number): Observable<Hero> {
    const h = HEROES.find(idd => idd.id === id)!;
    this.msg.add(`hero serv says: i fetched the id = ${h?.id}`);
    return of(h);
  }

  getHeroes() : Observable<Hero[]>{
    const h = of(HEROES);
    this.msg.add('HeroService has fetched the data');
    return h;
  }
}
