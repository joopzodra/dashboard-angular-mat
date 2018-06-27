import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule} from './app.material-module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardianNewsWidgetComponent } from './dashboard/widgets/guardian-news-widget/guardian-news-widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NosNewsWidgetComponent } from './dashboard/widgets/nos-news-widget/nos-news-widget.component';
import { OpenweathermapWidgetComponent } from './dashboard/widgets/openweathermap-widget/openweathermap-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    GuardianNewsWidgetComponent,
    SidenavComponent,
    HeaderComponent,
    DashboardComponent,
    NosNewsWidgetComponent,
    OpenweathermapWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
