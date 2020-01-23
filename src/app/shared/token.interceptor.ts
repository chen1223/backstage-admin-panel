import { HttpInterceptor,
         HttpRequest,
         HttpHandler,
         HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (req.url.indexOf('vimeo') > -1) {
      return next.handle(req);
    }
    const clonReq = req.clone({
      setHeaders: {
        Authorization: token ? token : ''
      }
    });
    return next.handle(clonReq);
  }

}
