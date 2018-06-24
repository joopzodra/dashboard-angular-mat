import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const moduleList = [
  MatListModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  imports: moduleList,
  exports: moduleList,
})
export class AppMaterialModule { }