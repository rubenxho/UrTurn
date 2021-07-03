import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Opiniones, OpinionRechazada } from '../models/opiniones';

@Injectable({
  providedIn: 'root',
})
export class ClienteOpinionesResenarService {
  private url = 'https://apiurturn.herokuapp.com';

  constructor(private http: HttpClient) {}
  // Pagina cliente_opiniones : para pintar los lugares que el cliente ha terminado el turno. La info de empresa para pintar en la pantalla.
  getEmpresaVisitadasDeCliente(id_usuario_cliente: number) {
    return this.http.get(
      `${this.url}/opiniones/empresa_visitada?id_usuario_cliente=${id_usuario_cliente}`
    );
  }
  // Pagina cliente_opiniones : para el segundo campo de esta pagina que mostrar la historio de opiniones de este cliente.
  getOpinionesACliente(id_usuario_cliente: number) {
    return this.http.get(
      `${this.url}/opiniones?id_usuario_cliente=${id_usuario_cliente}`
    );
  }
  //Pagina cliente_opiniones : crear un nuevo opinion por cliente
  postOpinion(opinionNuevo: Opiniones) {
    return this.http.post(`${this.url}/opiniones`, opinionNuevo);
  }

  // Pagina empresa_opiniones : para pintar los opiniones que los clientes han dado a este lugar y pintal la info de los clientes en la pantalla.
  getOpinionesAEmpresa(id_usuario_empresa: number) {
    return this.http.get(
      `${this.url}/opiniones?id_usuario_empresa=${id_usuario_empresa}`
    );
  }

  postOpinionRechaza(id_usuario_cliente: number, id_usuario_empresa: number) {
    return this.http.post(
      `${this.url}/opiniones_rechazadas`,
      new OpinionRechazada(id_usuario_cliente, id_usuario_empresa)
    );
  }
}
