import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService {

  private url:string;

  constructor(private http:HttpClient) { 
    this.url = 'http://localhost:3000/empresa-registro';
  }

  public postNuevoUsuario(empresa:UsuarioEmpresa):any  {
    alert(empresa.nombre_empresa);
    return this.http.post(this.url, empresa);
  }
}
