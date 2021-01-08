import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {CommentComponent} from './components/comment/comment.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {CommentsModalComponent} from './components/comments-modal/comments-modal.component';
import {PostComponent} from './components/post/post.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {BlogPageComponent} from "../features/blog/pages/blog-page/blog-page.component";


@NgModule({
  declarations: [NavbarComponent,BlogPageComponent, CommentComponent, CreatePostComponent, CommentsModalComponent, PostComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, MatIconModule, BrowserAnimationsModule, MatInputModule, MatDatepickerModule, MatOptionModule, MatSelectModule],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    NavbarComponent,
    CommentComponent,
    CreatePostComponent,
    CommentsModalComponent,
    PostComponent
  ]
})
export class SharedModule { }
