import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {CommentComponent} from './components/comment/comment.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {CommentsModalComponent} from './components/comments-modal/comments-modal.component';
import {PostComponent} from './components/post/post.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [NavbarComponent, CommentComponent, CreatePostComponent, CommentsModalComponent,
    PostComponent,
    PageNotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    BrowserModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatGridListModule,
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
