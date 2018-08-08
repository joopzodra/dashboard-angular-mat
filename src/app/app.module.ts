import { BrowserModule, Title } from '@angular/platform-browser';
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
import { GuardianNewsWidgetComponent } from './pages/overview-page/widgets/guardian-news-widget/guardian-news-widget.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { NosNewsWidgetComponent } from './pages/overview-page/widgets/nos-news-widget/nos-news-widget.component';
import { OpenweathermapWidgetComponent } from './pages/overview-page/widgets/openweathermap-widget/openweathermap-widget.component';
import { IexWidgetComponent } from './pages/overview-page/widgets/iex-widget/iex-widget.component';
import { DateIsoPipe } from './pipes/date-iso.pipe';
import { ReplaceH2Pipe } from './pipes/replace-h2.pipe';

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
    ReplaceH2Pipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ChartsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
