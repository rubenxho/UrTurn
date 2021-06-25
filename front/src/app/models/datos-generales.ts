export class DatosGenerales {
    public numero_clientes_cola: number;
    public numero_ticket:number;
    public proximo_cliente: string;
    public clientes_atendidos: number;

    constructor(numero_clientes_cola:number, numero_ticket:number, proximo_cliente:string, clientes_atendidos:number){

        this.numero_clientes_cola=numero_clientes_cola;
        this.numero_ticket=numero_ticket;
        this.proximo_cliente=proximo_cliente;
        this.clientes_atendidos=clientes_atendidos;

        
    }
}
