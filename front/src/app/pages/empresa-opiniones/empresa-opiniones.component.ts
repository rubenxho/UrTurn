import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-opiniones',
  templateUrl: './empresa-opiniones.component.html',
  styleUrls: ['./empresa-opiniones.component.css']
})
export class EmpresaOpinionesComponent implements OnInit {

  @Input() opinionHijo:any
  
  public data:any = {
    estrellas:0
  }
  constructor() {
   this.opinionHijo = {img:"", nombre:"", opinion:"", nota: 0, fecha:""}
    
   }

  ngOnInit(): void {
  }

  handleStar(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.data[ index ] = value;
    console.log(this.data)
  }
}
