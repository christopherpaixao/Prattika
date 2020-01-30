import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Postagens } from 'src/Models/Postagens';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-addpostagem',
  templateUrl: './addpostagem.page.html',
  styleUrls: ['./addpostagem.page.scss'],
})
export class AddpostagemPage implements OnInit {

  postagem: Postagens
  base64Image: string

  imageData: string;
  useURI = true;
  imageFileName: any;

  

  constructor(public http: HttpClient, public route: ActivatedRoute, public router: Router,
    private camera: Camera, public navCtrl: NavController, private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {

    this.postagem = new Postagens()
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postagem.usuarioid = params.get('id')
    })
  }

  ngOnInit() {
  }

  addPostagem() {
    this.http.post(SERVER_URL + "/postagens", this.postagem).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['/usuarios'])
      }
    )
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.then(() => {
      console.log('Dismissed toast');
    });
  
    toast.catch();
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      
    });
    
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageData, 'http://www.devplusagencia.com.br/prattika/', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://www.devplusagencia.com.br/testeimage.jpg"
      loader.then();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.then();
      
      this.presentToast(err);
    });
  }

  //método funcionando
  getPicture(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      if (this.useURI) {
        const temp = imageData.split('?');
        this.imageData = temp[0];
        this.imageData = (window as any).Ionic.WebView.convertFileSrc(imageData);
      } else {
        this.imageData = 'data:image/jpeg;base64,' + imageData;
      }
    },
      (err) => {
        console.log(err);
      });
  }




  /* getPicture(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
      saveToPhotoAlbum: true,
    };
    newImage => {
      console.log('new image path is: ' + newImage);
      const fileTransfer: FileTransferObject = this.transfer.create();
      const uploadOpts: FileUploadOptions = {
        fileKey: 'file',
        fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
      };

      fileTransfer.upload(newImage, 'http://192.168.0.7:3000/api/upload', uploadOpts)
               .then((data) => {
                 console.log(data);
                 this.imageData = JSON.parse(data.response);
                 console.log(this.imageData);
                 this.useURI = this.imageData.useURI;
               },
               (err) => {
                console.log(err);
              });

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        if (this.useURI) {
          const temp = imageData.split('?');
          this.imageData = temp[0];
          this.imageData = (window as any).Ionic.WebView.convertFileSrc(imageData);
        } else {
          this.imageData = 'data:image/jpeg;base64,' + imageData;
        }


      },
        (err) => {
          console.log(err);
        });
    }
  } */



  /* getPicture(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
      saveToPhotoAlbum: true,
    };
 
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      if (this.useURI) {
         const temp = imageData.split('?');
         this.imageData = temp[0];
        this.imageData = (window as any).Ionic.WebView.convertFileSrc(imageData);
      } else {
        this.imageData = 'data:image/jpeg;base64,' + imageData;
      }
    },
     (err) => {
      console.log(err);
    });
  } */

  /* abrirCamera(){
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
 
  } */

}
