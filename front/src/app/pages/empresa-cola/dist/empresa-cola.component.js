"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaColaComponent = void 0;
var core_1 = require("@angular/core");
var puntuacion_1 = require("src/app/models/puntuacion");
var EmpresaColaComponent = /** @class */ (function () {
    function EmpresaColaComponent(puntuacionService) {
        this.puntuacionService = puntuacionService;
        this.mensajeModalCola = [
            'modalModificarCola',
            'Confirmar nuevo tiempo de espera',
            'Confirmar',
            'Cancelar',
            'Tiempo modificado correctamente!',
        ];
        this.mensajeModalAvanzar = [
            'modalAvanzar',
            '¿Desea avanzar la cola?',
            'Si',
            'No',
            'Cola avanzada correctamente',
        ];
        this.ampliarUsuario = true;
        this.infoUsuario = 'usuario1';
        //inicializar newPuntuacion
        this.newPuntuacion = new puntuacion_1.Puntuacion(0, 0, 0);
    }
    //funcion crear nueva puntuacion
    EmpresaColaComponent.prototype.crearPuntuacion = function (id_usuario_cliente, id_usuario_empresa, date) {
        var newPuntuacion = new puntuacion_1.Puntuacion(0, id_usuario_cliente, id_usuario_empresa);
        this.puntuacionService.addPuntuacion(newPuntuacion).subscribe(function (data) {
            console.log(data);
        });
    };
    EmpresaColaComponent.prototype.ngOnInit = function () { };
    EmpresaColaComponent.prototype.mostrarUsuario = function (nombre) {
        this.infoUsuario = nombre;
    };
    EmpresaColaComponent.prototype.modificar = function () {
        this.ampliarUsuario = false;
    };
    EmpresaColaComponent = __decorate([
        core_1.Component({
            selector: 'app-empresa-cola',
            templateUrl: './empresa-cola.component.html',
            styleUrls: ['./empresa-cola.component.css']
        })
    ], EmpresaColaComponent);
    return EmpresaColaComponent;
}());
exports.EmpresaColaComponent = EmpresaColaComponent;
