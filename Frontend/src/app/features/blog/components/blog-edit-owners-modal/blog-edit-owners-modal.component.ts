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
  owners: Client[];

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
    this.owners = this.blog.owner.slice();
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
    this.blog.owner = this.owners.slice();
    this.blogService.updateBlog(this.blog).subscribe(
      data => {console.log(data);
        this.modalService.dismissAll(this.template);
      },
      error => {
        this.blogService.getBlog(this.blog.id).subscribe(data => {
          this.blog.owner = data.owner;
          this.clearData()});
      }
    );
  }

  changeOwners(owner, checked: boolean) {
    if (checked) {
      this.owners.push(owner);
    } else {
      for (let i = this.owners.length - 1; i >= 0; --i) {
        if (this.owners[i].id == owner.id) {
          this.owners.splice(i,1);
        }
      }
    }
  }

  checkClient(owner: Client) {
    for (let i = this.owners.length - 1; i >= 0; --i) {
      if (this.owners[i].id == owner.id) {
        return true;
      }
    }
    return false;
  }

  clearData() {
    this.owners = this.blog.owner;
  }
}
