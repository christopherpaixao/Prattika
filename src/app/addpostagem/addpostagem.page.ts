import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Postagens } from 'src/Models/Postagens';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
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

  fileUrl: any = null;
  respData: any;

  constructor(public http: HttpClient, public route: ActivatedRoute, public router: Router,
    private camera: Camera, public navCtrl: NavController, private transfer: FileTransfer,
    private imagePicker: ImagePicker, private crop: Crop) {

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
  cropUpload() {
    this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.crop.crop(results[i], { quality: 100 })
          .then(
            newImage => {
              console.log('new image path is: ' + newImage);
              const fileTransfer: FileTransferObject = this.transfer.create();
              const uploadOpts: FileUploadOptions = {
                fileKey: 'file',
                fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
              };

              fileTransfer.upload(newImage, 'http://www.devplusagencia.com.br/prattika', uploadOpts)
                .then((data) => {
                  console.log(data);
                  this.respData = JSON.parse(data.response);
                  console.log(this.respData);
                  this.fileUrl = this.respData.fileUrl;
                }, (err) => {
                  console.log(err);
                });
            },
            error => console.error('Error cropping image', error)
          );
      }
    }, (err) => { console.log(err); });
  }



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
    newImage => {
      console.log('new image path is: ' + newImage);
      const fileTransfer: FileTransferObject = this.transfer.create();
      const uploadOpts: FileUploadOptions = {
        fileKey: 'file',
        fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
      };

      /* fileTransfer.upload(newImage, 'http://192.168.0.7:3000/api/upload', uploadOpts)
               .then((data) => {
                 console.log(data);
                 this.imageData = JSON.parse(data.response);
                 console.log(this.imageData);
                 this.useURI = this.imageData.useURI;
               },
               (err) => {
                console.log(err);
              }); */

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
