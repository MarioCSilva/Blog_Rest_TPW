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



@NgModule({
  declarations: [NavbarComponent, CommentComponent, CreatePostComponent, CommentsModalComponent, PostComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, MatIconModule, BrowserAnimationsModule, MatInputModule],
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
    NavbarComponent,
    CommentComponent,
    CreatePostComponent,
    CommentsModalComponent,
    PostComponent
  ]
})
export class SharedModule { }
