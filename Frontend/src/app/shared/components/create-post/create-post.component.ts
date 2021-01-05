import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  title: string;
  content: string;

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(private modalService: NgbModal) { }


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

  createPost(): void{
    console.log('Post created');
  }
}
