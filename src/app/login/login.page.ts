import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { Usuarios } from 'src/Models/Usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuarios
  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router) {
    this.usuario=new Usuarios()
   }

  ngOnInit() {
  }
  login(){
    this.http.post( SERVER_URL + "/auth/login",this.usuario).subscribe(
      result=>{
        this.router.navigate(['/timeline'])
      }
    )
  }

}
