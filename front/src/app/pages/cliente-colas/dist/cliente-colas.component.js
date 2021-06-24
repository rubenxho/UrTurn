"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteColasComponent = void 0;
var core_1 = require("@angular/core");
var ClienteColasComponent = /** @class */ (function () {
    function ClienteColasComponent() {
        this.clienteCola = ['modalModificar', '¿Confirmas hacer la cola?', 'Sí', 'No', 'Salir de cola'];
    }
    ClienteColasComponent.prototype.ngOnInit = function () {
    };
    ClienteColasComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente-colas',
            templateUrl: './cliente-colas.component.html',
            styleUrls: ['./cliente-colas.component.css']
        })
    ], ClienteColasComponent);
    return ClienteColasComponent;
}());
exports.ClienteColasComponent = ClienteColasComponent;
