import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'  },
  { path: 'list', loadChildren: './list/list.module#ListPageModule'  },
  { path: 'postagens', loadChildren: './postagens/postagens.module#PostagensPageModule' },
  { path: 'postagens/:id', loadChildren: './postagens/postagens.module#PostagensPageModule' },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosPageModule' },
  { path: 'addpostagem/:id', loadChildren: './addpostagem/addpostagem.module#AddpostagemPageModule' },
  { path: 'detalhes/:id', loadChildren: './detalhes/detalhes.module#DetalhesPageModule' },
  { path: 'editpostagem/:id', loadChildren: './editpostagem/editpostagem.module#EditpostagemPageModule' },
  { path: 'criar-login', loadChildren: './criar-login/criar-login.module#CriarLoginPageModule' },
  { path: 'criarconta', loadChildren: './criarconta/criarconta.module#CriarcontaPageModule' },
  { path: 'editusuario/:id', loadChildren: './editusuario/editusuario.module#EditusuarioPageModule' },
  { path: 'timeline/:id', loadChildren: './timeline/timeline.module#TimelinePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'profile/:id', loadChildren: './profile/profile.module#ProfilePageModule' },  { path: 'file', loadChildren: './file/file.module#FilePageModule' },
  { path: 'cloud-list', loadChildren: './cloud-list/cloud-list.module#CloudListPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
