import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
