import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const modules = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
];
@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
