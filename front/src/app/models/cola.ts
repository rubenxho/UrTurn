export class Cola {
    
    public id_cola:number;
    public id_usuario_cliente:number;
    public id_usuario_empresa:number;
    public entrada:Date;
    public salida:any;
    public status:string;
    public posicion:number;

    constructor (id_cola:number=0, 
                id_usuario_cliente:number=0, 
                id_usuario_empresa:number=0,   
                status:string='', 
                posicion:number=0)    {

        this.id_cola = id_cola;
        this.id_usuario_cliente = id_usuario_cliente;
        this.id_usuario_empresa = id_usuario_empresa;
        this.entrada = new Date(Date.now());
        this.salida = null;
        this.status = status;
        this.posicion = posicion;
    }

    public finalizarCola():void {
        this.salida = new Date(Date.now());
    }
}
