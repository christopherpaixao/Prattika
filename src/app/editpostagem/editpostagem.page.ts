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
}
