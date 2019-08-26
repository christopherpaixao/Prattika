import { Component, OnInit } from '@angular/core';
import { Postagens } from 'src/Models/Postagens';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-editpostagem',
  templateUrl: './editpostagem.page.html',
  styleUrls: ['./editpostagem.page.scss'],
})
export class EditpostagemPage implements OnInit {

  postagem:Postagens
  idpostagem:string

  fileUrl: any = null;
  respData: any;
  
  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router) { 
    
    this.postagem=new Postagens();
    
    this.route.paramMap.subscribe( (params:ParamMap) =>
      {
        this.idpostagem=params.get('id')
        
      })

  }

  ngOnInit() {
    this.listarPostaagem()
  }

  listarPostaagem(){
        //busca no webservice e caminho dos usuarios
        this.http.get<Postagens>(SERVER_URL  +  "/postagens/" + this.idpostagem).subscribe( 
          result=>{
            //console.log(result)
            this.postagem=result
          })
  }

  edit(){
    this.http.put( SERVER_URL + "/postagens/" + this.idpostagem,this.postagem).subscribe(
      result=>{
        this.router.navigate(['/usuarios'])
      }
    )

  }

  /*  cropUpload() {
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
  
                fileTransfer.upload(newImage, 'http://192.168.0.7:3000/api/upload', uploadOpts)
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
  }  */


}
