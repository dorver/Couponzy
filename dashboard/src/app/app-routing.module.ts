import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

import { DefaultLayoutComponent }       from './layouts/default/default.component';

import { PageDashboardComponent }       from './pages/dashboard/dashboard.component';

const defaultRoutes: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
];

const extraRoutes: Routes = [

];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/default-layout/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'default-layout',
    component: DefaultLayoutComponent,
    children: defaultRoutes
  },
  /*{
    path: 'extra-layout',
    component: ExtraLayoutComponent,
    children: extraRoutes
  },*/
  {
    path: '**',
    component: DefaultLayoutComponent,
    children: defaultRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
