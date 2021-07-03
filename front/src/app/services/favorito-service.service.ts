import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favoritos } from '../models/favoritos';
import { UsuarioEmpresa } from '../models/usuario-empresa';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritoServiceService {
private url:string
public favoritos: UsuarioEmpresa[];
  constructor(private http:HttpClient, private loginService: LoginService) {
    this.url="https://apiurturn.herokuapp.com/favoritos"
    this.favoritos = []
  }

  obtenerFav(categoria:string, cp:string){
    let codigo:any
    console.log("flag")
    if(cp=="" && categoria=="" ){
      console.log("sin campos")
      codigo = this.http.get(this.url + `?id=` + this.loginService.login.id_usuario_cliente)
    }

    else if(categoria !== "" && cp == ""){
      console.log("con categoeria")
      codigo= this.http.get(this.url + `/categoria?categoria=` + categoria + `&id=` + this.loginService.login.id_usuario_cliente)
    }

    else if(categoria=="" && cp != ""){
      console.log("con codigo postal")
      codigo = this.http.get(this.url + `/cp?cp=` + cp + `&id=` + this.loginService.login.id_usuario_cliente)
    }

    else if(categoria!=="" && cp!==""){
      console.log("con cat y cp")
      codigo = this.http.get(this.url +`/busqueda?categoria=`+ categoria + `&cp=` + cp + `&id=` + this.loginService.login.id_usuario_cliente)
      console.log(categoria + cp);
      
    }

    return codigo
  }

  

  anyadirFav( id_usuario_empresa:number){
    let nuevoFav:Favoritos= new Favoritos (0,this.loginService.login.id_usuario_cliente, id_usuario_empresa)
    return this.http.post(this.url ,nuevoFav )
  }

  eliminarFav( id_usuario_empresa:number){
    // let dlete:any = {"id_usuario_empresa":id_usuario_empresa, "id_usuario_cliente":this.loginService.login.id_usuario_cliente}
    // console.log(dlete)
    let options= {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
            id_usuario_empresa: id_usuario_empresa,
            id_usuario_cliente: this.loginService.login.id_usuario_cliente
          },
  }
    return this.http.delete(this.url, options)
  }}