import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request is on the way');
    console.log(req.url);
    const newRequest = req.clone(
      {headers: req.headers.append('Auth', 'asdf')});
    return next.handle(newRequest);
  }

}
