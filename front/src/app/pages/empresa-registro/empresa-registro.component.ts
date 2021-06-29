import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { RegistroEmpresaService } from 'src/app/services/registro-empresa.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-empresa-registro',
  templateUrl: './empresa-registro.component.html',
  styleUrls: ['./empresa-registro.component.css']
})
export class EmpresaRegistroComponent implements OnInit {

  public myForm:FormGroup;
  public rsocialValid:boolean;
  public passValid = true;
  public emailValid:boolean;
  public telefonoValid:boolean

  constructor(private navigation:Router, private formBuilder:FormBuilder, public rs:RegistroEmpresaService, private ls:LoginService) { 
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

  public validar(rsocial:string, email:string, telefono:string, password:string)  {
    this.validarUsername();
    this.validarPassword();
    this.validarEmail();
    this.validarTelefono();

    if(this.myForm.valid) {
      let empresa:UsuarioEmpresa = new UsuarioEmpresa(0, rsocial, '', telefono, 0, '', '', '', null, null, 0, '','', [], email, password);
      
      this.rs.postNuevoUsuario(empresa).subscribe((data:any) => {
        console.log(data.mensaje);
        this.redirigir(`login`);
      });
    }
  }

  redirigir(componente:string) {
    this.navigation.navigate([componente]);
  }

  // public async sendMail(email:string) {
    
  //   let testAccount = await nodemailer.createTestAccount();
  
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 465,
  //     secure: true, // true for 465, false for other ports
  //     auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //     },
  //   });

  //   let info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <fjramos13@hotmail.com>',
  //     to: `${email}`,
  //     subject: "Listo para pedir turno??? ✔", 
  //     text: "Bienvenido a UrTurn?", 
  //     html: "<b>Bienvenido a UrTurn?</b>", 
  //   });
    
  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // }

  ngOnInit(): void {
    this.ls.estado = false;
  }
}

// <form action="https://formspree.io/f/xvodqzrz" method="post">
//   <label for="email">Your Email</label>
//   <input name="Email" id="email" type="email">
//   <button type="submit">Submit</button>
// </form>
