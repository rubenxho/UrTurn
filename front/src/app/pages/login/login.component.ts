import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public myForm:FormGroup;
  public usernameValid:boolean;
  public passValid = true;
  public tipoUsuario:string;

  constructor(private navigation:Router, private formBuilder:FormBuilder) { 
    this.myForm = this.buildForm();
    this.usernameValid = true;
    this.passValid = true;
    this.tipoUsuario = '';
  }

  private buildForm():FormGroup {

    const minPasswordLength = 6;
    
    let myForm = this.formBuilder.group({
      username:[,Validators.required],
      password:[,[Validators.required, Validators.minLength(minPasswordLength)]]
    });

    return myForm;
  }

  public validarUsername():void {
    if(this.myForm.get('username')?.invalid) {
      this.usernameValid = false;
    }else {
      this.usernameValid = true;
    }
  }

  public validarPassword()  {
    if(this.myForm.get('password')?.invalid) {
      this.passValid = false;
    }else {
      this.passValid = true;
    }
  }

  public validar(tipoUsuario:string)  {
    this.validarUsername();
    this.validarPassword();

    if(this.myForm.valid) {
      this.tipoUsuario = tipoUsuario;
      this.redirigir(`${tipoUsuario}Home`);
    }
  }

  public redirigir(componente:string):void {
    this.navigation.navigate([componente]);
  }

  ngOnInit(): void {
  }

}

// {'is-invalid':(myForm.get('username')?.touched && myForm.get('username')?.invalid)