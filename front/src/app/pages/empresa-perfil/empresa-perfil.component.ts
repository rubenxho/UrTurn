import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login';


@Component({
  selector: 'app-empresa-perfil',
  templateUrl: './empresa-perfil.component.html',
  styleUrls: ['./empresa-perfil.component.css']
})
export class EmpresaPerfilComponent implements OnInit {

  public empresaPerfil: string [];
  
  public data: any = {
    category:"",
    name:"",
    password:"",
    repeatPassword:"",
    phone:"",
    img:"",
    logo:"",
    open:"",
    close:"",
    timeWait:"",
    txt:""
  }
  public owner:number;

  public me:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  public user:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  constructor(private apiUserService:UsuarioServiceService, private lsowner:LoginService) { 

    this.empresaPerfil = ["modalModificar","¿Seguro que desea enviar su perfil?", "Sí", "No", "Perfil enviado, gracias", "", "2"];
    this.owner = this.lsowner.login.id_usuario_empresa;

  }

  ngOnInit(): void {
    // console.log(this.owner)
    this.apiUserService.obtenerUserEmpresaId(this.owner)
    .subscribe((data:any)=>{
      console.log(data)
      this.me = data[0]
      console.log(this.me)
      return this.me
    })
  }

  handelChange(event:any){
    const index:string = event.target.name;
    const value:string = event.target.value;
    this.data[index] = value;
  }

  handelClick(){
    console.log(this.data)
    console.log(this.user)
    this.user = new UsuarioEmpresa(this.owner, this.data.name, this.data.category, this.data.telefono, this.data.codigo_postal, "", this.data.img, this.data.txt, this.data.open, this.data.close, this.data.timeWait, this.data.logo)
    console.log(this.user)
    return this.user
  }

  subirCambios(guardar:boolean){
    if(guardar==true){
      this.apiUserService.actualizarUserEmpresa(this.user)
      .subscribe((data:any)=>{
        // console.log(data)
        return data = this.user;
      })
    }
  }
}
