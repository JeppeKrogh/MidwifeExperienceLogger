import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienceModalPage } from './experience-modal';

@NgModule({
  declarations: [
    ExperienceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperienceModalPage),
  ],
})
export class ExperienceModalPageModule {}
