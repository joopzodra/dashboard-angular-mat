import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule} from './app.material-module'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { appRoutingComponents } from './app-routing.module';
import { GuardianNewsWidgetComponent } from './dashboard/widgets/guardian-news-widget/guardian-news-widget.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { NosNewsWidgetComponent } from './dashboard/widgets/nos-news-widget/nos-news-widget.component';
import { OpenweathermapWidgetComponent } from './dashboard/widgets/openweathermap-widget/openweathermap-widget.component';
import { IexWidgetComponent } from './dashboard/widgets/iex-widget/iex-widget.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
