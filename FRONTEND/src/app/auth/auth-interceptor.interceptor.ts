import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private authservice: AuthServiceService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const authToken = this.authservice.getToken();
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next.handle(authRequest);
  }
}
