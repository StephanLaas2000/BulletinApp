import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private token!: string;

  constructor(private http: HttpClient, private router: Router) {
    const tokens = localStorage.getItem('user auth');
    this._isLoggedIn$.next(!!tokens);
  }

  signup(userusername: string, userpassword: string) {
    this.http
      .post('https://localhost:3000/api/users/signup', {
        username: userusername,
        password: userpassword,
      })
      .subscribe((response) => {});
  }

  login(userusername: string, userpassword: string) {
    this.http
      .post<{ token: string }>('https://localhost:3000/api/users/login', {
        username: userusername,
        password: userpassword,
      })
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        this._isLoggedIn$.next(true);
        localStorage.setItem('user auth', token);
        if (token != null) {
          this.router.navigate(['/viewPosts']);
        }
      });

    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }

  getToken() {
    return localStorage.getItem('user auth');
  }
}
