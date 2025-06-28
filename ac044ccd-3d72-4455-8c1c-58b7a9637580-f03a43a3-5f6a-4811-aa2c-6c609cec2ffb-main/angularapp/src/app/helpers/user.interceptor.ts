import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private storeService: UserStoreService) {} 

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.storeService?.isLoggedIn()) {
      let jwtToken = this.storeService.authUser.jwtToken;
      alert('Interceptor ' + jwtToken);
      const clonedReq = request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken
        }
      });
      return next.handle(clonedReq);
    }
    return next.handle(request);
  }
}
