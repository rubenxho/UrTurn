export class OpinionRechazada {
  public constructor(public id_cliente: number, public id_empresa: number) {}
}

export class Opiniones {
   public id_opiniones: number;
   public id_usuario_cliente: number;
   public usuario_nombre_cliente: string;
   public usuario_imagen_cliente: string;
   public id_usuario_empresa: number;
   public usuario_nombre_empresa: string;
   public usuario_imagen_empresa: string;
   public nota: number;
   public opinion: string;
   public fecha: Date;

  constructor(
    id_opiniones: number = 0,
    id_usuario_cliente: number = 0,
    usuario_nombre_cliente: string = '',
    usuario_imagen_cliente: string = '',
    id_usuario_empresa: number = 0,
    usuario_nombre_empresa: string = '',
    usuario_imagen_empresa: string = '',
    nota: number = 0,
    opinion: string = '',
    fecha: Date=new Date(Date.now()),
  ) {
    this.id_opiniones = id_opiniones;
    this.id_usuario_cliente = id_usuario_cliente;
    this.usuario_nombre_cliente = usuario_nombre_cliente;
    this.usuario_imagen_cliente = usuario_imagen_cliente;
    this.id_usuario_empresa = id_usuario_empresa;
    this.usuario_nombre_empresa = usuario_nombre_empresa;
    this.usuario_imagen_empresa = usuario_imagen_empresa;
    this.nota = nota;
    this.opinion = opinion;
    this.fecha = fecha;
  }

  static create(
    id_usuario_cliente: number = 0,
    id_usuario_empresa: number = 0,
    nota: number = 0,
    opinion: string = ''
  ) {
    return new Opiniones(
      0,
      id_usuario_cliente,
      '',
      '',
      id_usuario_empresa,
      '',
      '',
      nota,
      opinion
    );
  }
}
