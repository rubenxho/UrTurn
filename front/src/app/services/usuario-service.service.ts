import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioCliente } from '../models/usuario-cliente';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  // private url ='https://apiurturn.herokuapp.com'
  private url = 'https://apiurturn.herokuapp.com';
  
   constructor(private http: HttpClient) {

  }
  
  /************EMPRESA**************/ 
        
  public obtenerUserEmpresaId(id:number){
      return this.http.get(`${this.url}/userE?id=${id}`)
  }

  public obtenerUserEmpresa(){
    return this.http.get(`${this.url}/userE`)
  }

  public actualizarUserEmpresa(clue:UsuarioEmpresa){
    console.log(clue)
    return this.http.put(`${this.url}/userE`, clue)
  } 

  public actualizarPerfilEmp(changes:UsuarioEmpresa){
    console.log('he llegado al servcio')
    return this.http.put(`${this.url}/userEP`, changes)
  }

  public eliminarUserEmpresa(id){
    return this.http.delete(`${this.url}/deleteUserE`, id)
  }

  /************CLIENTE**************/

  public obtenerUserCliente(){
      return this.http.get(`${this.url}/userC`)
  }

  public obtenerUserClienteId(id:number){
    return this.http.get(`${this.url}/userC?id=${id}`)
  }
  public actualizarUserCliente(clue:UsuarioCliente){
    console.log(clue)
    return this.http.put(`${this.url}/userC`, clue)
  }

  public actualizarUserPerfilClt(changes:UsuarioCliente){
    return this.http.put(`${this.url}/userCP`, changes)
  }

  public eliminarUserCliente(id){
    return this.http.delete(`${this.url}/deleteUserC`, id)
  }

}