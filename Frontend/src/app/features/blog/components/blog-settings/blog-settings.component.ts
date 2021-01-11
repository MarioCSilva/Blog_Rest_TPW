import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Blog} from "../../../../core/models/Blog";

@Component({
  selector: 'app-blog-settings',
  templateUrl: './blog-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-settings.component.css']
})
export class BlogSettingsComponent implements OnInit {

  @Input()
  blog: Blog;

  constructor() { }

  ngOnInit(): void {
  }

}
