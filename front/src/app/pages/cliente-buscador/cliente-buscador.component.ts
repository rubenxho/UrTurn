import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';


@Component({
  selector: 'app-cliente-buscador',
  templateUrl: './cliente-buscador.component.html',
  styleUrls: ['./cliente-buscador.component.css']
})
export class ClienteBuscadorComponent implements OnInit {
  
    

  constructor(public localService: LocalServiceService) { 
    
  }

  buscarLocal(categoria:string, cp:string)
  {

    this.localService.getLocales(categoria, parseInt(cp)).subscribe((data: any) => {
      console.log(data);
      
      this.localService.locales = data;
      this.localService.mostrarTarjetas = true;
    })
  }

  

  ngOnInit(): void {
  }

}
