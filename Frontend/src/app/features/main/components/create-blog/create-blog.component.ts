import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../../core/services/post.service";
import {BlogService} from "../../../../core/services/blog.service";
import {Blog} from "../../../../core/models/Blog";
import {Topic} from "../../../../core/models/Topic";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  optionsAlert = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  name: string = "";
  description: string = "";
  init_topics: Topic[] = [];
  topics: Topic[] = [];
  isPublic: boolean = true;
  pic_file: File;

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
    protected alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    this.blogService.getTopics().subscribe(
      data => {this.init_topics = data;}
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
      blog_pic: this.pic_file
    }
    this.blogService.newBlog(data, this.pic_file).subscribe(
      data => {
        let blog = Blog;
        blog = data.blog
        this.modalService.dismissAll(this.template);
        this.clearData();
        this.alertService.success("Successfully created a new blog.", this.optionsAlert);
        if (blog != undefined)
          this.router.navigate(['/blog/' + blog['id']]);
      },
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.optionsAlert);
      }
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

  file(event){
    const files = event.target.files;
    this.pic_file = files[0];
  }


  clearData(){
    this.name = "";
    this.description = "";
    this.topics = [];
  }
}
