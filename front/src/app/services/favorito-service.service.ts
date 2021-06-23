import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favoritos } from '../models/favoritos';


@Injectable({
  providedIn: 'root'
})
export class FavoritoServiceService {
private url:string
  constructor(private http:HttpClient) {
    this.url="http://localhost:3000/favoritos"
  }

  obtenerFav(categoria:string, cp:string, id_usuario_cliente:number):any{
    return this.http.get(this.url + categoria + cp + id_usuario_cliente)
  }

  // anyadirFav(id_usuario_cliente:number, id_usuario_empresa:number, NOW()){
    
  //   return this.http.post(this.url , )
  // }
}
