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

  obtenerFavId( id_usuario_cliente:number):any{
    return this.http.get(this.url + `?id=` + id_usuario_cliente)
  }

  obtenerFavCategoria(categoria:string, id_usuario_cliente:number):any{
    return this.http.get(this.url + `?categoria=` + categoria + `&` + `?id=` + id_usuario_cliente)
  }

  obtenerFavCp(cp:string, id_usuario_cliente:number):any{
    return this.http.get(this.url + `?cp=` + cp + `&` + `?id=` + id_usuario_cliente)
  }

  obtenerFav(categoria:string, cp:string, id_usuario_cliente:number):any{
    return this.http.get(this.url +`?categoria=`+ categoria + `&` + `?cp=` + cp + `&` + `?id=` + id_usuario_cliente)
  }

  anyadirFav(id_usuario_cliente:number, id_usuario_empresa:number){
    let nuevoFav:Favoritos= new Favoritos (id_usuario_cliente, id_usuario_empresa)
    return this.http.post(this.url ,nuevoFav )
  }
}

