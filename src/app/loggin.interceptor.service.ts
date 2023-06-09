import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export class LogginInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing request');
    console.log(req.headers);
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('income response');
        console.log(event.body);
      }
    }));
  }

}
