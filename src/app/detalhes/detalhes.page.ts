import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';
import { Postagens } from './../../Models/Postagens';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  postagem:Postagens
  idpostagem:string
  constructor(public route:ActivatedRoute, public http:HttpClient) { 

    this.postagem=new Postagens()

    this.route.paramMap.subscribe( (params:ParamMap) =>
      {
        this.idpostagem=params.get('id')

      })
  }

  ngOnInit() {

    this.listarDetalhe()
  }

  listarDetalhe(){
        //busca no webservice e caminho dos usuarios
        this.http.get<Postagens>(SERVER_URL + '/postagens/' + this.idpostagem).subscribe(
          result=>{
            this.postagem=result
            //console.log(result)
          }
          )
  }

}
