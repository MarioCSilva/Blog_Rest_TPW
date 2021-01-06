import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {CommentComponent} from './components/comment/comment.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {CommentsModalComponent} from './components/comments-modal/comments-modal.component';
import {PostComponent} from './components/post/post.component';
import {AuthModule} from '../features/auth/auth.module';



@NgModule({
  declarations: [NavbarComponent, CommentComponent, CreatePostComponent, CommentsModalComponent, PostComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, MatIconModule],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    MatIconModule,
    NavbarComponent,
    CommentComponent,
    CreatePostComponent,
    CommentsModalComponent,
    PostComponent
  ]
})
export class SharedModule { }
