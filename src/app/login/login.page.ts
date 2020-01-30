import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { Usuarios } from 'src/Models/Usuarios';
import { NgForm } from '@angular/forms';
import { ToastController, Platform } from '@ionic/angular';

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
    private toast: ToastController, public platform: Platform) {
    
    this.usuario = new Usuarios()

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idusuario = params.get('id')

    })
  }

  ngOnInit() {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/login', true) && this.router.url === '/login') {
        navigator['app'].exitApp();
      }
  });
    
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
  /* login() {
    this.authService.login(this.usuario.email, this.usuario.password)
    .then((result: any) => {
      this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result.token, position: 'bottom', duration: 3000 });
      console.log(result)
        this.router.navigate(['/usuarios']);
      //Salvar o token no Ionic Storage para usar em futuras requisições.
      //Redirecionar o usuario para outra tela usando o navCtrl
      //this.navCtrl.pop();
      //this.navCtrl.setRoot()
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'bottom', duration: 3000 });
    });
     return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    }) 
  } */

}
