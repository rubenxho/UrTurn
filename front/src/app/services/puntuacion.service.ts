import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puntuacion } from '../models/puntuacion';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private url = 'https://apiurturn.herokuapp.com/strike?id_usuario_cliente=';

  constructor(private http: HttpClient) { 

  }

  getKarma(id:number){
    return this.http.get(`${this.url}${id}`)
  }


  
}
