import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  private url ='http://localhost:3000'
  
   constructor(private http: HttpClient) {

  }
  
  /************EMPRESA**************/ 
        
  public obtenerUserEmpresaId(id:any){
      return this.http.get(`${this.url}/userE`, id)
  }

  public obtenerUserEmpresa(){
    return this.http.get(`${this.url}/userE`)
  }

  public actualizarUserEmpresa(clue:any){
    return this.http.put(`${this.url}/userE`, clue)
  } 

  public eliminarUserEmpresa(id:any){
    return this.http.delete(`${this.url}/deleteUserE`, id)
  }

  /************CLIENTE**************/

  public obtenerUserCliente(){
      return this.http.get(`${this.url}/userC`)
  }

  public obtenerUserClienteId(id:any){
    return this.http.get(`${this.url}/userC`,id)
  }
  public putUserCliente(clue:any){
    return this.http.put(`${this.url}/userC`, clue)
  }

  public eliminarUserCliente(id:any){
    return this.http.delete(`${this.url}/deleteUserC`, id)
  }

}