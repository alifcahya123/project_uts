import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'team-list', 
    loadChildren: () => import('./pages/team-list/team-list.module').then(m => m.TeamListPageModule)
  },
  {
    path: 'team-detail/:id',
    loadChildren: () => import('./pages/team-detail/team-detail.module').then(m => m.TeamDetailPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}