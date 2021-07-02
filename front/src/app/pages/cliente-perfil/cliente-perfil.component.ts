import { Component, OnInit } from '@angular/core';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service'
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import { Login } from 'src/app/models/login';
// import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})


export class ClientePerfilComponent implements OnInit {


  // [k: string]: any;
  
  public myForm: FormGroup;

  public nombre_cliente:boolean;
  public passwordValid:boolean;
  public telefonoValid:boolean;


  public profileData: any = {
    nombre_cliente:"",
    apellidos_cliente:"",
    telefono:"",
    imagen_url:"",
    password:"",
    repeatPassword:""
  }

  public guardarModal: string[]

  public owner:number;  
  public user: UsuarioCliente = new UsuarioCliente(0, "", "", "", "","","");


  constructor(private formBuilder:FormBuilder, private apiUserService:UsuarioServiceService,  private lsowner:LoginService, private navigation:Router)  {
    
    this.guardarModal = ["modalModificar","Realizar cambios","Si", "Cancelar","Cambios guardados", "", "2"]
    
    this.owner = this.lsowner.login.id_usuario_cliente;

    this.myForm = this.buildForm();
    this.nombre_cliente = true;
    this.passwordValid = true;
    this.telefonoValid = true;

    // this.myForm= new FormGroup({
    //   nombre_cliente: new FormControl ('',[Validators.minLength(3)]),
    //   password: new FormControl ('',[Validators.minLength(6)]),
    //   telefono: new FormControl ('',[Validators.pattern("[9]{9}")])
    // });
  }





  //RECORRER EL OBJETO SI ES x == "" x then x = x (se mantiene el valor), SOLO una mclase de UsuarioCliente  

  ngOnInit(): void {
    // console.log(this.owner)
    this.userDataBase()
  }

  userDataBase(){
    this.apiUserService.obtenerUserClienteId(this.owner)
    .subscribe((data:UsuarioCliente)=>{
      this.user = new UsuarioCliente (this.owner, data[0].nombre_cliente, data[0].apellidos_cliente, data[0].telefono, data[0].imagen_url, "", "" )
      // console.log(this.user)
    }) 
  }

  handleChange(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.profileData[ index ] = value;
  }
  // request.body.nombre_cliente == "" ? null : request.body.nombre_cliente
  saveData(copyUser){
    
    for(let key in this.profileData){
      // console.log(this.profileData.password)ta ben
      if(this.profileData[key] === '' || this.profileData == undefined){
        this.profileData[key] = copyUser[key];
      }
    }
    console.log('profile', this.profileData);
     this.user = new UsuarioCliente(this.owner, this.profileData.nombre_cliente, this.profileData.apellidos_cliente, this.profileData.telefono, this.profileData.imagen_url, "" , this.profileData.password);
    // console.log('user a actualizar',this.user)
    }

  subirCambios(guardar){
    // console.log("guardar")
    if(guardar == true){
      const copyUser = {...this.user};
      this.validar();
      this.saveData(copyUser);
      console.log('user update',this.user)
      this.apiUserService.actualizarUserPerfilClt(this.user)
      .subscribe((data:any)=>{
        // console.log('el data',data)
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
    if(this.myForm.get('nombre_cliente')?.invalid){
      this.nombre_cliente = false;
    }else{
      this.nombre_cliente = true;
    }
  }

  public validarPassword(){
    if(this.myForm.get('password')?.invalid) {
      this.passwordValid=false
    }else{
      this.passwordValid= true;
    }
  }

  public validarRepeat(password:String, repeat:String){
    if(password === repeat){
      console.log("validar", password, repeat)
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