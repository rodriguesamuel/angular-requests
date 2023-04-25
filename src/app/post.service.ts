import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{ name: string }>('https://angular-request-project-default-rtdb.firebaseio.com/posts.json',
      postData)
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{
      [key: string]: Post
    }>('https://angular-request-project-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams
      })
      .pipe(map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({...responseData[key], id: key});
          }
        }
        catchError(err => {
          //send to analytics
          return throwError(err)
        });
        return postArray;
      }));
  }

  deletePosts() {
    return this.http.delete('https://angular-request-project-default-rtdb.firebaseio.com/posts.json');
  }
}
