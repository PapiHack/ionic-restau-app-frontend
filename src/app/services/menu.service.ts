import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROOT_URL } from '../../environments/environment';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuEndpoint = API_ROOT_URL + '/menus';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${ this.menuEndpoint }`).pipe();
  }

  add(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${ this.menuEndpoint }`, menu).pipe();
  }

  update(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${ this.menuEndpoint }/${ menu.id }`, menu).pipe();
  }

  get(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${ this.menuEndpoint }/${ id }`).pipe();
  }

  delete(id: number): Observable<Menu> {
    return this.http.delete<Menu>(`${ this.menuEndpoint }/${ id }`).pipe();
  }
}
