import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioEmpresa } from '../models/usuario-empresa';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LocalServiceService {

  private url = 'https://apiurturn.herokuapp.com/local';

  public localesTop: UsuarioEmpresa [];
  public localElegido: UsuarioEmpresa;
  public localesGrupo: UsuarioEmpresa [];
  public locales: UsuarioEmpresa [];
  public mostrarTarjetas: boolean;
  public buscaLocal: string;

  

  constructor(private http: HttpClient , private loginService: LoginService) {
    
    this.localesTop = [];
    this.localElegido = new UsuarioEmpresa();
    this.localesGrupo = [];
    this.locales = [new UsuarioEmpresa()];  
    this.mostrarTarjetas = false;

    
  }

  getLocal(id: number){

    if(id != 0){

      return this.http.get(`${this.url}?id=${id}`);

    }else{

      return this.http.get(this.url+ `?id=` + this.loginService.login.id_usuario_cliente);

    } 

  }

  getTop(){

    return this.http.get(this.url);

  }

  getLocales(categoria: string, codigo_postal: number){
    
    let toReturn:any;
    if(categoria == "" && !codigo_postal){
      toReturn = this.http.get(this.url+ `?id=` + this.loginService.login.id_usuario_cliente);            
      console.log("Dntro1");
      
    }else if (categoria != null && !codigo_postal){      

      toReturn = this.http.get(`${this.url}/categoria?categoria=${categoria}&id=${this.loginService.login.id_usuario_cliente}`);
      console.log("Dntro2");
    }else if (categoria == "" && codigo_postal != null){

      toReturn = this.http.get(`${this.url}/cp?cp=${codigo_postal}&id=${this.loginService.login.id_usuario_cliente}`);
      console.log("Dntro3");
    }else{

      toReturn = this.http.get(`${this.url}/busqueda?categoria=${categoria}&cp=${codigo_postal}&id=${this.loginService.login.id_usuario_cliente}`);
      console.log("Dntro1");
    }
    return toReturn;
  }

}
