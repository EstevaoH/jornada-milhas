import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadeFederativa } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {
  private apiUrl: string = environment.apiUrl
  private cache$?: Observable<UnidadeFederativa[]>;
  constructor(private http: HttpClient) { }

  listarEstados(): Observable<UnidadeFederativa[]>{
    if(!this.cache$){
      this.cache$ = this.getEstados().pipe(
        shareReplay(1)
      )
    }

    return this.cache$
  }

  getEstados(): Observable<UnidadeFederativa[]>{
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`)
  }
}
