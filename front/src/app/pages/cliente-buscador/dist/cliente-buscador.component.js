"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteBuscadorComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var ClienteBuscadorComponent = /** @class */ (function () {
    function ClienteBuscadorComponent() {
        this.eventoMostrar = new core_1.EventEmitter();
        this.sustituir = true;
        this.sustituir;
    }
    ClienteBuscadorComponent.prototype.mostrarTarjetas = function () {
        console.log("funciion mostrarTarjetas");
        this.eventoMostrar.emit(this.sustituir);
    };
    ClienteBuscadorComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_2.Output()
    ], ClienteBuscadorComponent.prototype, "eventoMostrar");
    ClienteBuscadorComponent = __decorate([
        core_2.Component({
            selector: 'app-cliente-buscador',
            templateUrl: './cliente-buscador.component.html',
            styleUrls: ['./cliente-buscador.component.css']
        })
    ], ClienteBuscadorComponent);
    return ClienteBuscadorComponent;
}());
exports.ClienteBuscadorComponent = ClienteBuscadorComponent;
