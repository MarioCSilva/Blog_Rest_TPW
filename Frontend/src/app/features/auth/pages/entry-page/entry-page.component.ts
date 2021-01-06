import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {

  value: string;
  constructor() { }


  ngOnInit(): void {
  }

}
