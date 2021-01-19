import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {Topic} from "../../../../core/models/Topic";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-blog-edit-topics-modal',
  templateUrl: './blog-edit-topics-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-topics-modal.component.css']
})
export class BlogEditTopicsModalComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  @Input()
  blog: Blog;
  init_topics: Topic[];
  topics: Topic[];

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
    protected alertService: AlertService,

  ) { }

  ngOnInit(): void {
    this.getTopics();
    this.topics = this.blog.topic.slice();
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }

  updateBlog(): void{
    this.blog.topic = this.topics.slice();
    this.blogService.updateBlog(this.blog).subscribe(
      data => {
        this.alertService.success("Successfully edited topics.", this.options);
        this.modalService.dismissAll(this.template);
        },
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      }
    );
  }

  getTopics(): void {
    this.blogService.getTopics().subscribe(
      data => {this.init_topics = data;},
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      }
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
