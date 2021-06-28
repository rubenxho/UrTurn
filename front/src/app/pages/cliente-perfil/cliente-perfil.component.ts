import { Component, OnInit } from '@angular/core';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service'
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})


export class ClientePerfilComponent implements OnInit {


  // [k: string]: any;
  
  public profileData: any = {
    nombre_cliente:"",
    apellidos_cliente:"",
    telefono:"",
    imagen_url:"",
    password:"",
    repeatPassword:""
  }

 public status;
 public show;
  public guardarModal: string[]

  public owner:number;
  
  // public me: UsuarioCliente = new UsuarioCliente(0, "", "", "", "");
  
  public user: UsuarioCliente = new UsuarioCliente(0, "", "", "", "","","");

  constructor(private apiUserService:UsuarioServiceService,  private lsowner:LoginService)  {
    
    this.guardarModal = ["modalModificar","Realizar cambios","Si", "Cancelar","Cambios guardados", "", "2"]
    this.owner = this.lsowner.login.id_usuario_cliente;


  }


  //RECORRER EL OBJETO SI ES x == "" x then x = x (se mantiene el valor), SOLO una mclase de UsuarioCliente  

  ngOnInit(): void {
    // console.log(this.owner)
    this.userDataBase()
  }

  userDataBase(){
    this.apiUserService.obtenerUserClienteId(this.owner)
    .subscribe((data:any)=>{
      this.user = new UsuarioCliente (this.owner, data[0].nombre_cliente, data[0].apellidos_cliente, data[0].telefono, data[0].imagen_url,  "", "" )
      // console.log(this.user)
    }) 
  }

  handleChange(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.profileData[ index ] = value;
  }

  // request.body.nombre_cliente == "" ? null : request.body.nombre_cliente
  saveData(copyUser){
    
    for(let key in this.profileData){
      // console.log(this.profileData.password)ta ben
      if(this.profileData[key] === '' || this.profileData == undefined){
        this.profileData[key] = copyUser[key];
      }
    }
    console.log('profile', this.profileData);
     this.user = new UsuarioCliente(this.owner, this.profileData.nombre_cliente, this.profileData.apellidos_cliente, this.profileData.telefono, this.profileData.imagen_url, "" , this.profileData.password);
    console.log(this.user)
    }

  subirCambios(guardar:boolean){
    // console.log("guardar")
    if(guardar == true){
      const copyUser = {...this.user};
      this.saveData(copyUser);
      console.log('user update',this.user)
      this.apiUserService.actualizarUserPerfilClt(this.user)
      .subscribe((data:any)=>{
        console.log(data)
      })

    }
  }

  confirmPassword(){
    if (this.profileData.zzz == this.profileData.repeatPassword){
      this.status = "Correcto"
      this.show = true;
    }else{
      this.show =false;
      this.status="Incorretos"
    }
  }

}