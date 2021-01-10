import { Component, OnInit } from '@angular/core';
import {Blog} from '../../../../core/models/Blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  blog: Blog;

  constructor() { }

  ngOnInit(): void {
  }

}