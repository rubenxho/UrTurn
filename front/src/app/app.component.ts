import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  public header:string;
  public estado:string;
  
  constructor(){
    this.header="Cliente"
    this.estado="dconectado"
    
  }

  tipoUsuario(usuario:string){
    console.log("Mensaje desde app")
    this.estado=""
    if(usuario=="empresa"){
      this.header="Empresa"
    }
    else{
      this.header="Cliente"
    }
  }

  ngOnInit() {
    $('.showtoast').click(function () {
      $('.toast').toast('show');
    });
  }
  title = 'urturn';
}
