import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root',
})
export class LocalServiceService {

  private url = 'http://localhost:3000/local';

  public localesTop: UsuarioEmpresa [];
  public localElegido: UsuarioEmpresa;

  constructor(private http: HttpClient) {
    
    this.localesTop = [];
    this.localElegido = new UsuarioEmpresa();
    
  }

  getLocales(categoria: string, codigo_postal: number){

    if(categoria != '' && codigo_postal != 0){

      return this.http.get(`${this.url}?categoria=${categoria}&codigo_postal=${codigo_postal}`);

    }else{

      return this.http.get(this.url);

    }

  }

  getLocal(id: number){

    if(id != 0){

      return this.http.get(`${this.url}?id=${id}`);

    }else{

      return this.http.get(this.url);

    } 

  }

  getTop(){

    return this.http.get(this.url);

  }

}
