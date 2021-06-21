import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteOpinionesResenarService {
  private noteReview: any[] = [
    {
      nombre: 'Sobrino de Botín',
      img: 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
      tiempo: 40,
    },
    {
      nombre: 'Sobrino de Botín',
      img: 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
      tiempo: 20,
    },
    {
      nombre: 'GYM',
      img: 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
      tiempo: 15,
    },
    {
      nombre: 'Sobrino de Botín',
      img: 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
      tiempo: 25,
    },
    {
      nombre: 'Sobrino de Botín',
      img: 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
      tiempo: 20,
    },
  ];

  constructor() {}
  listarResenasPorCliente(id: string): any[] {
    return this.noteReview;
  }
}
