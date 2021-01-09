import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../../../core/models/Blog";

@Component({
  selector: 'app-blog-settings',
  templateUrl: './blog-settings.component.html',
  styleUrls: ['./blog-settings.component.css']
})
export class BlogSettingsComponent implements OnInit {

  @Input()
  blog: Blog;
  panelOpenState: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
