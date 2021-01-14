import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MainPageService} from '../../../../core/services/main-page.service';
import {Blog} from '../../../../core/models/Blog';
import {Topic} from '../../../../core/models/Topic';
import {BlogService} from '../../../../core/services/blog.service';

@Component({
  selector: 'app-blog-filters',
  templateUrl: './blog-filters.component.html',
  styleUrls: ['./blog-filters.component.css']
})
export class BlogFiltersComponent implements OnInit {

  @Input()
  blogs: Blog[];
  @Output()
  blogsChange =  new EventEmitter<Blog[]>();
  search = '';
  order: string;
  orderBy: string;
  selected_topics: Topic[];
  topics: Topic[];

  constructor(private mainService: MainPageService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getTopics().subscribe();
  }
  filter(): void{
    this.mainService.getFilteredBlogs(this.search, this.order, this.orderBy, this.selected_topics).subscribe(
      data => { this.blogs = data; this.blogsChange.emit(data); }
    );
  }

}
