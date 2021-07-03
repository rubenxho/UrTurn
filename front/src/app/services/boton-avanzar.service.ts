import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotonAvanzarService {

  private url:string;

  constructor(private http: HttpClient) {
    this.url='https://apiurturn.herokuapp.com/turnos/empresa/strike'
  }

  updBotonAvanzar(body2:number){
    let body: any={
      "id_usuario_empresa":body2}
    return this.http.put(this.url,body)
  }

  addStrike(body2:number){
    let body: any={
      "id_usuario_empresa":body2}
    return this.http.post(this.url,body)
  }

  obtenerClienteActual(id:number){
    return this.http.get(`${this.url}?id_usuario_empresa=${id}`)
  }

}
