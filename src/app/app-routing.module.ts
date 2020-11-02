import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'options-offline',
    loadChildren: () => import('./pages/options-offline/options-offline.module').then( m => m.OptionsOfflinePageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'options-tcmed',
    loadChildren: () => import('./pages/options-tcmed/options-tcmed.module').then( m => m.OptionsTcmedPageModule)
  },
  {
    path: 'list-bloco-item',
    loadChildren: () => import('./pages/list-bloco-item/list-bloco-item.module').then( m => m.ListBlocoItemPageModule)
  },
  {
    path: 'list-bloco-item/list/:date',
    loadChildren: () => import('./pages/list-bloco-item/list-bloco-item.module').then( m => m.ListBlocoItemPageModule)
  },
  {
    path: 'list-funcionarios',
    loadChildren: () => import('./pages/list-funcionarios/list-funcionarios.module').then( m => m.ListFuncionariosPageModule)
  },
  {
    path: 'list-funcionarios/list/:empresa',
    loadChildren: () => import('./pages/list-funcionarios/list-funcionarios.module').then( m => m.ListFuncionariosPageModule)
  },
  {
    path: 'form-consulta',
    loadChildren: () => import('./pages/form-consulta/form-consulta.module').then( m => m.FormConsultaPageModule)
  },
  {
    path: 'form-consulta/new/:funcionario',
    loadChildren: () => import('./pages/form-consulta/form-consulta.module').then( m => m.FormConsultaPageModule)
  },
  {
    path: 'form-consulta/edit/:consultaId',
    loadChildren: () => import('./pages/form-consulta/form-consulta.module').then( m => m.FormConsultaPageModule)
  },
  {
    path: 'list-consultas-enviar',
    loadChildren: () => import('./pages/list-consultas-enviar/list-consultas-enviar.module').then( m => m.ListConsultasEnviarPageModule)
  },
  {
    path: 'list-consultas-enviadas',
    loadChildren: () => import('./pages/list-consultas-enviadas/list-consultas-enviadas.module').
    then( m => m.ListConsultasEnviadasPageModule)
  },
  {
    path: 'finan-imovel',
    loadChildren: () => import('./pages/finan-imovel/finan-imovel.module').then( m => m.FinanImovelPageModule)
  },
  {
    path: 'finan-imovel-calc',
    loadChildren: () => import('./pages/finan-imovel-calc/finan-imovel-calc.module').then( m => m.FinanImovelCalcPageModule)
  },
  {
    path: 'imovel-pdf',
    loadChildren: () => import('./pages/imovel-pdf/imovel-pdf.module').then( m => m.ImovelPdfPageModule)
  },
  {
    path: 'banco-taxas',
    loadChildren: () => import('./pages/banco-taxas/banco-taxas.module').then( m => m.BancoTaxasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
