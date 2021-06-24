"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var login_1 = require("src/app/models/login");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(navigation, formBuilder, ls) {
        this.navigation = navigation;
        this.formBuilder = formBuilder;
        this.ls = ls;
        this.passValid = true;
        this.eventoIniciarSesion = new core_1.EventEmitter();
        this.myForm = this.buildForm();
        this.emailValid = true;
        this.passValid = true;
        this.tipoUsuario = '';
        this.id_usuario = 0;
        this.estado = false;
    }
    LoginComponent.prototype.buildForm = function () {
        var minPasswordLength = 6;
        var myForm = this.formBuilder.group({
            email: [, forms_1.Validators.required],
            password: [, [forms_1.Validators.required, forms_1.Validators.minLength(minPasswordLength)]]
        });
        return myForm;
    };
    LoginComponent.prototype.validarEmail = function () {
        var _a;
        if ((_a = this.myForm.get('username')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.emailValid = false;
        }
        else {
            this.emailValid = true;
        }
    };
    LoginComponent.prototype.validarPassword = function () {
        var _a;
        if ((_a = this.myForm.get('password')) === null || _a === void 0 ? void 0 : _a.invalid) {
            this.passValid = false;
        }
        else {
            this.passValid = true;
        }
    };
    LoginComponent.prototype.validar = function (email, password) {
        var _this = this;
        this.validarEmail();
        this.validarPassword();
        if (this.myForm.valid) {
            var login = new login_1.Login();
            login.email = email;
            login.contraseña = password;
            this.ls.getIdUsuario(login).subscribe(function (data) {
                if (data.mensaje.length > 0 && data.mensaje[0].id_usuario_cliente == null) {
                    _this.id_usuario = data.mensaje[0].id_usuario_empresa;
                    _this.tipoUsuario = 'empresa';
                    // alert('es una empresa');
                }
                else if (data.mensaje.length > 0 && data.mensaje[0].id_usuario_empresa == null) {
                    _this.id_usuario = data.mensaje[0].id_usuario_cliente;
                    _this.tipoUsuario = 'cliente';
                    // alert('es un cliente');
                }
                else {
                    alert('El usuario o password introducidos no son correctos');
                    return;
                }
                _this.cambiarEstado();
                _this.redirigir(_this.tipoUsuario + "Home");
            });
            // /*Evento para llamar al header que necesito(empresa/cliente)*/ 
            // this.conectado = true;
            // this.eventoIniciarSesion.emit(this.tipoUsuario)
        }
    };
    LoginComponent.prototype.cambiarEstado = function () {
        this.ls.tipoUsuario = this.tipoUsuario;
        this.estado = !this.estado;
        this.ls.estado = this.estado;
    };
    LoginComponent.prototype.redirigir = function (componente) {
        this.navigation.navigate([componente]);
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output()
    ], LoginComponent.prototype, "eventoIniciarSesion");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
// {'is-invalid':(myForm.get('username')?.touched && myForm.get('username')?.invalid)
