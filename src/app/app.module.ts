import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app.material-module'

import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
registerLocaleData(localeNl);

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from './charts/charts.module';

import { AppComponent } from './app.component';
import { appRoutingComponents } from './app-routing.module';
import { GuardianNewsWidgetComponent } from './dashboard/widgets/guardian-news-widget/guardian-news-widget.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { NosNewsWidgetComponent } from './dashboard/widgets/nos-news-widget/nos-news-widget.component';
import { OpenweathermapWidgetComponent } from './dashboard/widgets/openweathermap-widget/openweathermap-widget.component';
import { IexWidgetComponent } from './dashboard/widgets/iex-widget/iex-widget.component';
import { DateIsoPipe } from './pipes/date-iso.pipe';

@NgModule({
  declarations: [
    AppComponent,
    appRoutingComponents,
    GuardianNewsWidgetComponent,
    SidenavComponent,
    HeaderComponent,
    NosNewsWidgetComponent,
    OpenweathermapWidgetComponent,
    IexWidgetComponent,
    DateIsoPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
