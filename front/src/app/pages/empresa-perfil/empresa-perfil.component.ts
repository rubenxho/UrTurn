import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-perfil',
  templateUrl: './empresa-perfil.component.html',
  styleUrls: ['./empresa-perfil.component.css']
})
export class EmpresaPerfilComponent implements OnInit {

  public empresaPerfil: string [];

  constructor() { 

    this.empresaPerfil = ["modalModificar","¿Seguro que desea enviar su perfil?", "Sí", "No", "Perfil enviado, gracias"];

  }

  ngOnInit(): void {
  }

}
