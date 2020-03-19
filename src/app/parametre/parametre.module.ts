import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametrePageRoutingModule } from './parametre-routing.module';

import { ParametrePage } from './parametre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ParametrePageRoutingModule
  ],
  declarations: [ParametrePage]
})
export class ParametrePageModule {}
