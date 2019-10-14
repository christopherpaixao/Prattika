import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { Usuarios } from 'src/Models/Usuarios';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: NgForm;

  usuario: Usuarios
  idusuario: string
  constructor(public http: HttpClient, public route: ActivatedRoute, public router: Router,
    private toastCtrl: ToastController) {
    
    this.usuario = new Usuarios()

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idusuario = params.get('id')

    })
  }

  ngOnInit() {
  }

 /*  login() {
    this.http.post(SERVER_URL + "/auth/login", this.usuario).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['/profile'])
      }
    )
  } */

  login() {
     this.http.post(SERVER_URL + "/auth/login", this.usuario).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['/usuarios']) 
      }
    )

     
  }

}
