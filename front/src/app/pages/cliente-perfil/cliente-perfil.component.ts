import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service'

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})


export class ClientePerfilComponent implements OnInit {


  // [k: string]: any;
  
  public profileData: any = {
    name:"",
    lastname:"",
    phone:"",
    img:"",
    mail:"",
    password:"",
  }

  public pic:String="";
  public guardarModal: string[]
  public owner = 5;
  public me: UsuarioCliente = new UsuarioCliente(0, "", "", "", "");

  public user: UsuarioCliente = new UsuarioCliente(0, "", "", "", "");

  constructor(private apiUserService:UsuarioServiceService) {
    this.guardarModal = ["modalModificar","Realizar cambios","Si", "Cancelar","Cambios guardados", "", "2"]
   }

 
  ngOnInit(): void {
    this.apiUserService.obtenerUserClienteId(this.owner)
    .subscribe((data:any)=>{
      console.log(data)
      return data = this.me
    }) 
    // this.apiUserService.obtenerUserClienteId(this.owner).subscribe(user:any => (this.me = user));
  }

  handleChange(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.profileData[ index ] = value;
  }

  handleClick(){
    console.log(this.profileData);
     this.user = new UsuarioCliente(this.owner, this.profileData.name, this.profileData.lastname, this.profileData.phone, this.profileData.img);
     console.log(this.user)
     return this.user
  }

  subirCambios(guardar:boolean){
    console.log("guardar")
    if(guardar==true){
      console.log(this.user)
      console.log("flag after")
      this.apiUserService.putUserCliente(this.user)
      .subscribe((data:any)=>{
        console.log(data)
        return data = this.user;
      })

    }
  }
}