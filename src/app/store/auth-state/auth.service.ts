import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface ILogin {
  token: string;
}

export interface IAuth {
  name: string;
  email: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.restUrl;
  constructor(private http: HttpClient) { }

  login(obj: { email: string, password: string }): Observable<IAuth> {
    return this.http.post(`${this.baseUrl}auth/login`, obj) as Observable<IAuth>;
  }

  signup(obj: { name: string, email: string, password: string, confirmPassword: string }): Observable<IAuth> {
    return this.http.post(`${this.baseUrl}auth/signup`, obj) as Observable<IAuth>
  }

  logout(obj: { token: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/signup`, obj)
  }
}
