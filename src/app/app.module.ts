import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskPresenterComponent } from './task-presenter/task-presenter.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MinuteSecondsPipe } from './minute-seconds.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskContainerComponent,
    TaskPresenterComponent,
    TaskAddComponent,
    MinuteSecondsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
