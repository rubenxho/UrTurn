import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private url:string;
  
  constructor(private http: HttpClient) {
    this.url='http://localhost:3000/turnos/cliente?id_usuario_cliente=3'
  }

  getDatosTurnos(){
    return this.http.get(this.url)
  }
}
