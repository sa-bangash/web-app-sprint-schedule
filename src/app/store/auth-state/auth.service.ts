import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActiveService } from '../../http-helper/active.service';

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
export class AuthService extends ActiveService {
  constructor(public http: HttpClient) {
    super(http);
  }

  login(obj: { email: string, password: string }): Observable<IAuth> {
    return this.post(`auth/login`, obj) as Observable<IAuth>;
  }

  signup(obj: { name: string, email: string, password: string, confirmPassword: string }): Observable<IAuth> {
    return this.post(`auth/signup`, obj) as Observable<IAuth>
  }

  createWorkSpace(obj: { name: string, email: string, password: string, confirmPassword: string, workSpace: string }): Observable<IAuth> {
    return this.post(`auth/create-work-space`, obj) as Observable<IAuth>
  }

  logout(obj: { token: string }): Observable<any> {
    return this.post(`auth/signup`, obj)
  }
}
