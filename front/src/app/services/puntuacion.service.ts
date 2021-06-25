import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Puntuacion } from '../models/puntuacion';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private url = 'http://localhost:3000/strike?id_usuario_cliente=3';

  constructor(private http: HttpClient) { 

  }

  getDatosClientes(){
    return this.http.get(this.url)
  }


  
}
