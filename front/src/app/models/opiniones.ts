export class Opiniones {
    public id_opiniones:number;
    public id_usuario_cliente:number;
    public usuario_cliente_nombre:string;
    public usuario_cliente_imagen:string;
    public id_usuario_empresa:number;
    public usuario_empresa_nombre:string;
    public usuario_empresa_imagen:string;
    public nota:number;
    public opinion:string;
    public fecha:Date;

    constructor(id_opiniones:number=0, 
                id_usuario_cliente:number=0, 
                usuario_cliente_nombre:string="",
                usuario_cliente_imagen:string="",
                id_usuario_empresa:number=0, 
                usuario_empresa_imagen:string="",
                usuario_empresa_nombre:string="",
                nota:number=0, 
                opinion:string='')  {
        
        this.id_opiniones = id_opiniones;
        this.id_usuario_cliente = id_usuario_cliente;
        this.usuario_cliente_nombre=usuario_cliente_nombre;
        this.usuario_cliente_imagen=usuario_cliente_imagen;
        this.id_usuario_empresa = id_usuario_empresa;
        this.usuario_empresa_nombre = usuario_empresa_nombre;
        this.usuario_empresa_imagen = usuario_empresa_imagen;
        this.nota = nota;
        this.opinion = opinion;
        this.fecha = new Date(Date.now());
    }
}
