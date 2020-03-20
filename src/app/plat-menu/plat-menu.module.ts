import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatComponent } from '../components/plat/plat.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PlatComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [PlatComponent]
})
export class PlatMenuModule { }
