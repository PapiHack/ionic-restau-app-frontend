import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { API_ROOT_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  isAuthenticated = false;
  user: User;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(`${ API_ROOT_URL }/auth/local`, user).pipe();
  }

  register(user: User): Observable<any> {
    return this.http.post(`${ API_ROOT_URL }/auth/local/register`, user).pipe();
  }
}
