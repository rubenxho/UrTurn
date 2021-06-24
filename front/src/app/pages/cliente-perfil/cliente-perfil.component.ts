import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service'

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})


export class ClientePerfilComponent implements OnInit {

  [k: string]: any;
  
  public data: any = {
    img:"",
    name:"",
    lastname:"",
    password:"",
    repeatPassword:"",
    phone:"",
    mail:""
  }
  public guardarModal: string[]
  public owner = 5;

  public testingWtest = "Gregorio";
  public testImg = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com.mx%2Fpin%2F805862927044760750%2F&psig=AOvVaw3yq8j9hQxS6KZUbWvYwWHW&ust=1624543252708000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCOixtrL1rfECFQAAAAAdAAAAABAD";

  constructor(private apiUserService:UsuarioServiceService) {
    this.guardarModal = ["modalModificar","Realizar cambios","Si", "Cancelar","Cambios guardados"]
   }

  ngOnInit(): void {
  }

  handleChange(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.data[ index ] = value;
  }

  handleClick(){
    console.log(this.data);
    this.apiUserService.putUserCliente(this.owner)

  }
  
}