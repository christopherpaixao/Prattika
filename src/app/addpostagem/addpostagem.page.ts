import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Postagens } from 'src/Models/Postagens';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addpostagem',
  templateUrl: './addpostagem.page.html',
  styleUrls: ['./addpostagem.page.scss'],
})
export class AddpostagemPage implements OnInit {

  postagem:Postagens
  base64Image:string

  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router,
              private camera: Camera, public navCtrl: NavController) {
    
    this.postagem=new Postagens()
    this.route.paramMap.subscribe( (params:ParamMap) =>
      {
        this.postagem.usuarioid=params.get('id')
      })
   }

  ngOnInit() {
  }

  addPostagem(){
    this.http.post( SERVER_URL + "/postagens",this.postagem).subscribe(
      result=>{
        console.log(result)
        this.router.navigate(['/usuarios'])
      }
    )
  }

  abrirCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData) =>{
      // imageData is either a base64 encoded string or a file URI
      //If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;
    }, (err) => {
      //Handle error
    })
  }

  abrirGaleria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY //abrir a galera
    }

    this.camera.getPicture(options).then((ImageData) =>{
      // imageData is either a base64 encoded string or a file URI
      //If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;
    }, (err) => {
      //Handle error
    })

  }

}
