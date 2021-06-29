import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotonAvanzarService {

  private url:string;

  constructor(private http: HttpClient) {
    this.url='https://apiurturn.herokuapp.com/turnos/empresa/avanzar_cola'
  }

  updBotonAvanzar(body2:number){
    let body: any={
      "id_usuario_empresa":body2}
    return this.http.put(this.url,body)
  }

}
