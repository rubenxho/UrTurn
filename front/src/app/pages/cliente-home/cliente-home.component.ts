import { Component, OnInit, Input } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  
  public mostrarTarjetas:boolean

  // para localEmpresa
  @Input() usuarioEmpresa: any;

  public local: UsuarioEmpresa;
  public locales: UsuarioEmpresa[];

  /*********************************/
  constructor(private localService: LocalServiceService) { 

    //inicializar local
    this.local = new UsuarioEmpresa ();
    this.usuarioEmpresa = null;
    this.locales = [
      new UsuarioEmpresa(
        0,
        'S1',
        'restaurante',
        '1231231',
        123123,
        'espana',
        'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
        'ok',
        1,
        2,
        3,
        'urturn',
        []
      ),
      new UsuarioEmpresa(
        0,
        'S2',
        'restaurante',
        '1231231',
        123123,
        'espana',
        'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
        'ok',
        1,
        2,
        3,
        'urturn',
        []
      )
    ];
    //*************************/

    this.mostrarTarjetas=false
  }

  eventoMostrar(sustituir:boolean){
    this.mostrarTarjetas=sustituir
  }

  // muestraLocal(){
    
  //   console.log(this.usuarioEmpresa)
  //   this.localService.localElegido = this.usuarioEmpresa
    
  // }

  ngOnInit(): void {
  }

}
