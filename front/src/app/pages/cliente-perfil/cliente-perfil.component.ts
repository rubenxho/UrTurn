import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})


export class ClientePerfilComponent implements OnInit {

  [k: string]: any;
  
  public data: any = {
    name:"",
    apellidos:"",
    password:"",
    repeatPassword:"",
    phone:"",
    mail:""
  }
  public guardarModal: string[]
  
  constructor() {
    this.guardarModal = ["modalModificar","Realizar cambios","Si", "Cancelar","Cambios guardados"]
   }

  ngOnInit(): void {
  }

  handelChange(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.data[ index ] = value;
  }

  handelClick(){
    console.log(this.data);
  }
  
}