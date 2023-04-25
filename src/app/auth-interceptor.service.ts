import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request is on the way');
    console.log(req.url);
    const newRequest = req.clone(
      {headers: req.headers.append('Auth', 'asdf')});
    return next.handle(newRequest).pipe(tap(event=> {
      console.log(event);
      if(event.type === HttpEventType.Response) {
        console.log('response arrived');
        console.log(event.body);
      }
    }));
  }

}
