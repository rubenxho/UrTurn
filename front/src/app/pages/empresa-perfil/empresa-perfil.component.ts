import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-empresa-perfil',
  templateUrl:'./empresa-perfil.component.html',
  styleUrls: ['./empresa-perfil.component.css']
})
export class EmpresaPerfilComponent implements OnInit {

  public empresaPerfil: string [];
  
  public profileData: any = {
    nombre_empresa:"",
    categoria:"",
    telefono:"",
    codigo_postal:"",
    direccion:"",
    imagen_url:"",
    descripcion:"",
    apertura:"",
    cierre:"",
    tiempo_espera:"",
    logo:"",
    estado_turno:"",
    password:"",
    repeatPassword:""
  }
  public owner:number;

  public myForm: FormGroup;

  public nombre_empresa:boolean;
  public passwordValid:boolean;
  public telefonoValid:boolean;

  public user:UsuarioEmpresa = new UsuarioEmpresa(0, "", "", "", 0, "", "", "", "", "", 0, "");

  constructor(private formBuilder:FormBuilder, private apiUserService:UsuarioServiceService, private lsowner:LoginService, private navigation:Router) { 

    this.empresaPerfil = ["modalModificar","Realizar cambios", "Sí", "No", "Cambios guardados", "", "2"];
    this.owner = this.lsowner.login.id_usuario_empresa;

    this.myForm = this.buildForm();
    this.nombre_empresa = true;
    this.passwordValid = true;
    this.telefonoValid = true;

  }

  ngOnInit(): void {
    // console.log(this.owner)
    this.userDataBase()
  }

  userDataBase(){
    console.log(this.owner)
    this.apiUserService.obtenerUserEmpresaId(this.owner) 
    .subscribe((data:UsuarioEmpresa)=>{
      // console.log(data)
      this.user =  new UsuarioEmpresa (this.owner, data[0].nombre_empresa, data[0].categoria, data[0].telefono, data[0].codigo_postal, data[0].direccion, data[0].imagen_url, data[0].descripcion, data[0].apertura, data[0].cierre, data[0].tiempo_espera) 
      // console.log(this.user)
    })
  }

  handelChange(event:any){
    const index:string = event.target.name;
    const value:string = event.target.value;
    this.profileData[index] = value;
    // console.log(this.profileData)
  }

  saveData(copyUser){
    // console.log(this.profileData)
    for(let key in this.profileData){
      if(this.profileData[key] === '' || this.profileData == undefined){
        this.profileData[key] = copyUser[key];
        console.log(this.profileData)
      }
    }
    console.log("antes", this.user.tiempo_espera)
    this.user = new UsuarioEmpresa(this.owner, this.profileData.nombre_empresa, this.profileData.categoria, this.profileData.telefono, this.profileData.codigo_postal, this.profileData.direccion , this.profileData.imagen_url,this.profileData.descripcion ,this.profileData.apertura, this.profileData.cierre, this.profileData.tiempo_espera, this.profileData.logo, this.profileData.estado_turno, [], "" ,this.profileData.password);
    console.log("despues",this.user)
  }
  
  subirCambios(guardar:boolean){
    if(guardar == true){
      const copyUser = {...this.user};
      this.validar();
      this.saveData(copyUser);
      console.log("Usuario con cambios")
      console.log(this.user)
      this.apiUserService.actualizarPerfilEmp(this.user) 
      .subscribe((data:any)=>{
        // console.log(data)
      })
    }else{
      alert("Campos Incorrectors")
    }
  }

  //******************************VALIDACION*****************************************/ 

  private buildForm():FormGroup {

    const minPasswordLength = 6;
    const minName = 3;

    let myForm = this.formBuilder.group({
      nombre_cliente: [,Validators.minLength(minName)],
      password:[,Validators.minLength(minPasswordLength)],
      telefono:[, Validators.pattern("[0-9]{9}")]
    });
    return myForm;
   }
   
  public validarUsername():void{
    if(this.myForm.get('nombre_empresa')?.invalid){
      this.nombre_empresa = false;
    }else{
      this.nombre_empresa = true;
    }
  }

  public validarPassword(){
    if(this.myForm.get('password')?.invalid) {
      this.passwordValid=false
    }else{
      this.passwordValid= true;
    }
  }

  public validarRepeat(){
    if(this.profileData.password === this.profileData.repeatPassword){
      return true;
    }else{
      return false;
    }
  }


  public validarTelefono(){
    if(this.myForm.get('telefono')?.invalid) {
      this.telefonoValid = false; 
    }else{
      this.telefonoValid = true;
    }
  }

  public validar(){
    this.validarUsername();
    this.validarPassword();
    this.validarTelefono();
  }

  public cerrarSesion()  {
    this.lsowner.estado = false;
    this.navigation.navigate(['login']);
  }

}