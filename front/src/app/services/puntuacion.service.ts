import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puntuacion } from '../models/puntuacion';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private url = 'http://localhost:3000/puntuacion';

  constructor(private http: HttpClient) { 

  }

addPuntuacion (puntuacion: Puntuacion){

  return this.http.post(this.url, puntuacion);

}


  
}
