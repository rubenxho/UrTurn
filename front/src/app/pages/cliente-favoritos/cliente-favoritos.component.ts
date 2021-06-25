import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LocalServiceService } from 'src/app/services/local-service.service';

@Component({
  selector: 'app-cliente-favoritos',
  templateUrl: './cliente-favoritos.component.html',
  styleUrls: ['./cliente-favoritos.component.css'],
})
export class ClienteFavoritosComponent implements OnInit {
  
  public locales: UsuarioEmpresa[];
  constructor(private localService: LocalServiceService) {
    this.locales = [];
  }

  

    muestraLocal(id: number){
    
      this.localService.getLocal(id).subscribe( (data: any) => {
        this.locales = data;
      
    })
  }
    

  ngOnInit(): void {}

}