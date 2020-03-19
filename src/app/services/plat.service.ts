import { Injectable } from '@angular/core';
import { Plat } from '../model/plat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROOT_URL } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlatService {

  private platEndpoint = API_ROOT_URL + '/plats';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Plat[]> {
    return this.http.get<Plat[]>(this.platEndpoint).pipe();
  }

  get(id: number): Observable<Plat>  {
    return this.http.get<Plat>(`${ this.platEndpoint }/${ id }`).pipe();
  }

  delete(id: number): Observable<Plat>  {
    return this.http.delete<Plat>(`${ this.platEndpoint }/${ id }`).pipe();
  }

  update(plat: Plat): Observable<Plat> {
    return this.http.put<Plat>(`${ this.platEndpoint }/${ plat.id }`, plat).pipe();
  }

  add(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(`${ this.platEndpoint }`, plat).pipe();
  }

  validatePlat(plat: Plat): boolean {
    let isValid = false;

    if (plat.nom.trim().length > 0 &&
        plat.description.trim().length > 0) {
          if (plat.prix > 0) {
            isValid = true;
          }
        }

    return isValid;
  }
}
