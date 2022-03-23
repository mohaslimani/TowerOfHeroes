import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from 'src/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {
  // Remember that the component class does not subscribe to the heroes$ observable. That's the job of the AsyncPipe in the template.
  heroes$! : Observable<Hero[]>;

  private searchTerm = new Subject<string>();

  constructor(private srvHero: HeroService) {}

  search(l : string): void{
    // You can subscribe to a Subject as you would any Observable.
    // You can also push values into that Observable by calling its next(value)
    this.searchTerm.next(l);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      // With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
      // switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call
      switchMap((term: string) => this.srvHero.searchHeroes(term)),
    );
  }

}
