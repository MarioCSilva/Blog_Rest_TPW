import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-blog-edit-invites-modal',
  templateUrl: './blog-edit-invites-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-invites-modal.component.css']
})
export class BlogEditInvitesModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
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

}
