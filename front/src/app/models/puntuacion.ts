export class Puntuacion {

    public id_puntuacion: number;
    public id_usuario_cliente: number;
    public id_usuario_empresa: number;
    public nota: number;
    public date: string;

    constructor(id_puntuacion:number=0, 
                id_usuario_cliente:number=0, 
                id_usuario_empresa:number=0, 
                nota:number=0, 
                date:any=new Date(Date.now()))  {

        this.id_puntuacion = id_puntuacion;
        this.id_usuario_cliente =id_usuario_cliente;
        this.id_usuario_empresa = id_usuario_empresa;
        this.date = date;
        this.nota = nota;
    }
}
