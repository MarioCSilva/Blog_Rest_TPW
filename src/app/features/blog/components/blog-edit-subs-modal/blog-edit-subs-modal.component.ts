import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Blog} from "../../../../core/models/Blog";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogService} from "../../../../core/services/blog.service";
import {Client} from "../../../../core/models/Client";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-blog-edit-subs-modal',
  templateUrl: './blog-edit-subs-modal.component.html',
  styleUrls: ['./blog-edit-subs-modal.component.css']
})
export class BlogEditSubsModalComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  subs: Client[];

  @Input()
  blog: Blog;

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
    protected alertService: AlertService,

  ) { }

  ngOnInit(): void {
    this.subs = this.blog.subs.slice();
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }

  checkClient(client: Client) {
    for(let i=0; i<this.subs.length; i++){
      if (this.subs[i].id == client.id) {
        return true;
      }
    }
    return false;
  }

  selectClient(client, checked: boolean) {
    if (checked) {
      this.subs.push(client);
    } else {
      for (let i = this.subs.length - 1; i >= 0; --i) {
        if (this.subs[i].id == client.id) {
          this.subs.splice(i,1);
        }
      }
    }
  }

  updateBlog(): void{
    this.blog.subs = this.subs.slice();
    this.blogService.updateBlog(this.blog).subscribe(
      data => {
        this.alertService.success("Successfully edited subscribers.", this.options);
        this.modalService.dismissAll(this.template);
      },
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      }
    );
    this.blogService.getBlog(this.blog.id).subscribe(data => {
      this.blog.invites = data.invites;
      this.blog.subs = data.subs;
      this.subs = data.invites;
    });
  }

  clearData() {
    this.subs = this.blog.subs;
  }
}
