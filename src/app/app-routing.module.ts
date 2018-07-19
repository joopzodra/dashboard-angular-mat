import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NosNewsPageComponent } from './pages/nos-news-page/nos-news-page.component';
import { OpenweathermapPageComponent } from './pages/openweathermap-page/openweathermap-page.component';
import { GuardianNewsPageComponent } from './pages/guardian-news-page/guardian-news-page.component'

const routes: Routes = [
  { path: 'overzicht', component: DashboardComponent },
  { path: 'paginas/nieuws', component: NosNewsPageComponent },
  { path: 'paginas/tech-news', component: GuardianNewsPageComponent},
  { path: 'paginas/weer', component: OpenweathermapPageComponent},
  { path: '', redirectTo: 'overzicht', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingComponents = [
  DashboardComponent,
  NosNewsPageComponent,
  OpenweathermapPageComponent,
  GuardianNewsPageComponent
]
