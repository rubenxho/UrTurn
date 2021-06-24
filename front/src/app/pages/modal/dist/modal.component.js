"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalComponent = void 0;
var core_1 = require("@angular/core");
var ModalComponent = /** @class */ (function () {
    function ModalComponent(toastr) {
        this.toastr = toastr;
        this.eventoCola = new core_1.EventEmitter();
        // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
        this.mensajeModal = [];
    }
    //Funcion para modificar cambios de estados en el home-empresa (Iniciar/detener)
    ModalComponent.prototype.modificar = function (mensajeToast) {
        if (this.mensajeModal[6]) {
            if (this.mensajeModal[5]) {
                this.llamarEventoCola(true);
            }
            else {
                this.llamarEventoCola(false);
            }
        }
        this.showSuccess(mensajeToast);
    };
    ModalComponent.prototype.rechazar = function (mensaje) {
        this.toastr.error(mensaje);
    };
    ModalComponent.prototype.showSuccess = function (mensaje) {
        this.toastr.success(mensaje);
    };
    ModalComponent.prototype.llamarEventoCola = function (cola) {
        this.eventoCola.emit(cola);
    };
    ModalComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "mensajeModal");
    __decorate([
        core_1.Output()
    ], ModalComponent.prototype, "eventoCola");
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'app-modal',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.css']
        })
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
