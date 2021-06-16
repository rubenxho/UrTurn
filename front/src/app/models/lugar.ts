export class Lugar {
  nombre: string;
  dirección: string;
  tiempoAprox: string;
  descripción: string;
  constructor(
    nombre: string,
    dirección: string,
    tiempoAprox: string,
    descripción: string
  ) {
    this.nombre = nombre;
    this.dirección = dirección;
    this.tiempoAprox = tiempoAprox;
    this.descripción = descripción;
  }
}
