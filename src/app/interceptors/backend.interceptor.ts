import { Injectable } from '@angular/core';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService, ToastService } from '../services';
import { catchError } from 'rxjs/internal/operators';
     
@Injectable()
export class BackendInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthService,
              private toast: ToastService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    if (!req.url.includes(environment.backendUrl)) {
      return next.handle(req);
    }
    const user = this.auth.getUser();

    if (user) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${user.token}`
        }
      });
    }

    return next.handle(req).pipe(catchError((error) => {
        return this._handleAuthError(error);
      }) as any);
      
  }
  private _handleAuthError(error: HttpErrorResponse): Observable<any> {
    var details: any;
    console.log(error)
    switch(error.status) {
      case 0: // Conection error
        details = {details: 'Error de conexión.'};
        break;
      case 400: // Validation error
        details = error.error;
        break;
      case 401: // Unauthorized
        this.auth.logout();
        details = {details: 'No autorizado.'};
        break;
      case 404: // Not found
        details = {details: 'Recurso no encontrado.'};
        break;
      case 500: // Server error.
        const error500Details = error.error.detail || error.error.details;

        details = {details: `Error de servidor: ${error500Details ? error500Details : JSON.stringify(error.statusText)}`};
        break;
      default: // Unknown error.
        const unknownDetails = error.error.detail || error.error.details;
        
        details = {details: `Error desconocido: ${unknownDetails ? unknownDetails : JSON.stringify(error.statusText)}`};
        break;
    }
    
    if (error.status != 400) this.toast.showError(details);
    return throwError(details);
  }
}