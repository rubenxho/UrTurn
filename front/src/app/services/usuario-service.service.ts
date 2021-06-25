import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioCliente } from '../models/usuario-cliente';
import { UsuarioEmpresa } from '../models/usuario-empresa';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  private url ='http://localhost:3000'
  
   constructor(private http: HttpClient) {

  }
  
  /************EMPRESA**************/ 
        
  public obtenerUserEmpresaId(id:any):any{
      return this.http.get(`${this.url}/userE`, id)
  }

  public obtenerUserEmpresa():any{
    return this.http.get(`${this.url}/userE`)
  }

  public actualizarUserEmpresa(clue:UsuarioEmpresa):any{
    return this.http.put(`${this.url}/userE`, clue)
  } 

  public eliminarUserEmpresa(id:any):any{
    return this.http.delete(`${this.url}/deleteUserE`, id)
  }

  /************CLIENTE**************/

  public obtenerUserCliente():any{
      return this.http.get(`${this.url}/userC`)
  }

  public obtenerUserClienteId(id:any):any{
    return this.http.get(`${this.url}/userC?id=${id}`)
  }
  public putUserCliente(clue:UsuarioCliente):any{
    console.log(clue)
    return this.http.put(`${this.url}/userC`, clue)
  }

  public eliminarUserCliente(id:any):any{
    return this.http.delete(`${this.url}/deleteUserC`, id)
  }

}