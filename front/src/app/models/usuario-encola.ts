export class UsuarioEncola {
    public id_turno: number;
    public id_usuario_cliente:number
    public nombre_cliente:string;
    public apellidos_cliente: string;
    public telefono: string;
    public imagen_url: string;
    public karma:string

    constructor(id_turno:number,id_usuario_cliente:number, nombre_cliente:string, apellido_cliente:string, telefono:string, imagen_url: string){

        this.id_turno=id_turno;
        this.id_usuario_cliente=id_usuario_cliente;
        this.nombre_cliente=nombre_cliente;
        this.apellidos_cliente=apellido_cliente;
        this.telefono=telefono;
        this.imagen_url=imagen_url;
        this.karma="green"
    }
}
