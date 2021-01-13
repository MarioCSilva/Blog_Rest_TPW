import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../core/models/Post';
import {User} from '../../../core/models/User';
import {Comment} from '../../../core/models/Comment';
import {PostService} from '../../../core/services/post.service';

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
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    console.log(this.post);
  }
  likePost(): void{
    // TODO: Handle Possible Errors
    console.log(this.post);
    this.postService.likePost(this.post.id).subscribe(data => {
      this.post.liked = !this.post.liked;
      this.post.likes = data.post.likes;
      console.log(this.post.likes);
    });
  }
}
