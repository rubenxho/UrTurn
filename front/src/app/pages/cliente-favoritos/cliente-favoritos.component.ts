import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';

@Component({
  selector: 'app-cliente-favoritos',
  templateUrl: './cliente-favoritos.component.html',
  styleUrls: ['./cliente-favoritos.component.css'],
})
export class ClienteFavoritosComponent implements OnInit {
  
  public locales: UsuarioEmpresa[];
  constructor() {

    this.locales = [
      
    ];
  }

  ngOnInit(): void {}
}
