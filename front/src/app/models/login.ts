export class Login {
    public id_login:number;
    public id_usuario_cliente:number;
    public id_usuario_empresa:number;
    public email:string;
    public contraseña:string;

    constructor(id_login:number=0, 
                id_usuario_cliente:number=0, 
                id_usuario_empresa:number=0, 
                email:string='', 
                contraseña:string='') {

        this.id_login = id_login;
        this.id_usuario_cliente = id_usuario_cliente;
        this.id_usuario_empresa = id_usuario_empresa;
        this.email = email;
        this.contraseña = contraseña;
    }

    consultarTipoUsuario():string  {
        if(this.id_usuario_cliente == 0)    {
            return 'empresa';
        }else   {
            return 'cliente';
        }
    }
}
