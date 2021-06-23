export class Opiniones {
    public id_opiniones:number;
    public id_usuario_cliente:number;
    public id_usuario_empresa:number;
    public nota:number;
    public opinion:string;
    public fecha:Date;

    constructor(id_opiniones:number=0, 
                id_usuario_cliente:number=0, 
                id_usuario_empresa:number=0, 
                nota:number=0, 
                opinion:string='')  {
        
        this.id_opiniones = id_opiniones;
        this.id_usuario_cliente = id_usuario_cliente;
        this.id_usuario_empresa = id_usuario_empresa;
        this.nota = nota;
        this.opinion = opinion;
        this.fecha = new Date(Date.now());
    }
}
