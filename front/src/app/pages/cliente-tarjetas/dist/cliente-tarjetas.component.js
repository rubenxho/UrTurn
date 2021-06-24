"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteTarjetasComponent = void 0;
var core_1 = require("@angular/core");
var ClienteTarjetasComponent = /** @class */ (function () {
    function ClienteTarjetasComponent(localService) {
        this.localService = localService;
        this.usuarioEmpresas = [];
        this.ticket = 1150;
        //atributo para hacer favorito
        this.enCola = false;
        this.favorito = false;
    }
    //method para guardar a favorito
    ClienteTarjetasComponent.prototype.fav = function () {
        this.favorito = !this.favorito;
    };
    // confirma hace la cola
    ClienteTarjetasComponent.prototype.comfirmadoCola = function () {
        this.enCola = true;
    };
    ClienteTarjetasComponent.prototype.obtenerLocalAll = function () {
        // return this.localService.
        // connectar con LocalServiceService de David
    };
    ClienteTarjetasComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], ClienteTarjetasComponent.prototype, "usuarioEmpresa");
    ClienteTarjetasComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente-tarjetas',
            templateUrl: './cliente-tarjetas.component.html',
            styleUrls: ['./cliente-tarjetas.component.css']
        })
    ], ClienteTarjetasComponent);
    return ClienteTarjetasComponent;
}());
exports.ClienteTarjetasComponent = ClienteTarjetasComponent;
