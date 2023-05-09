import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Correo Electronico';
  datos: any = FormGroup;
  UrlEmail: string = environment.UrlEmail;
  private FileTyp:any;
  constructor(public fb: FormBuilder,private httpclien:HttpClient){
    this.datos=new FormGroup({
      para: new FormControl('',[Validators.required,Validators.email]),
      asunto: new FormControl('',Validators.required),
      mensaje: new FormControl('',Validators.required),
      archivo: new FormControl('')
    })
  }
  EnviarEmail(){
    Notiflix.Loading.standard('Cargando...');
    let params={
      asunto:this.datos.value.asunto,
      email:this.datos.value.para,
      mensaje:this.datos.value.mensaje,
      archivo:this.datos.value.archivo
    }

    console.log(params)

   this.httpclien.post(this.UrlEmail,params ).subscribe(resp=>{
    console.log(resp)
    Notiflix.Loading.remove();
    Notiflix.Notify.success('Enviado Correctamente')
   })
  }
  getfile($event :any):void{
    const [file] = $event.target.files;
   this.FileTyp={
    fileRaw:file,
   filName:file.name
   }
  }
}
