import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../../core/services/post.service";
import {BlogService} from "../../../../core/services/blog.service";
import {Blog} from "../../../../core/models/Blog";
import {Topic} from "../../../../core/models/Topic";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  name: string = "";
  description: string = "";
  init_topics: Topic[] = [];
  topics: Topic[] = [];
  isPublic: boolean = true;

  options = [
    { value: true, text: 'Public' },
    { value: false, text: 'Private' },
  ];

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    this.blogService.getTopics().subscribe(
      data => {this.init_topics = data;},
      error => {console.log(error); }
    );
  }

  checkTopic(topic: Topic) {
    for(let i=0; i<this.topics.length; i++){
      if (this.topics[i].name == topic.name) {
        return true;
      }
    }
    return false;
  }

  selectTopic(topic, checked: boolean) {
    if (checked) {
      this.topics.push(topic);
    } else {
      for (let i = this.topics.length - 1; i >= 0; --i) {
        if (this.topics[i].name == topic.name) {
          this.topics.splice(i,1);
        }
      }
    }
  }

  createBlog(): void{
    let data = {
      name: this.name,
      description: this.description,
      topic: this.topics,
      isPublic: this.isPublic,
    }
    this.blogService.newBlog(data).subscribe(
      data => {
        let blog = Blog;
        blog = data.blog
        this.modalService.dismissAll(this.template);
        this.clearData();
        if (blog != undefined)
          this.router.navigate(['/blog/' + blog['id']]);
      },
      error => {console.log(error); }
    );
    this.clearData();
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'md',
      centered: true
    });
  }


  clearData(){
    this.name = "";
    this.description = "";
    this.topics = [];
  }
}
