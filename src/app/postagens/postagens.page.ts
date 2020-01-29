import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';
import { Postagens } from 'src/Models/Postagens';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.page.html',
  styleUrls: ['./postagens.page.scss'],
})
export class PostagensPage implements OnInit {

    listapostagens:Postagens[]
    idusuario:string
    idpostagem:string
    
  constructor(public route:ActivatedRoute, public http:HttpClient, public router:Router) {  

    this.route.paramMap.subscribe( (params:ParamMap) =>
      { 
        this.idusuario=params.get('id')
      })

  }

  ngOnInit() {
    this.listarpostagensusuario()
  }

  listarpostagensusuario(){
    //busca no webservice e caminho dos usuarios
    this.http.get<Postagens[]>(SERVER_URL  +  "/postagensusuarios/" + this.idusuario).subscribe( 
      result=>{
        //console.log(result)
        this.listapostagens=result['postagens']
      }
      )
  }
  
  listarpostagens(){
    //busca no webservice e caminho dos usuarios
    this.http.get<Postagens[]>(SERVER_URL  +  "/postagens/" + this.idpostagem).subscribe( 
    result=>{
      //console.log(result)
      this.listapostagens=result
    }
    )
  }

  deletarPostagen(id: number){
     this.http.delete(SERVER_URL  +  "/postagens/" + id).subscribe( 
    result=>{
      
      //console.log()
      this.router.navigate(['/usuarios'])
      
    }
    )
  }
}
