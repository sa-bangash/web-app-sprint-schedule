import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth-state/auth.state.model';
@Injectable()
export class TokenHttpinterceptor implements HttpInterceptor {


  constructor(private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleAccess(request, next);
  }

  private handleAccess(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    const request = req.clone({
      setHeaders: {
        Authorization: `Basic ${token}`,
      }
    });

    return next.handle(request);
  }
}
