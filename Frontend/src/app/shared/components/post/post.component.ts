import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../core/models/Post';
import {User} from '../../../core/models/User';
import {Comment} from '../../../core/models/Comment';

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

  @Input()
  post: Post;
  user: User;
  comments: Comment[];
  likes: number;
  isLiked: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isLiked = true;
    this.likes = 3;
    this.user = {
      id: 1,
      username: 'test',
      email: 'test@gmail.com',
      password: 'randomquerty'
    };
    this.comments = [];
  }
  likePost(): void{
    // Check if the user has liked the post or not
    this.isLiked = !this.isLiked;
    console.log(this.isLiked);
  }

}
