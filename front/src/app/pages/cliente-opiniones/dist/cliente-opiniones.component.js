"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteOpinionesComponent = void 0;
var core_1 = require("@angular/core");
var opiniones_1 = require("src/app/models/opiniones");
var usuario_empresa_1 = require("src/app/models/usuario-empresa");
var ClienteOpinionesComponent = /** @class */ (function () {
    function ClienteOpinionesComponent(opinionesService) {
        this.opinionesService = opinionesService;
        this.locales = [
            new usuario_empresa_1.UsuarioEmpresa(0, 'S1', 'restaurante', '1231231', 123123, 'espana', 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg', 'ok', 1, 2, 3, 'urturn', []),
            new usuario_empresa_1.UsuarioEmpresa(0, 'S2', 'restaurante', '1231231', 123123, 'espana', 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg', 'ok', 1, 2, 3, 'urturn', []),
            new usuario_empresa_1.UsuarioEmpresa(0, 'S3', 'restaurante', '1231231', 123123, 'espana', 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg', 'ok', 1, 2, 3, 'urturn', []),
            new usuario_empresa_1.UsuarioEmpresa(0, 'S4', 'restaurante', '1231231', 123123, 'espana', 'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg', 'ok', 1, 2, 3, 'urturn', []),
        ];
        this.opiniones = [
            new opiniones_1.Opiniones(1, 1, '', '', 1, '', '', 5, 'genial'),
            new opiniones_1.Opiniones(1, 2, '', '', 1, '', '', 5, 'genial'),
            new opiniones_1.Opiniones(1, 3, '', '', 1, '', '', 5, 'genial'),
        ];
        // dos campos
        this.comentar = true;
        this.comentarios = false;
        // campo de comentar
        this.comentarAzul = true;
        //para el corazon de favorito
        this.favorito = false;
        this.quitarTarjeta = false;
    }
    ClienteOpinionesComponent.prototype.fav = function () {
        this.favorito = !this.favorito;
    };
    ClienteOpinionesComponent.prototype.dejarOpinar = function () {
        this.quitarTarjeta = true;
    };
    ClienteOpinionesComponent.prototype.comentarCampo = function () {
        this.comentar = true;
        this.comentarios = false;
        this.comentarAzul = true;
    };
    ClienteOpinionesComponent.prototype.comentariosCampo = function () {
        this.comentarios = true;
        this.comentar = false;
        this.comentarAzul = false;
    };
    ClienteOpinionesComponent.prototype.opinionesCliente = function () {
        var _this = this;
        this.opinionesService.getOpiniones().subscribe(function (date) {
            _this.opiniones = date; // opiniones debe definir separatamente
        });
    };
    ClienteOpinionesComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], ClienteOpinionesComponent.prototype, "usuarioEmpresa");
    ClienteOpinionesComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente-opiniones',
            templateUrl: './cliente-opiniones.component.html',
            styleUrls: ['./cliente-opiniones.component.css']
        })
    ], ClienteOpinionesComponent);
    return ClienteOpinionesComponent;
}());
exports.ClienteOpinionesComponent = ClienteOpinionesComponent;
