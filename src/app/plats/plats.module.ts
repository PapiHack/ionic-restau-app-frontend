import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatsPage } from './plats.page';
import { PlatMenuModule } from '../plat-menu/plat-menu.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlatMenuModule,
    RouterModule.forChild([{ path: '', component: PlatsPage }])
  ],
  declarations: [PlatsPage]
})
export class PlatsPageModule {}
