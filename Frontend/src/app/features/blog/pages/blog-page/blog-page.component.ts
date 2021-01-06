import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Blog} from "../../../../core/models/Blog";
import {Client} from "../../../../core/models/Client";
import {User} from "../../../../core/models/User";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  blog: Blog;
  owner: Client[];
  subs: Client[];
  user: User[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.user = {
    //   username: "olasounovoaqui40",
    //   email: "qqlcoisa40@gmail.com"
    // }
    // this.owner = [{
    //   id: 17,
    //   name: "joaozinho",
    //   "user_id": 31,
    //   "description": "",
    //   "birthdate": null,
    //   "sex": null,
    //   "user": this.user,
    // }]
    // this.blog = {
    //   name: "olasounovoaqui40",
    //   owner: [
    //     id: 17,
    //     name: "joaozinho",
    //     "user_id": 31,
    //     "description": "",
    //     "birthdate": null,
    //     "sex": null,
    //     "user": {
    //       "username": "olasounovoaqui40",
    //       "email": "qqlcoisa40@gmail.com"
    //     }
    //   }
    // ],
    //   "subs": [
    //   {
    //     "id": 17,
    //     "name": "joaozinho",
    //     "user_id": 31,
    //     "description": "",
    //     "birthdate": null,
    //     "sex": null,
    //     "user": {
    //       "username": "olasounovoaqui40",
    //       "email": "qqlcoisa40@gmail.com"
    //     }
    //   }
    // ],
    //   "blog_pic": null,
    //   "isPublic": true,
    //   "invites": [],
    //   "description": "",
    //   "topic": [
    //   {
    //     "name": "Personal"
    //   }
    // ],
    //   "posts": [
    //   {
    //     "title": "\"wassup\"",
    //     "client": 17,
    //     "date": "2021-01-03T18:26:51.294814Z",
    //     "image": null,
    //     "text": "\"hello\"",
    //     "blog": 16,
    //     "likes": [],
    //     "comments": []
    //   },
    //   {
    //     "title": "wassup",
    //     "client": 17,
    //     "date": "2021-01-04T09:31:33.711010Z",
    //     "image": null,
    //     "text": "test",
    //     "blog": 16,
    //     "likes": [],
    //     "comments": []
    //   },
    //   {
    //     "title": "wassup",
    //     "client": 17,
    //     "date": "2021-01-04T09:36:27.399293Z",
    //     "image": null,
    //     "text": "test",
    //     "blog": 16,
    //     "likes": [],
    //     "comments": []
    //   }
    // ],
    //   "personal": true,
    //   "permission": true,
    //   "subbed": true
    // }
  }
}
