import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Opiniones } from '../models/opiniones';

@Injectable({
  providedIn: 'root',
})
export class ClienteOpinionesResenarService {
  private url = 'http://localhost:3000/opiniones';

  constructor(private http: HttpClient) {
    this.getOpiniones();
    this.getClienteOpiniones(4);
    this.getEmpresaOpiniones(30);
  }
  getOpiniones() {
    return this.http.get(`${this.url}`);
  }
  getClienteOpiniones(id_usuario_cliente: number) {
    return this.http.get(`${this.url}?${id_usuario_cliente}`);
  }
  getEmpresaOpiniones(id_usuario_empresa: number) {
    return this.http.get(`${this.url}?${id_usuario_empresa}`);
  }
  postOpinion(opinionNuevo: Opiniones) {
    return this.http.post(`${this.url}`, opinionNuevo);
  }
}
