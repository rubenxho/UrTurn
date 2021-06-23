export class Favoritos {
    
    public id_favoritos:number;
    public id_usuario_cliente:number;
    public id_usuario_empresa:number;
    public fecha:Date;

    constructor(id_favoritos:number=0, id_usuario_cliente:number=0, id_usuario_empresa=0)    {
        this.id_favoritos = id_favoritos;
        this.id_usuario_cliente = id_usuario_cliente;
        this.id_usuario_empresa = id_usuario_empresa;
        this.fecha = new Date(Date.now());
    }
}
