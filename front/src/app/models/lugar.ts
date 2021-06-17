export class Lugar {
  name: string;
  category:string;
  phone:string;
  direction: string;
  tiempoAprox: string;
  descripción: string;
  constructor(
    name: string,
    category:string,
    phone:string,
    direction: string,
    tiempoAprox: string,
    descripción: string
  ) {
    this.name = name;
    this.category = category;
    this.phone = phone;
    this.direction = direction;
    this.tiempoAprox = tiempoAprox;
    this.descripción = descripción;
  }
}
