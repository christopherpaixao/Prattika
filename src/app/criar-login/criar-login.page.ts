import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { Usuarios } from 'src/Models/Usuarios';

@Component({
  selector: 'app-criar-login',
  templateUrl: './criar-login.page.html',
  styleUrls: ['./criar-login.page.scss'],
})
export class CriarLoginPage implements OnInit {

  usuario:Usuarios

  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router) {

    this.usuario=new Usuarios()
    this.route.paramMap.subscribe( (params:ParamMap) =>
      {
        //this.postagem.usuarioid=params.get('id')
      }) 
   }

  ngOnInit() {
  }

  criarLogin(){
    this.http.post( SERVER_URL + "/usuarios",{}).subscribe(
      result=>{
        this.router.navigate(['/home'])
      }
    )
  }
}
