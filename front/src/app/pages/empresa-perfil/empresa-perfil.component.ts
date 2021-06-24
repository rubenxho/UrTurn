import { Component, OnInit } from '@angular/core';

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
    repeatpassword:"",
    img:"",
    localStorage:"",
    open:"",
    close:"",
    timeWait:"",
    txt:""
  }

  constructor() { 

    this.empresaPerfil = ["modalModificar","¿Seguro que desea enviar su perfil?", "Sí", "No", "Perfil enviado, gracias"];

  }

  handelChange(event:any){
    const index:string = event.target.name;
    const value:string = event.target.name;
    this.data[index] = value;
  }

  handelClick(){
    console.log(this.data)
  }

  ngOnInit(): void {
  }

}
