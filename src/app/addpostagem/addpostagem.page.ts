import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Postagens } from 'src/Models/Postagens';

@Component({
  selector: 'app-addpostagem',
  templateUrl: './addpostagem.page.html',
  styleUrls: ['./addpostagem.page.scss'],
})
export class AddpostagemPage implements OnInit {

  postagem:Postagens

  constructor(public http:HttpClient, public route:ActivatedRoute, public router:Router) {
    
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
        console.log
        this.router.navigate(['/usuarios'])
      }
    )
    console.log
  }

}
