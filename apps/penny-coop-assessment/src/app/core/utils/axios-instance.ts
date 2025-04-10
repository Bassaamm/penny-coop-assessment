// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError, switchMap, throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const accessToken = this.authService.getAccessToken();

//     let authReq = req;
//     if (accessToken) {
//       authReq = req.clone({
//         setHeaders: { Authorization: `Bearer ${accessToken}` },
//       });
//     }

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           return this.authService.refreshToken().pipe(
//             switchMap((newToken) => {
//               const retryReq = req.clone({
//                 setHeaders: { Authorization: `Bearer ${newToken}` },
//               });
//               return next.handle(retryReq);
//             }),
//             catchError((err) => {
//               this.authService.logout();
//               return throwError(() => err);
//             })
//           );
//         }

//         return throwError(() => error);
//       })
//     );
//   }
// }
