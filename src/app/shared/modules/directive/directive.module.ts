import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from '../../directives/only-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [OnlyNumberDirective],
  exports: [OnlyNumberDirective],
})
export class DirectiveModule {}
