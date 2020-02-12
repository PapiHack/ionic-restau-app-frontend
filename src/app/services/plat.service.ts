import { Injectable } from '@angular/core';
import { Plat } from '../model/plat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlatService {

  private apiUrl = 'http://localhost:1337/plats';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Plat[]> {
    return this.http.get<Plat[]>(this.apiUrl).pipe();
  }

  get(id: number): Observable<Plat>  {
    return this.http.get<Plat>(`${ this.apiUrl }/${ id }`).pipe();
  }

  delete(id: number): Observable<Plat>  {
    return this.http.delete<Plat>(`${ this.apiUrl }/${ id }`).pipe();
  }

  update(plat: Plat): Observable<Plat> {
    return this.http.put<Plat>(`${ this.apiUrl }`, plat).pipe();
  }

  add(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(`${ this.apiUrl }`, plat).pipe();
  }
}
