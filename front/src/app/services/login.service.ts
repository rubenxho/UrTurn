import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string;
  public estado:boolean;
  public tipoUsuario:string

  constructor(private http:HttpClient) { 
    this.url = 'http://localhost:3000/login';
    this.estado = false;
    this.tipoUsuario = '';
  }

  public getIdUsuario(login:Login):any  {
    return this.http.get(`${this.url}?email=${login.email}&contraseña=${login.contraseña}`);
  }

  public seleccionarTipoUsuario():string  {
    if(this.tipoUsuario=='empresa') {
      return 'Empresa';
    }else {
      return 'Cliente';
    }
  }
}
