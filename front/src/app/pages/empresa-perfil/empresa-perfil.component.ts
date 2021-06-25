import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

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
  public owner = 29;
  public me:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  public user:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  constructor(private apiUserService:UsuarioServiceService) { 

    this.empresaPerfil = ["modalModificar","¿Seguro que desea enviar su perfil?", "Sí", "No", "Perfil enviado, gracias", "", "2"];

  }

  handelChange(event:any){
    const index:string = event.target.name;
    const value:string = event.target.value;
    this.data[index] = value;
  }

  handelClick(){
    // console.log(this.data)
    console.log(this.user)
    this.user = new UsuarioEmpresa(this.owner, this.data.name, this.data.category, this.data.telefono, this.data.codigo_postal, "", this.data.img, this.data.txt, this.data.open, this.data.close, this.data.timeWait, this.data.logo)
    // console.log(this.user)
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

  ngOnInit(): void {
  }

}
