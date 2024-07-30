import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `http://localhost/sigef-final-proyect/Backend/controller/login.php`;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        this.cookieService.set('token', response.token);
      })
    );
  }

  logout(): void {
    this.cookieService.deleteAll('token');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }
}
