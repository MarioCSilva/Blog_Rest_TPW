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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [NavbarComponent, CommentComponent, CreatePostComponent, CommentsModalComponent,
    PostComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, MatIconModule, BrowserAnimationsModule,
        MatInputModule, MatDatepickerModule, MatOptionModule, MatSelectModule, MatExpansionModule, MatCheckboxModule,
    ],
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
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    NavbarComponent,
    CommentComponent,
    CreatePostComponent,
    CommentsModalComponent,
    PostComponent,
  ]
})
export class SharedModule { }
