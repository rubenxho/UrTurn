export class Turnocliente {
    public id_turno: number;
    public id_usuario_empresa:number;
    public nombre_empresa: string;
    public tiempo_espera: string;
    public logo:string;

    constructor(id_turno: number, id_usuario_empresa:number, nombre_empresa: string, tiempo_espera: string,logo:string){
        this.id_turno=id_turno;
        this.id_usuario_empresa=id_usuario_empresa;
        this.nombre_empresa=nombre_empresa;
        this.tiempo_espera=tiempo_espera;
        this.logo=logo
    }
}
