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
      ),
      new UsuarioEmpresa(
        0,
        'S3',
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
        'S4',
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
    ];
  }

  

    muestraLocal(id: number){
    
      this.localService.getLocal(id).subscribe( (data: any) => {
        this.locales = data;
      
    })
  }
    

  ngOnInit(): void {}

}