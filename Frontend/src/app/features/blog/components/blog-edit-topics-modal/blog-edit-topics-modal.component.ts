import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {Topic} from "../../../../core/models/Topic";

@Component({
  selector: 'app-blog-edit-topics-modal',
  templateUrl: './blog-edit-topics-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-topics-modal.component.css']
})
export class BlogEditTopicsModalComponent implements OnInit {

  @Input()
  blog: Blog;
  init_topics: Topic[];
  topics: Topic[];

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.getTopics();
    this.topics = this.blog.topic.slice();
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      backdropClass: 'light-blue-backdrop',
      windowClass: 'dark-modal',
      size: 'lg',
      centered: true
    });
  }

  updateBlog(): void{
    this.blog.topic = this.topics.slice();
    this.blogService.updateBlog(this.blog).subscribe(
      data => {console.log(data);
        this.modalService.dismissAll(this.template);
        },
      error => {console.log(error); }
    );
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

  clearData() {
    this.topics = this.blog.topic.slice();
  }
}
