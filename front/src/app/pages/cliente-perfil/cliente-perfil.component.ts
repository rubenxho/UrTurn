import { Component, OnInit } from '@angular/core';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service'
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})


export class ClientePerfilComponent implements OnInit {


  // [k: string]: any;
  
  public profileData: any = {
    name:"",
    lastName:"",
    phone:"",
    img:"",
    password:"",
  }
 
  public guardarModal: string[]

  public owner:number;
  
  public me: UsuarioCliente = new UsuarioCliente(0, "", "", "", "");
  
  public user: UsuarioCliente = new UsuarioCliente(0, "", "", "", "");

  constructor(private apiUserService:UsuarioServiceService,  private lsowner:LoginService)  {
    
    this.guardarModal = ["modalModificar","Realizar cambios","Si", "Cancelar","Cambios guardados", "", "2"]
    this.owner = this.lsowner.login.id_usuario_cliente;


  }


  //RECORRER EL OBJETO SI ES x == "" x then x = x (se mantiene el valor), SOLO una mclase de UsuarioCliente  

  ngOnInit(): void {
    // console.log(this.owner)

    this.apiUserService.obtenerUserClienteId(this.owner)
    .subscribe((data:any)=>{
      console.log(data)
      this.me = data[0]
      console.log(this.me)
      return this.me
    }) 

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
    // console.log("guardar")
    if(guardar == true){
      // console.log(this.user)
      // console.log("flag after")
      this.apiUserService.actualizarUserCliente(this.user)
      .subscribe((data:any)=>{
        // console.log(data)
        return data = this.user;
      })

      this.apiUserService.obtenerUserClienteId(this.owner)
      .subscribe((data:any)=>{
        console.log(data)
        this.me = data[0]
        console.log(this.me)
        return this.me
      }) 
    }
  }

}