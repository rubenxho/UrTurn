import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosclientesService {

  private url:string;

  constructor(private http: HttpClient) { 
    this.url='http://localhost:3000/turnos/empresa/datos_clientes?id_usuario_empresa='
  }

  getDatosClientes(id:number){
    return this.http.get(`${this.url}${id}`)
  }

  
}
