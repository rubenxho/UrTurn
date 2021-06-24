import { Cola } from "./cola";
import { Puntuacion } from "./puntuacion";
import { UsuarioEmpresa } from "./usuario-empresa";

export class UsuarioCliente {
    public id_usuario_cliente:number;
    public nombre_cliente:string;
    public apellidos_cliente:string;
    public telefono:string;
    public imagen_url:string;
    public colas:Cola[];
    public favoritos:UsuarioEmpresa[];
    public puntuacion:Puntuacion[];
    public email:string;
    public password:string;

    constructor(id_usuario_cliente:number=0, 
                nombre_cliente:string='', 
                apellidos_cliente:string='',
                telefono:string='',
                imagen_url:string='',
                email:string='',
                password:string='') {

        this.id_usuario_cliente = id_usuario_cliente;
        this.nombre_cliente = nombre_cliente;
        this.apellidos_cliente = apellidos_cliente;
        this.telefono = telefono;
        this.imagen_url = imagen_url;
        this.email = email;
        this.password = password;
        this.colas = [];
        this.favoritos = [];
        this.puntuacion = [];
    }  

    public pedirTurno(cola:Cola):void    {
        this.colas.push(cola);
    }

    public agregarFavorito(empresa:UsuarioEmpresa):void {
        this.favoritos.push(empresa);
    }

    public agregarPuntuacion(puntuacion:Puntuacion):void    {
        this.puntuacion.push(puntuacion);
    }
}

