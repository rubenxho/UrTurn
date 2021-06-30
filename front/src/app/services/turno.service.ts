import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private url:string;
  public empresaElegida: UsuarioEmpresa;
  
  constructor(private http: HttpClient) {
    this.url='https://apiurturn.herokuapp.com/turnos/cliente'
  }

  getDatosTurnos(id:number){
    return this.http.get(`${this.url}?id_usuario_cliente=${id}`)
  }

  postHacerCola(id_cliente:number,id_empresa:number){
    let body={
        "id_usuario_cliente":id_cliente,
        "id_usuario_empresa":id_empresa
    }
    return this.http.post(this.url,body)
  }

  putCancelarTurno(id_turno:number){
    let turno={
      "id_turno":id_turno
    }
    return this.http.put(this.url,turno)
  }
}
