import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Comment} from '../../../models/Comment';

@Component({
  selector: 'app-comments-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent implements OnInit {

  comments: Comment[];
  constructor(private modalService: NgbModal) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      backdropClass: 'light-blue-backdrop',
      windowClass: 'dark-modal',
      size: 'md',
      centered: true
    });
  }
  loadComments(): Comment[] {
    console.log('hello');
    return null;
  }

}
