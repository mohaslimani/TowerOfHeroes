import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string[] = [];

  constructor() { }

  add(nMsg: string): void {
    this.message = [...this.message, nMsg];
  }

  clear(){
    this.message = [];
  }
}
