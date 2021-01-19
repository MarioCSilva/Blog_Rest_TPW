import {Component, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../../../core/models/Post';
import {MainPageService} from '../../../../core/services/main-page.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-post-filters',
  templateUrl: './post-filters.component.html',
  styleUrls: ['./post-filters.component.css']
})
export class PostFiltersComponent implements OnInit {

  @Input()
  posts: Post[];
  @Output()
  postsChange =  new EventEmitter<Post[]>();

  search = '';
  order: string;
  orderBy: string;

  constructor(private mainService: MainPageService) { }

  ngOnInit(): void {
  }
  filter(): void{
    this.mainService.getFilteredPosts(this.search, this.order, this.orderBy).subscribe(
      data => { this.posts = data; this.postsChange.emit(data); }
    );
  }


}
