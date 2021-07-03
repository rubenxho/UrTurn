import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LoginService } from 'src/app/services/login.service';
import { TurnoService } from 'src/app/services/turno.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';

@Component({
  selector: 'app-cliente-tarjetas',
  templateUrl: './cliente-tarjetas.component.html',
  styleUrls: ['./cliente-tarjetas.component.css'],
})
export class ClienteTarjetasComponent implements OnInit {
  @Input() usuarioEmpresa: UsuarioEmpresa;
  @Input() indice: number;
  
  //public usuarioEmpresa: UsuarioEmpresa;
  public elId: number;


  // para modal
  public enCola: boolean;
  public ticket: number;
  public i = 0;
  public id_cliente: number
  

  // para localEmpresa
  /*********************************/

  constructor(
    public localService: LocalServiceService, 
    private id_usuario: LoginService, 
    private turnoService: TurnoService, 
    private toastr: ToastrService,
    private favService: FavoritoServiceService) {
    
    /*ID_CLIENTE*/
    this.id_cliente=this.id_usuario.login.id_usuario_cliente 
    //*************************/

  //atributo para hacer favorito
    this.enCola = false;
  }
  //method para guardar a favorito
  
  fav() {
   
    if(!this.usuarioEmpresa.favorito){
      this.favService.anyadirFav(this.usuarioEmpresa.id_usuario_empresa).subscribe((data:any)=>{
        
      })
      
    }
    else{
      this.favService.eliminarFav(this.usuarioEmpresa.id_usuario_empresa).subscribe((data:any)=>{

      })
    }
    this.usuarioEmpresa.favorito = !this.usuarioEmpresa.favorito;
  }



  

  //funcion mostrar datos del local según los endpoints
  muestraLocal(usuarioEmpresa: UsuarioEmpresa){
    this.localService.localElegido = usuarioEmpresa;
  }

  guardarEmpresa()
  {
    this.turnoService.empresaElegida = this.usuarioEmpresa;

  }

  // confirma hace la cola
  comfirmadoCola() {
    this.enCola = true;
    console.log("aqui")
    console.log(this.turnoService.empresaElegida.id_usuario_empresa)
    this.turnoService.postHacerCola(this.id_cliente,this.turnoService.empresaElegida.id_usuario_empresa).subscribe((data:any)=>{
        console.log(data)
        // Ya el cliente esta haciendo la cola en el local
        if(data[0].id_turno==0){
          // this.showInfo(1);
        }
        // El local no esta disponible
        else if(data[0].id_turno==1){
          // this.showInfo(2);
        }
        // Turno agarrado, regresa el numero de turno
        else{
          this.turnoService.empresaElegida.id_turno= data[0].id_turno
        }
        
    })
  }

  // showInfo(id:number) {
  //   if(id==2){
  //     this.toastr.success("Local no disponible");}
  //   else if(id==1){this.toastr.warning("Ya tiene un turno activo en este local")}
  // }

  ngOnInit(): void {
    this.elId = this.usuarioEmpresa.id_usuario_empresa;
    console.log("Hola" + this.elId)
  }
}

