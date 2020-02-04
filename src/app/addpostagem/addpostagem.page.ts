import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Postagens } from 'src/Models/Postagens';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { NavController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/File/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-addpostagem',
  templateUrl: './addpostagem.page.html',
  styleUrls: ['./addpostagem.page.scss'],
})
export class AddpostagemPage implements OnInit {
  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;

  postagem: Postagens
  base64Image: string

  imageData: string;
  useURI = true;
  imageFileName: any;

  

  constructor(public http: HttpClient, public route: ActivatedRoute, public router: Router,
    private camera: Camera, public navCtrl: NavController, private transfer: FileTransfer,
    public loadingCtrl: LoadingController, private platform: Platform, public toastCtrl: ToastController,
    private file: File, private afStorage: AngularFireStorage) {

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

  //método funcionando
  async openGalery(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
    try{
      const fileUri: string = await this.camera.getPicture(options);
      let file: string;

      if (this.platform.is('ios')){
            file = fileUri.split('/').pop();
      }else{ file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
    }
      //path armazena o caminho do arquivo
      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
      //passando imagem como arquivo binário
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      //conversão do arquivo binário da imagem em imagem
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg'});
      //
      this.uploadPicture(blob);
      
    }catch(error){
      console.error(error);
    }
  }

  uploadPicture(blob: Blob){
    //criar referência para caminho da imagem com feedback pro usuário
    const ref = this.afStorage.ref('postagens/post.jpg')
    //const ref = this.afStorage.ref('postagens/post.jpg').put(blob); sem feed back
    //tarefa
    const task = ref.put(blob);

    //progresso em porcentagem
    this.uploadPercent = task.percentageChanges();
    //caminho da imagem carregada
    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }

}
