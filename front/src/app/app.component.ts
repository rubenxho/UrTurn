import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public header:string;
  public estado:boolean;

  constructor(public ls:LoginService) {
    this.header = 'Empresa';
    this.estado = false;
  }

  tipoUsuario(usuario: string) {
    console.log('Mensaje desde app');
    if (usuario == 'empresa') {
      this.header = 'Empresa';
    } else {
      this.header = 'Cliente';
    }
  }

  ngOnInit() {
    $('.showtoast').click(function () {
      $('.toast').toast('show');
    });
  }
  title = 'urturn';
}
