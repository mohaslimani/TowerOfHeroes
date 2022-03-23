import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from 'src/hero';
import { HEROES } from './mock-heroes';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url : string = 'api/heroes'

  constructor(
    private msg: MessagesService,
    private htttp: HttpClient
  ) { }

  private log(mssg: string){
    this.msg.add(`Log from server is saying: ${mssg}`);
  }

  getHero(id: number): Observable<Hero> {
    // const h = HEROES.find(idd => idd.id === id)!;
    this.msg.add(`hero serv says: i fetched the id = ${id}`);
    // return of(h);
    const nUrl = `${this.url}/${id}`;
    return this.htttp.get<Hero>(nUrl).pipe(
      tap(_ => console.log(`hero fetched id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHeroes() : Observable<Hero[]>{
    // const h = of(HEROES);
    const h = this.htttp.get<Hero[]>(this.url).pipe(
      tap( _ => console.log('fetched Heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
      );
      this.msg.add('HeroService has fetched the data');
    return h;
  }

  handleError<T>(arg0: string = 'operation', arg1?: T)
  {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${arg0} failed : ${error.message}`);
      return of(arg1 as T)
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateHero(hero: Hero | undefined): Observable<any> {
    return this.htttp.put(this.url, hero, this.httpOptions).pipe(
      tap(_ => console.log(`update : ${hero?.id}`)),
      catchError(this.handleError<any>('update Hero'))
    );
  }

  addHero(h: Hero): Observable<Hero>{
    return this.htttp.post<Hero>(this.url, h, this.httpOptions).pipe(
      tap((n: Hero) => console.log(`add hero: tap: id = ${h.id}`)),
      catchError(this.handleError<Hero>('add Hero: catchError'))
    );
  }

  deleteHero(id: number){
    const myUrl = `${this.url}/${id}`;
    return this.htttp.delete<Hero>(myUrl, this.httpOptions).pipe(
      tap(_ => console.log(`delete Hero : id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(name: string) : Observable<Hero[]>{
    if (!name.trim()) return of([]);
    return this.htttp.get<Hero[]>(`${this.url}/?name=${name.trim()}`).pipe(
      tap(x => x.length ? this.log(`found heroes matching "${name}"`) : this.log(`no heroes matching "${name}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes'))
    );
  }
}
