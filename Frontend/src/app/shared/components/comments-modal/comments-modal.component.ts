import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Comment} from '../../../core/models/Comment';
import {Post} from '../../../core/models/Post';
import {CommentService} from '../../../core/services/comment.service';

@Component({
  selector: 'app-comments-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent implements OnInit {
  @Input()
  post: Post;
  newcomment: string;

  constructor(private modalService: NgbModal, private commentService: CommentService) { }

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

  addComment(): void{
    this.commentService.postComment(this.post.id, this.newcomment).subscribe(
      data => {
        console.log(data);
        this.post.comments.push(data['comment']);
      }
    );
  }

}
