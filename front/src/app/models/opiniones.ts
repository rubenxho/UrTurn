export class OpinionRechazada {
  public constructor(public id_cliente: number, public id_empresa: number) {}
}

export class Opiniones {
  public id_opiniones: number;
  public id_usuario_cliente: number;
  public nombre_cliente: string;
  public usuario_cliente_imagen: string;
  public id_usuario_empresa: number;
  public usuario_empresa_nombre: string;
  public ususario_empresa_imagen: string;
  public nota: number;
  public opinion: string;
  public fecha: Date;

  constructor(
    id_opiniones: number = 0,
    id_usuario_cliente: number = 0,
    nombre_cliente: string = '',
    usuario_cliente_imagen: string = '',
    id_usuario_empresa: number = 0,
    ususario_empresa_imagen: string = '',
    usuario_empresa_nombre: string = '',
    nota: number = 0,
    opinion: string = ''
  ) {
    this.id_opiniones = id_opiniones;
    this.id_usuario_cliente = id_usuario_cliente;
    this.nombre_cliente = nombre_cliente;
    this.usuario_cliente_imagen = usuario_cliente_imagen;
    this.id_usuario_empresa = id_usuario_empresa;
    this.usuario_empresa_nombre = usuario_empresa_nombre;
    this.ususario_empresa_imagen = ususario_empresa_imagen;
    this.nota = nota;
    this.opinion = opinion;
    this.fecha = new Date(Date.now());
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
