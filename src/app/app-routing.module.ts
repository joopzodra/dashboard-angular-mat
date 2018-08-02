import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { NosNewsPageComponent } from './pages/nos-news-page/nos-news-page.component';
import { OpenweathermapPageComponent } from './pages/openweathermap-page/openweathermap-page.component';
import { GuardianNewsPageComponent } from './pages/guardian-news-page/guardian-news-page.component';
import { IexPageComponent } from './pages/iex-page/iex-page.component';

const routes: Routes = [
  { path: 'overzicht', component: OverviewPageComponent },
  { path: 'paginas/nieuws', component: NosNewsPageComponent },
  { path: 'paginas/tech-news', component: GuardianNewsPageComponent },
  { path: 'paginas/weer', component: OpenweathermapPageComponent },
  { path: 'paginas/tech-aandelen', component: IexPageComponent },
  { path: '**', redirectTo: 'overzicht' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingComponents = [
  OverviewPageComponent,
  NosNewsPageComponent,
  OpenweathermapPageComponent,
  GuardianNewsPageComponent,
  IexPageComponent
]
