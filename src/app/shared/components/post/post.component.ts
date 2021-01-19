import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../core/models/Post';
import {User} from '../../../core/models/User';
import {Comment} from '../../../core/models/Comment';
import {PostService} from '../../../core/services/post.service';
import {AlertService} from "../../../_alert";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
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
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  @Input()
  post: Post;
  user: User;
  routerLinkClientVariable = "/blog/";
  constructor(private postService: PostService,
              protected alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  likePost(): void{
    this.postService.likePost(this.post.id).subscribe(data => {
      this.post.liked = !this.post.liked;
      this.post.likes = data.post.likes;
    }, error => {
      this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
    });
  }
}
