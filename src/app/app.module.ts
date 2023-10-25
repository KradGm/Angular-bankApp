import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { BigCardComponent } from './components/big-card/big-card.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { SmallCardComponent } from './components/small-card/small-card.component'; // Importe o FormsModule aqui


@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    MenuComponent,
    LoginPageComponent,
    HomePageComponent,
    BigCardComponent,
    CardInfoComponent,
    SmallCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
