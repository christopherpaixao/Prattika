import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/Models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-editusuario',
  templateUrl: './editusuario.page.html',
  styleUrls: ['./editusuario.page.scss'],
})
export class EditusuarioPage implements OnInit {

  usuario: Usuarios
  idusuario:string
  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router) {

    this.usuario=new Usuarios();
    
    this.route.paramMap.subscribe( (params:ParamMap) =>
      {
        this.idusuario=params.get('id')
        
      })
  }

  ngOnInit() {
    this.listaarUsuarios()
  }

  listaarUsuarios(){
    //busca no webservice e caminho dos usuarios
    this.http.get<Usuarios>(SERVER_URL  +  "/usuarios/" + this.idusuario).subscribe( 
    result=>{
      //console.log(result)
      this.usuario=result
    }
    )
  }

  editUsuario(){
    this.http.put( SERVER_URL + "/usuarios/" + this.idusuario,this.usuario).subscribe(
      result=>{
        this.router.navigate(['/usuarios'])
      }
    )

  }

}
