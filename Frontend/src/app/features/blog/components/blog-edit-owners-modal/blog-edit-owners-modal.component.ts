import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {Client} from "../../../../core/models/Client";

@Component({
  selector: 'app-blog-edit-owners-modal',
  templateUrl: './blog-edit-owners-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-owners-modal.component.css']
})
export class BlogEditOwnersModalComponent implements OnInit {

  @Input()
  blog: Blog;
  owners: string[] = [];
  new_owner: string = "";

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
    for (let i = this.blog.owner.length - 1; i >= 0; --i) {
      this.owners.push(this.blog.owner[i].user.username);
    }
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }

  updateBlog(): void{

    this.blogService.updateBlog(this.blog, this.owners).subscribe(
      data => {
        this.blogService.getBlog(this.blog.id).subscribe(data => {
          this.blog.owner = data.owner;
          this.owners = [];
          this.clearData()
        });
        this.modalService.dismissAll(this.template);
      },
      error => { console.log(error)});
    this.clearData()
  }

  changeOwners(owner, checked: boolean) {
    if (checked) {
      this.owners.push(owner);
    } else {
      for (let i = this.owners.length - 1; i >= 0; --i) {
        if (this.owners[i] == owner) {
          this.owners.splice(i,1);
        }
      }
    }
  }

  addOwner($event, owner: string) {
    $event.preventDefault();
    this.owners.push(owner);
    this.new_owner = "";
  }


  checkClient(owner: string) {
    for (let i = this.owners.length - 1; i >= 0; --i) {
      if (this.owners[i] == owner) {
        return true;
      }
    }
    return false;
  }

  clearData() {
    this.new_owner = "";
    this.owners = [];
    for (let i = this.blog.owner.length - 1; i >= 0; --i) {
      this.owners.push(this.blog.owner[i].user.username);
    }
  }
}
