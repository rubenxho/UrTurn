import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  private url:string;
  public estado:boolean;
  public tipoUsuario:string
  public login:Login;

  constructor(private http:HttpClient, private router:Router) { 
    this.url = 'https://apiurturn.herokuapp.com/login';
    this.estado = false;
    this.tipoUsuario = '';
    this.login = new Login();
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.estado) {
      return false;
    }

    return true;
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
