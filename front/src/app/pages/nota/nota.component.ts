import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css'],
})
export class NotaComponent implements OnInit {
  public estrellas: any[] = [];
  private readonly totalEstrellas = 5;

  @Input() nota: number;
  constructor() {}

  ngOnInit(): void {
    const estrellasColor = Math.round(this.nota);
    const estrellasSincolor = this.totalEstrellas - estrellasColor;
    
    for (let i = 0; i < estrellasColor; i++) {
      this.estrellas.push({ color: true });
    }

    for (let i = 0; i < estrellasSincolor; i++) {
      this.estrellas.push({ color: false });
    }
  }
}
