"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaPerfilComponent = void 0;
var core_1 = require("@angular/core");
var EmpresaPerfilComponent = /** @class */ (function () {
    function EmpresaPerfilComponent() {
        this.empresaPerfil = ["modalModificar", "¿Seguro que desea enviar su perfil?", "Sí", "No", "Perfil enviado, gracias"];
    }
    EmpresaPerfilComponent.prototype.ngOnInit = function () {
    };
    EmpresaPerfilComponent = __decorate([
        core_1.Component({
            selector: 'app-empresa-perfil',
            templateUrl: './empresa-perfil.component.html',
            styleUrls: ['./empresa-perfil.component.css']
        })
    ], EmpresaPerfilComponent);
    return EmpresaPerfilComponent;
}());
exports.EmpresaPerfilComponent = EmpresaPerfilComponent;
