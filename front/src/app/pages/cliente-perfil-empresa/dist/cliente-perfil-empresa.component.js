"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientePerfilEmpresaComponent = void 0;
var core_1 = require("@angular/core");
var ClientePerfilEmpresaComponent = /** @class */ (function () {
    function ClientePerfilEmpresaComponent(router, toastr) {
        this.router = router;
        this.toastr = toastr;
        this.favorito = false;
        this.frase = "";
        /*****************/
        this.ColaPosicion = 5;
        this.mensajeModalAvisar = "Est\u00E1s en la cola, numero " + this.ColaPosicion;
        this.clienteCola = ["modalModificar", "¿Confirmas hacer la cola?", "Sí", "No", this.mensajeModalAvisar];
    }
    ClientePerfilEmpresaComponent.prototype.fav = function () {
        console.log(this.favorito);
        this.favorito = !this.favorito;
        if (this.frase === 'Has guardado este lugar a favorito!') {
            this.frase = 'Has cancelado el favorito';
            this.showSucces();
        }
        else {
            this.frase = 'Has guardado este lugar a favorito!';
            this.showSucces();
        }
    };
    ClientePerfilEmpresaComponent.prototype.goBack = function () {
        this.router.navigate(['/app-cliente-tarjetas']);
    };
    ClientePerfilEmpresaComponent.prototype.showSucces = function () {
        this.toastr.success(this.frase);
    };
    ClientePerfilEmpresaComponent.prototype.ngOnInit = function () {
    };
    ClientePerfilEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente-perfil-empresa',
            templateUrl: './cliente-perfil-empresa.component.html',
            styleUrls: ['./cliente-perfil-empresa.component.css']
        })
    ], ClientePerfilEmpresaComponent);
    return ClientePerfilEmpresaComponent;
}());
exports.ClientePerfilEmpresaComponent = ClientePerfilEmpresaComponent;
