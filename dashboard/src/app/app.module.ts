import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule }	from '@angular/platform-browser/animations';

import { ChartsModule }	from 'ng2-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';

// For a realtime.service.ts get the amount of users connected
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

// A2 Components
import { SidebarComponent } from './a2-components/sidebar/sidebar.component';
import { LogoComponent } from './a2-components/logo/logo.component';
import { MainMenuComponent } from './a2-components/main-menu/main-menu.component';
import { CardComponent } from './a2-components/card/card.component';

// A2 Pages
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './a2-components/navbar/navbar.component';
import { BadgeComponent } from './a2-components/badge/badge.component';
import { NiHTimelineComponent } from './a2-components/ni-h-timeline/ni-h-timeline.component';
import { FooterComponent } from './a2-components/footer/footer.component';


//Extra pages

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    SidebarComponent,
    LogoComponent,
    MainMenuComponent,
    PageDashboardComponent,
    CardComponent,
    NavbarComponent,
    BadgeComponent,
    NiHTimelineComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LeafletModule,
    ChartsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
