import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosgeneralesService {

  private url:string;


  constructor(private http: HttpClient) {
    this.url='http://localhost:3000/turnos/empresa/datos_generales?id_usuario_empresa=29'
    // this.http.get(this.url).subscribe((data)=>{
    //   console.log("flag service")
    //   console.log(data);
    // })
  }

  getDatosGenerales(){
    return this.http.get(this.url)
  }
}
