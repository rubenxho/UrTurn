import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { RegistroClienteService } from 'src/app/services/registro-cliente.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {

  public myForm:FormGroup;
  public rsocialValid:boolean;
  public passValid = true;
  public emailValid:boolean;
  public telefonoValid:boolean

  constructor(private navigation:Router, private formBuilder:FormBuilder, public rs:RegistroClienteService, private ls:LoginService) { 
    this.myForm = this.buildForm();
    this.rsocialValid = true;
    this.passValid = true;
    this.emailValid = true;
    this.telefonoValid = true;
  }

  private buildForm():FormGroup {

    const minPasswordLength = 6;
    
    let myForm = this.formBuilder.group({
      rsocial:[,Validators.required],
      password:[,[Validators.required, Validators.minLength(minPasswordLength)]],
      email:[,[Validators.required, Validators.email]],
      telefono:[,[Validators.required, Validators.pattern("[0-9]{9}")]]
    });

    return myForm;
  }

  public validarUsername():void {
    if(this.myForm.get('rsocial')?.invalid) {
      this.rsocialValid = false;
      
    }else {
      this.rsocialValid = true;
    }
  }

  public validarPassword()  {
    if(this.myForm.get('password')?.invalid) {
      this.passValid = false;
    }else {
      this.passValid = true;
    }
  }

  public validarRep(password:string, rep:string):boolean {
    if(password === rep)  {
      return true;
    }else {
      return false;
    }
  }

  public validarEmail()  {
    if(this.myForm.get('email')?.invalid) {
      this.emailValid = false;
    }else {
      this.emailValid = true;
    }
  }

  public validarTelefono()  {
    if(this.myForm.get('telefono')?.invalid) {
      this.telefonoValid = false;
    }else {
      this.telefonoValid = true;
    }
  }

  public validar(nombre:string, email:string, telefono:string, password:string)  {
    this.validarUsername();
    this.validarPassword();
    this.validarEmail();
    this.validarTelefono();

    if(this.myForm.valid) {
      let cliente:UsuarioCliente = new UsuarioCliente(0, nombre, '', telefono, '', email, password);

      this.rs.postNuevoUsuario(cliente).subscribe((data:any) => {
        console.log(data.mensaje);
        this.redirigir(`login`);
      });
      
    }
  }

  redirigir(componente:string) {
    this.navigation.navigate([componente]);
  }

  ngOnInit(): void {
    this.ls.estado = false;
  }

}
