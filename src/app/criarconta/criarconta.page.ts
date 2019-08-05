import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/Models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-criarconta',
  templateUrl: './criarconta.page.html',
  styleUrls: ['./criarconta.page.scss'],
})
export class CriarcontaPage implements OnInit {

  usuario:Usuarios
  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router) {

    this.usuario=new Usuarios()

  }

  ngOnInit() {
  }

  criarConta(){
    this.http.post( SERVER_URL + "/usuarios",this.usuario).subscribe(
      result=>{
        this.router.navigate(['/home'])
      }
    )
  }

}
