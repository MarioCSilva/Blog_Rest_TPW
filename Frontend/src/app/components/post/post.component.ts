import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import {Post} from '../../models/Post';
import {User} from '../../models/User';
import {Comment} from '../../models/Comment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/*
  See tutorial
  https://ng-bootstrap.github.io/#/components/modal/examples
 */

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;
  user: User;
  comments: Comment[];
  likes: number;
  isLiked: boolean;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLiked = true;
    this.likes = 3;
    this.user = {
      id: 1,
      username: 'test',
      email: 'test@gmail.com',
      password: 'randomquerty'
    };
    this.post = {
      id: 1,
      title: 'title',
      date: new Date(),
      image: null,
      text: 'text',
      likes: [],
      client: {
        user: this.user,
        id: 1,
        name: 'test',
        description: 'test description',
        profile_pic: null,
        birthdate: new Date(),
        sex: 'Male'
      },
      blog: null
    };
    this.comments = [];
  }
  likePost(): void{
    // Check if the user has liked the post or not
    this.isLiked = !this.isLiked;
    console.log(this.isLiked);
  }
  openComments(content): void{
    // Adjust css
    this.modalService.open(content, {
      backdropClass: 'light-blue-backdrop',
      windowClass: 'dark-modal',
      size: 'md',
      centered: true
    });
  }

}
