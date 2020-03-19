import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROOT_URL } from '../../environments/environment';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEndpoint = API_ROOT_URL + '/users';

  constructor(private http: HttpClient) { }

  get(): Observable<User> {
    return this.http.get<User>(`${ this.userEndpoint }/me`, {
      headers: {
        Authorization: `Bearer ${ window.localStorage.getItem('token') }`
      }
    }).pipe();
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${ this.userEndpoint }/${ user.id }`, user, {
      headers: {
        Authorization: `Bearer ${ window.localStorage.getItem('token') }`
      }
    }).pipe();
  }
}
