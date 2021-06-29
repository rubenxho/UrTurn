import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService {

  private url:string;

  constructor(private http:HttpClient) { 
    this.url = 'https://apiurturn.herokuapp.com/empresa-registro';
  }

  public postNuevoUsuario(empresa:UsuarioEmpresa):any  {
    alert(empresa.nombre_empresa);
    return this.http.post(this.url, empresa);
  }

  // public mandarEmail(usuario:string, email:string):any  {
  //   alert('mandando email');

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   return this.http.post('https://formspree.io/f/xvodqzrz',
  //       { name: usuario, replyto: email, message: `Hola! ${usuario}!\n\nBienvenid@ a UrTurn!` },
  //       { 'headers': headers });
  // }
}
