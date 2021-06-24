"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaHomeComponent = void 0;
var core_1 = require("@angular/core");
var EmpresaHomeComponent = /** @class */ (function () {
    function EmpresaHomeComponent() {
        this.estadoCola = true;
        this.mensajeModal = ["modalModificar", "Confirmar nuevo tiempo de espera", "Confirmar", "Cancelar", "Tiempo modificado correctamente!"];
        // Array(pos0: etiqueta modal, pos1: pregunta, pos2: op1 pregunta, pos3:op2 pregunta, pos4: estadocola, pos5: flag para pos4)
        this.mensajeModalIniciar = ["modalIniciar", "Confirmar si desea iniciar la cola", "Confirmar", "Cancelar", "Se ha iniciado la cola", this.estadoCola, "1"];
        this.mensajeModalDetener = ["modalDetener", "Confirmar si desea detener la cola", "Confirmar", "Cancelar", "Se ha detenido la cola", this.estadoCola, "1"];
    }
    EmpresaHomeComponent.prototype.botonIniciarDetener = function (cola) {
        if (cola == true) {
            this.estadoCola = false;
            this.mensajeModalIniciar[5] = this.estadoCola;
            this.mensajeModalDetener[5] = this.estadoCola;
        }
        else {
            this.estadoCola = true;
            this.mensajeModalIniciar[5] = this.estadoCola;
            this.mensajeModalDetener[5] = this.estadoCola;
        }
    };
    EmpresaHomeComponent.prototype.ngOnInit = function () {
    };
    EmpresaHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-empresa-home',
            templateUrl: './empresa-home.component.html',
            styleUrls: ['./empresa-home.component.css']
        })
    ], EmpresaHomeComponent);
    return EmpresaHomeComponent;
}());
exports.EmpresaHomeComponent = EmpresaHomeComponent;
