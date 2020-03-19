import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menu/menu.module').then(m => m.MenuPageModule)
          },
          {
            path: 'ajouter',
            loadChildren: () =>
              import('../menu/ajouter/ajouter.module').then(m => m.AjouterPageModule)
          }
        ]
      },
      {
        path: 'plats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../plats/plats.module').then(m => m.PlatsPageModule)
          },
          {
            path: 'ajouter',
            loadChildren: () => import('../plats/ajouter/ajouter.module').then( m => m.AjouterPageModule)
          },
          {
            path: 'modifier/:id',
            loadChildren: () => import('../plats/modifier/modifier.module').then( m => m.ModifierPageModule)
          },
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../compte/compte.module').then(m => m.ComptePageModule)
          }
        ]
      },
      {
        path: 'parametre',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../parametre/parametre.module').then(m => m.ParametrePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/menu',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
