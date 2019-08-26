import { SERVER_URL } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/Models/Usuarios';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  //array para armazenar usuários que webservice retorna
  listausuarios:Usuarios[]

  //HttpClient chama o webservice
  constructor(public http:HttpClient, public router:Router) { }

  //quando inicia aplicação executa esses métodos
  ngOnInit() {
    this.listarusuarios()
  }

  listarusuarios(){
    //busca no webservice e caminho dos usuarios
    this.http.get<Usuarios[]>(SERVER_URL  +  "/usuarios").subscribe( 
    result=>{
      //console.log(result)
      this.listausuarios=result
    }
    )
  }

  deletarUsuario(id: number){
    //busca no webservice e caminho dos usuarios
     this.http.delete(SERVER_URL  +  "/usuarios/" + id).subscribe( 
    result=>{
      //console.log()
      //this.router.navigate(['/usuarios'])
      window.location.reload()
      
    }
    )
  }

}
