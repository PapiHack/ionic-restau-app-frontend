import { Injectable } from '@angular/core';
import { API_ROOT_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private commandeEndpoint = API_ROOT_URL + '/commandes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${ this.commandeEndpoint }`, {
      headers: {
        Authorization: `Bearer ${ window.localStorage.getItem('token') }`
      }
    }).pipe();
  }

  get(commande: Commande): Observable<Commande> {
    return this.http.get<Commande>(`${ this.commandeEndpoint }/${ commande.id }`).pipe();
  }

  add(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${ this.commandeEndpoint }`, commande, {
      headers: {
        Authorization: `Bearer ${ window.localStorage.getItem('token') }`
      }
    }).pipe();
  }

  update(commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${ this.commandeEndpoint }`, commande).pipe();
  }

  delete(commande: Commande): Observable<Commande> {
    return this.http.delete<Commande>(`${ this.commandeEndpoint }/${ commande.id }`).pipe();
  }
}
