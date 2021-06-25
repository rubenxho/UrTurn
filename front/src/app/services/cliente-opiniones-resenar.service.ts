import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Opiniones } from '../models/opiniones';

@Injectable({
  providedIn: 'root',
})
export class ClienteOpinionesResenarService {
  private url1 = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  // Pagina cliente_opiniones : para pintar los lugares que el cliente ha terminado el turno. La info de empresa para pintar en la pantalla.
  getEmpresaVisitadasDeCliente(id_usuario_cliente: number) {
    return this.http.get(`${this.url1}/opiniones/empresa_visitada?id_usuario_cliente=${id_usuario_cliente}`);
  }
  // Pagina cliente_opiniones : para el segundo campo de esta pagina que mostrar la historio de opiniones de este cliente.
  getEmpresaOpiniones(id_usuario_cliente: number) {
    return this.http.get(`${this.url1}/opiniones?id_usuario_cliente=${id_usuario_cliente}`);
  }
  //Pagina cliente_opiniones : crear un nuevo opinion por cliente
  postOpinion(opinionNuevo: Opiniones) {
    return this.http.post(`${this.url1}/opiniones`, opinionNuevo);
  }

  // Pagina empresa_opiniones : para pintar los opiniones que los clientes han dado a este lugar y pintal la info de los clientes en la pantalla.
  getClienteOpiniones(id_usuario_empresa: number) {
    return this.http.get(`${this.url1}/opiniones?id_usuario_cliente=${id_usuario_empresa}`);
  }
}
