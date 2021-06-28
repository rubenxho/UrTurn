import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { LoginService } from 'src/app/services/login.service';
import { type } from 'jquery';



@Component({
  selector: 'app-empresa-perfil',
  templateUrl: './empresa-perfil.component.html',
  styleUrls: ['./empresa-perfil.component.css']
})
export class EmpresaPerfilComponent implements OnInit {

  public empresaPerfil: string [];
  
  public profileData: any = {
    nombre_empresa:"",
    categoria:"",
    telefono:"",
    codigo_postal:"",
    direccion:"",
    imagen_url:"",
    descripcion:"",
    apertura:"",
    cierre:"",
    tiempo_espera:"",
    logo:"",
    estado_turno:"",
    password:"",
    repeatPassword:""
  }
  public owner:number;

  // public me:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  public user:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  constructor(private apiUserService:UsuarioServiceService, private lsowner:LoginService) { 

    this.empresaPerfil = ["modalModificar","¿Seguro que desea enviar su perfil?", "Sí", "No", "Perfil enviado, gracias", "", "2"];
    this.owner = this.lsowner.login.id_usuario_empresa;

  }

  ngOnInit(): void {
    // console.log(this.owner)
    this.userDataBase()
  }

  userDataBase(){
    console.log(this.owner)
    this.apiUserService.obtenerUserEmpresaId(this.owner) 
    .subscribe((data:any)=>{
      console.log(data)
      this.user =  new UsuarioEmpresa (this.owner, data[0].nombre_empresa, data[0].categoria, data[0].telefono, data[0].codigo_postal, data[0].direccion, data[0].imagen_url, data[0].descripcion, data[0].apertura, data[0].cierre, data[0].tiempo_espera) 
      // console.log(this.user)
    })
  }

  handelChange(event:any){
    const index:string = event.target.name;
    const value:string = event.target.value;
    this.profileData[index] = value;
    console.log(this.profileData)
  }

  saveData(copyUser){
    console.log(this.profileData)
    for(let key in this.profileData){
      if(this.profileData[key] === '' || this.profileData == undefined){
        this.profileData[key] = copyUser[key];
        console.log(this.profileData)
      }
    }
    console.log("antes", this.user.tiempo_espera)
    this.user = new UsuarioEmpresa(this.owner, this.profileData.nombre_empresa, this.profileData.categoria, this.profileData.telefono, this.profileData.codigo_postal, this.profileData.direccion , this.profileData.imagen_url, this.profileData.descripcion ,this.profileData.apertura, this.profileData.cierre, this.profileData.tiempo_espera, this.profileData.logo, this.profileData.estado_turno, this.profileData.password);
    console.log("despues",this.user)
  }
  
  subirCambios(guardar:boolean){
    if(guardar == true){
      const copyUser = {...this.user};
      this.saveData(copyUser);
      console.log("Usuario con cambios")
      console.log(this.user)
      this.apiUserService.actualizarPerfilEmp(this.user) 
      .subscribe((data:any)=>{
        console.log(data)
      })
    }
  }
}
