import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';


/*
  https://stackoverflow.com/questions/34464108/angular-set-headers-for-every-request
 */
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  StorageService.getAuthToken();
    if (token != null){
      const clonedRequest = req.clone({ headers: req.headers.append('Authorization', token) });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
