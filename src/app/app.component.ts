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
    this.datos=this.fb.group({
      email:  [''],
      asunto: [''],
      mensaje: [''],
     files: ['']
    })
  }
  EnviarEmail(){
    Notiflix.Loading.standard('Cargando...');
  const params= new FormData();
      params.append('email',this.datos.value.email);
      params.append('asunto', this.datos.value.asunto);
      params.append('mensaje', this.datos.value.mensaje);
      params.append('files',this.FileTyp.fileRaw, this.FileTyp.fileName);
    

   this.httpclien.post<any>(this.UrlEmail,params ).subscribe(resp=>{
    console.log(resp)
    Notiflix.Loading.remove();
    Notiflix.Notify.success('Enviado Correctamente')
   })
  }

  getFile(event: any) {
    const [file] =event.target.files;
    this.FileTyp={
      fileRaw:file,
      fileName:file.name
    }

  }
  
}
