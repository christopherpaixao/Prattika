import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/Models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SERVER_URL } from 'src/environments/environment';
import { Postagens } from 'src/Models/Postagens';
import { PopoverController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario: Usuarios
  idusuario: string
  listapostagens:Postagens[]
  idpostagem:string

  profilee: any='posts';
  slideProfileOpts = {
    effect: 'flip',
    autoHeight: true,
    speed: 1000,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 4,
};
  constructor(public http: HttpClient, public route: ActivatedRoute, public router: Router,
      public popoverController: PopoverController, public alertController: AlertController) {

    this.usuario = new Usuarios()

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idusuario = params.get('id')

    })
  }

  ngOnInit() {
    this.profile()
    this.listarpostagensusuario()
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
        component: PopoverViewComponent,
        event: ev,
        translucent: true
    });
    return await popover.present();
}

  profile() {
    //busca no webservice e caminho dos usuarios
    this.http.get<Usuarios>(SERVER_URL + '/usuarios/' + this.idusuario).subscribe(
      result => {
        this.usuario = result
        //console.log(result)
      }
    )
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

  

  

  


}
