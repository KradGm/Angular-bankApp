import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TransferPageComponent } from './pages/transfer-page/transfer-page.component';
import { AdmPageComponent } from './pages/adm-page/adm-page.component';
import { AdmLoginPageComponent } from './pages/adm-login-page/adm-login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'app/:id',
    children: [
      {
        path:'',
        component: HomePageComponent,
      },
      {
        path: 'transfer',
        component: TransferPageComponent,
      },
      {
        path: 'adm-login',
        component: AdmLoginPageComponent,
      },
    ],
  },
  {
    path: 'transfer/:id',
    component: TransferPageComponent,
  },
  {
    path: 'register',
    component: AdmPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
