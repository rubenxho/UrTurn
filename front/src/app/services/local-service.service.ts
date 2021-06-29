import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioEmpresa } from '../models/usuario-empresa';

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

  

  constructor(private http: HttpClient) {
    
    this.localesTop = [];
    this.localElegido = new UsuarioEmpresa();
    this.localesGrupo = [];
    this.locales = [new UsuarioEmpresa(0,"","","",0,"","","","","",0,"","",[],"","")];  
    this.mostrarTarjetas = false;

    
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

  getLocales(categoria: string, codigo_postal: number){
    
    let toReturn:any;
    if(categoria == "" && !codigo_postal){
      toReturn = this.http.get(this.url);            
      console.log("Dntro1");
      
    }else if (categoria != null && !codigo_postal){      

      toReturn = this.http.get(`${this.url}?categoria=${categoria}`);
      console.log("Dntro2");
    }else if (categoria == "" && codigo_postal != null){

      toReturn = this.http.get(`${this.url}?cp=${codigo_postal}`);
      console.log("Dntro3");
    }else{

      toReturn = this.http.get(`${this.url}?categoria=${categoria}&cp=${codigo_postal}`);
      console.log("Dntro1");
    }
    return toReturn;
  }

}
