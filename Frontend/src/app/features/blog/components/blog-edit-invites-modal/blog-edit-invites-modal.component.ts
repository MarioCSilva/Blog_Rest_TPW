import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Client} from "../../../../core/models/Client";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-blog-edit-invites-modal',
  templateUrl: './blog-edit-invites-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-invites-modal.component.css']
})
export class BlogEditInvitesModalComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  invites: Client[] = [];

  @Input()
  blog: Blog;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
    protected alertService: AlertService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void { }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }


  updateBlog(): void {
    this.blog.invites = this.invites.slice();
    this.blogService.updateBlog(this.blog).subscribe(
      data => {
        this.alertService.success("Successfully updated the invites.", this.options);
        this.modalService.dismissAll(this.template);
      },
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      }
    );
    this.blogService.getBlog(this.blog.id).subscribe(data => {
      this.blog.invites = data.invites;
      this.blog.subs = data.subs;
      this.clearData();
    });
  }


  changeClients(client, checked: boolean) {
    if (checked) {
      this.invites.push(client);
    } else {
      for (let i = this.invites.length - 1; i >= 0; --i) {
        if (this.invites[i].id == client.id) {
          this.invites.splice(i, 1);
        }
      }
    }
  }

  checkClient(client: Client) {
    for (let i = this.invites.length - 1; i >= 0; --i) {
      if (this.invites[i].id == client.id) {
        return true;
      }
    }
    return false;
  }

  clearData() {
    this.invites = this.blog.invites;
  }

}
