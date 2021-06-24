"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientePerfilComponent = void 0;
var core_1 = require("@angular/core");
var ClientePerfilComponent = /** @class */ (function () {
    function ClientePerfilComponent() {
        this.data = {
            img: "",
            name: "",
            lastname: "",
            password: "",
            repeatPassword: "",
            phone: "",
            mail: ""
        };
        this.guardarModal = ["modalModificar", "Realizar cambios", "Si", "Cancelar", "Cambios guardados"];
    }
    ClientePerfilComponent.prototype.ngOnInit = function () {
    };
    ClientePerfilComponent.prototype.handelChange = function (event) {
        var index = event.target.name;
        var value = event.target.value;
        this.data[index] = value;
    };
    ClientePerfilComponent.prototype.handelClick = function () {
        console.log(this.data);
    };
    ClientePerfilComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente-perfil',
            templateUrl: './cliente-perfil.component.html',
            styleUrls: ['./cliente-perfil.component.css']
        })
    ], ClientePerfilComponent);
    return ClientePerfilComponent;
}());
exports.ClientePerfilComponent = ClientePerfilComponent;
