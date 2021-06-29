import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioCliente } from '../models/usuario-cliente';

@Injectable({
  providedIn: 'root'
})
export class RegistroClienteService {

  private url:string;

  constructor(private http:HttpClient) { 
    this.url = 'https://apiurturn.herokuapp.com/cliente-registro';
  }

  public postNuevoUsuario(cliente:UsuarioCliente):any  {
    alert(cliente.nombre_cliente);
    return this.http.post(this.url, cliente);
  }
}
