"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpresaRegistroComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var usuario_empresa_1 = require("src/app/models/usuario-empresa");
var EmpresaRegistroComponent = /** @class */ (function () {
    function EmpresaRegistroComponent(navigation, formBuilder, rs) {
        this.navigation = navigation;
        this.formBuilder = formBuilder;
        this.rs = rs;
        this.passValid = true;
        this.myForm = this.buildForm();
        this.rsocialValid = true;
        this.passValid = true;
        this.emailValid = true;
        this.telefonoValid = true;
    }
    EmpresaRegistroComponent.prototype.buildForm = function () {
        var minPasswordLength = 6;
        var myForm = this.formBuilder.group({
            rsocial: [, forms_1.Validators.required],
            password: [, [forms_1.Validators.required, forms_1.Validators.minLength(minPasswordLength)]],
            email: [, [forms_1.Validators.required, forms_1.Validators.email]],
            telefono: [, [forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{9}")]]
        });
        return myForm;
    };
    EmpresaRegistroComponent.prototype.validarUsername = function () {
        var _a;
        if ((_a = this.myForm.get('rsocial')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.rsocialValid = false;
        }
        else {
            this.rsocialValid = true;
        }
    };
    EmpresaRegistroComponent.prototype.validarPassword = function () {
        var _a;
        if ((_a = this.myForm.get('password')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.passValid = false;
        }
        else {
            this.passValid = true;
        }
    };
    EmpresaRegistroComponent.prototype.validarRep = function (password, rep) {
        if (password === rep) {
            return true;
        }
        else {
            return false;
        }
    };
    EmpresaRegistroComponent.prototype.validarEmail = function () {
        var _a;
        if ((_a = this.myForm.get('email')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.emailValid = false;
        }
        else {
            this.emailValid = true;
        }
    };
    EmpresaRegistroComponent.prototype.validarTelefono = function () {
        var _a;
        if ((_a = this.myForm.get('telefono')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.telefonoValid = false;
        }
        else {
            this.telefonoValid = true;
        }
    };
    EmpresaRegistroComponent.prototype.validar = function (rsocial, email, telefono, password) {
        this.validarUsername();
        this.validarPassword();
        this.validarEmail();
        this.validarTelefono();
        if (this.myForm.valid) {
            var empresa = new usuario_empresa_1.UsuarioEmpresa(0, rsocial, '', telefono, 0, '', '', '', null, null, 0, '', [], email, password);
            this.rs.postNuevoUsuario(empresa).subscribe(function (data) {
                console.log(data.mensaje);
            });
            this.redirigir("login");
        }
    };
    EmpresaRegistroComponent.prototype.redirigir = function (componente) {
        this.navigation.navigate([componente]);
    };
    EmpresaRegistroComponent.prototype.ngOnInit = function () {
    };
    EmpresaRegistroComponent = __decorate([
        core_1.Component({
            selector: 'app-empresa-registro',
            templateUrl: './empresa-registro.component.html',
            styleUrls: ['./empresa-registro.component.css']
        })
    ], EmpresaRegistroComponent);
    return EmpresaRegistroComponent;
}());
exports.EmpresaRegistroComponent = EmpresaRegistroComponent;
