export class EmpresaEncola {

    public id_turno: number;
    public id_usuario_empresa:number
    public logo: string;
    public nombre_empresa: string;
    public tiempo_espera: string;

    constructor(id_turno:number,id_usuario_empresa:number, logo:string , nombre_empresa:string, tiempo_espera:string){

        this.id_turno=id_turno;
        this.id_usuario_empresa=id_usuario_empresa;
        this.logo=logo;
        this.nombre_empresa=nombre_empresa;
        this.tiempo_espera=tiempo_espera;
    }
}
