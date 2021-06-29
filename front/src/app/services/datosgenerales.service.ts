import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosgeneralesService {

  private url:string;


  constructor(private http: HttpClient) {
    this.url='https://apiurturn.herokuapp.com/turnos/empresa/datos_generales?id_usuario_empresa='
  }

  getDatosGenerales(id_empresa:number){
    return this.http.get(`${this.url}${id_empresa}`)
  }
}
