import { Opiniones } from "./opiniones";

export class UsuarioEmpresa {
    public id_usuario_empresa:number;
    public nombre_empresa:string;
    public categoria:string;
    public telefono:string;
    public codigo_postal:number;
    public direccion:string;
    public imagen_url:string;
    public descripcion:string;
    public apertura:any;
    public cierre:any;
    public tiempo_espera:number; //en minutos
    public logo:string;
    public opiniones:Opiniones[];

    constructor(id_usuario_empresa:number=0, 
                nombre_empresa:string='', 
                categoria:string='',
                telefono:string='',
                codigo_postal:number=0,
                direccion:string='',
                imagen_url:string='',
                descripcion:string='',
                apertura:any=null,
                cierre:any=null,
                tiempo_espera:number=0,
                logo:string='',
                opiniones:Opiniones[]=[]) {

        this.id_usuario_empresa = id_usuario_empresa;
        this.nombre_empresa = nombre_empresa;
        this.categoria = categoria;
        this.telefono = telefono;
        this.codigo_postal = codigo_postal;
        this.direccion = direccion;
        this.imagen_url = imagen_url;
        this.descripcion = descripcion;
        this.apertura = apertura;
        this.cierre = cierre;
        this.tiempo_espera = tiempo_espera;
        this.logo = logo;
        this.opiniones = opiniones;
    }  

    public calcularCalificacion():number    {
        let sumatorio = 0;

        for(let i=0; i<this.opiniones.length; i++)  {
            sumatorio += this.opiniones[i].nota;
        }

        return sumatorio/this.opiniones.length;
    }
}