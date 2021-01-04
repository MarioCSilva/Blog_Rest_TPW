import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';    // add this
import { FormsModule } from '@angular/forms';    // add this
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CommentsModalComponent } from './components/comments-modal/comments-modal.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, ProfileComponent, PostComponent, CreatePostComponent, CommentsModalComponent, CommentComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, NgbModule, MatIconModule],    // add this
  providers: [UserService],    // add this
  bootstrap: [AppComponent]
})
export class AppModule { }
