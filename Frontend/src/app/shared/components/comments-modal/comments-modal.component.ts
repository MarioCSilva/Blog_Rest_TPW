import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Comment} from '../../../core/models/Comment';

@Component({
  selector: 'app-comments-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent implements OnInit {

  @Input()
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
      size: 'lg',
      centered: true
    });
  }
  loadComments(): Comment[] {
    console.log('hello');
    return null;
  }

}
