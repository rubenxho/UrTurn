import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public myForm:FormGroup;
  public emailValid:boolean;
  public passValid = true;
  public tipoUsuario:string;
  public id_usuario:number;
  public estado:boolean;
  @Output() eventoIniciarSesion= new EventEmitter<string>();

  constructor(private navigation:Router, private formBuilder:FormBuilder, private ls:LoginService, private toastr: ToastrService) { 
    this.myForm = this.buildForm();
    this.emailValid = true;
    this.passValid = true;
    this.tipoUsuario = '';
    this.id_usuario = 0;
    this.estado = false;
  }

  private buildForm():FormGroup {

    const minPasswordLength = 6;
    
    let myForm = this.formBuilder.group({
      email:[,Validators.required],
      password:[,[Validators.required, Validators.minLength(minPasswordLength)]]
    });

    return myForm;
  }

  public validarEmail():void {

    if(this.myForm.get('username')?.invalid) {
      this.emailValid = false;
    }else {
      this.emailValid = true;
    }
  }

  public validarPassword()  {
    if(this.myForm.get('password')?.invalid) {
      this.passValid = false;
    }else {
      this.passValid = true;
    }
  }

  public validar(email:string, password:string):void  {
    this.validarEmail();
    this.validarPassword();
    
    if(this.myForm.valid) {
      let login = new Login();

      login.email = email;
      login.contraseña = password;

      this.ls.getIdUsuario(login).subscribe((data:any) => {

        if(data.mensaje.length>0 && data.mensaje[0].id_usuario_cliente==null) {
          this.id_usuario = data.mensaje[0].id_usuario_empresa;
          this.tipoUsuario = 'empresa';

          login.id_usuario_empresa = this.id_usuario;
          
        }else if(data.mensaje.length>0 && data.mensaje[0].id_usuario_empresa==null)  {
          this.id_usuario = data.mensaje[0].id_usuario_cliente;
          this.tipoUsuario = 'cliente';

          login.id_usuario_cliente = this.id_usuario;

        }else {
          this.toastr.error("El usuario o password introducidos no son correctos");
          return;
        }

        this.ls.login = login;
        this.cambiarEstado();
        this.redirigir(`${this.tipoUsuario}Home`);
      });
    }
  }

  public cambiarEstado()  {
    this.ls.tipoUsuario = this.tipoUsuario;
    this.estado = !this.estado;
    this.ls.estado = this.estado;
  }

  public redirigir(componente:string):void {
    this.navigation.navigate([componente]);
  }

  

  ngOnInit(): void {
    
  }
}

// {'is-invalid':(myForm.get('username')?.touched && myForm.get('username')?.invalid)