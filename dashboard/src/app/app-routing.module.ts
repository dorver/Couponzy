import { NgModule }                             from '@angular/core';
import { RouterModule, Routes }                 from '@angular/router';

import { DefaultLayoutComponent }               from './layouts/default/default.component';
import { RoadstartLayoutComponent }             from './layouts/roadstart/roadstart.component';

import { PageDashboardComponent }               from './pages/dashboard/dashboard.component';
import { PageUsersManageComponent }             from './pages/users-manage/users-manage.component';
import { PageShopsManageComponent }             from './pages/shops-manage/shops-manage.component';
import { PageShopsMapComponent }                from './pages/shops-map/shops-map.component';
import { PageSignInSocialComponent }            from './pages/roadstart-pages/sign-in-social/sign-in-social.component';
import { PageSignUpComponent }                  from './pages/roadstart-pages/sign-up/sign-up.component';

const defaultRoutes: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'users-manage', component: PageUsersManageComponent },
  { path: 'shops-manage', component: PageShopsManageComponent },
  { path: 'shops-map', component: PageShopsMapComponent },
];

const roadstartRoutes: Routes = [
  { path: 'sign-in-social', component: PageSignInSocialComponent },
  { path: 'sign-up', component: PageSignUpComponent },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/roadstart-layout/sign-in-social',
    pathMatch: 'full'
  },
  {
    path: 'default-layout',
    component: DefaultLayoutComponent,
    children: defaultRoutes
  },
  {
    path: 'roadstart-layout',
    component: RoadstartLayoutComponent,
    children: roadstartRoutes
  },
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
