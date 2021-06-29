import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioCliente } from '../models/usuario-cliente';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  private url ='https://apiurturn.herokuapp.com'
  
   constructor(private http: HttpClient) {

  }
  
  /************EMPRESA**************/ 
        
  public obtenerUserEmpresaId(id:number):any{
      return this.http.get(`${this.url}/userE?id=${id}`)
  }

  public obtenerUserEmpresa():any{
    return this.http.get(`${this.url}/userE`)
  }

  public actualizarUserEmpresa(clue:UsuarioEmpresa):any{
    console.log(clue)
    return this.http.put(`${this.url}/userE`, clue)
  } 

  public actualizarPerfilEmp(changes:UsuarioEmpresa):any{
    return this.http.put(`${this.url}/userEP`, changes)
  }

  public eliminarUserEmpresa(id:any):any{
    return this.http.delete(`${this.url}/deleteUserE`, id)
  }

  /************CLIENTE**************/

  public obtenerUserCliente():any{
      return this.http.get(`${this.url}/userC`)
  }

  public obtenerUserClienteId(id:number):any{
    return this.http.get(`${this.url}/userC?id=${id}`)
  }
  public actualizarUserCliente(clue:UsuarioCliente):any{
    console.log(clue)
    return this.http.put(`${this.url}/userC`, clue)
  }

  public actualizarUserPerfilClt(changes:UsuarioCliente):any{
    return this.http.put(`${this.url}/userCP`, changes)
  }

  public eliminarUserCliente(id:any):any{
    return this.http.delete(`${this.url}/deleteUserC`, id)
  }

}