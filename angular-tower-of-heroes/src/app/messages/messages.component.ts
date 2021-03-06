import { Component, OnInit } from '@angular/core';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

  // this is public bc we want to bind it to the template
  constructor(public msg: MessagesService) { }

  ngOnInit(): void {
  }

}
