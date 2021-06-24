"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteRegistroComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ClienteRegistroComponent = /** @class */ (function () {
    function ClienteRegistroComponent(navigation, formBuilder) {
        this.navigation = navigation;
        this.formBuilder = formBuilder;
        this.passValid = true;
        this.myForm = this.buildForm();
        this.rsocialValid = true;
        this.passValid = true;
        this.emailValid = true;
        this.telefonoValid = true;
    }
    ClienteRegistroComponent.prototype.buildForm = function () {
        var minPasswordLength = 6;
        var myForm = this.formBuilder.group({
            rsocial: [, forms_1.Validators.required],
            password: [, [forms_1.Validators.required, forms_1.Validators.minLength(minPasswordLength)]],
            email: [, [forms_1.Validators.required, forms_1.Validators.email]],
            telefono: [, [forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{9}")]]
        });
        return myForm;
    };
    ClienteRegistroComponent.prototype.validarUsername = function () {
        var _a;
        if ((_a = this.myForm.get('rsocial')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.rsocialValid = false;
        }
        else {
            this.rsocialValid = true;
        }
    };
    ClienteRegistroComponent.prototype.validarPassword = function () {
        var _a;
        if ((_a = this.myForm.get('password')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.passValid = false;
        }
        else {
            this.passValid = true;
        }
    };
    ClienteRegistroComponent.prototype.validarRep = function (password, rep) {
        if (password === rep) {
            return true;
        }
        else {
            return false;
        }
    };
    ClienteRegistroComponent.prototype.validarEmail = function () {
        var _a;
        if ((_a = this.myForm.get('email')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.emailValid = false;
        }
        else {
            this.emailValid = true;
        }
    };
    ClienteRegistroComponent.prototype.validarTelefono = function () {
        var _a;
        if ((_a = this.myForm.get('telefono')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.telefonoValid = false;
        }
        else {
            this.telefonoValid = true;
        }
    };
    ClienteRegistroComponent.prototype.validar = function (tipoUsuario) {
        this.validarUsername();
        this.validarPassword();
        this.validarEmail();
        this.validarTelefono();
        if (this.myForm.valid) {
            alert('guardar usuario cliente');
            // this.redirigir(`${tipoUsuario}Home`);
        }
    };
    ClienteRegistroComponent.prototype.redirigir = function (componente) {
        this.navigation.navigate([componente]);
    };
    ClienteRegistroComponent.prototype.ngOnInit = function () {
    };
    ClienteRegistroComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente-registro',
            templateUrl: './cliente-registro.component.html',
            styleUrls: ['./cliente-registro.component.css']
        })
    ], ClienteRegistroComponent);
    return ClienteRegistroComponent;
}());
exports.ClienteRegistroComponent = ClienteRegistroComponent;
