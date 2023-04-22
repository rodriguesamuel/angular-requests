import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";
import {PostService} from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetchin: boolean = false;

  constructor(private http: HttpClient,
              private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.getPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
        this.loadedPosts = [];
    });
  }

  private getPosts() {
    this.isFetchin = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetchin = false;
      this.loadedPosts = posts;
    });
  }

}
