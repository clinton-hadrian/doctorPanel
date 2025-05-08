import { Component, Input, input } from '@angular/core';
import { PrimengModule } from '../../modules/primeng/primeng.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-dialog',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './display-dialog.component.html',
  styleUrl: './display-dialog.component.scss',
})
export class DisplayDialogComponent {
  visible: boolean = false;

  @Input() data!: string;

  showHeader = input.required<boolean>();
  header = input.required<string>();
  icon = input<string>();

  showDialog() {
    this.visible = true;
  }
}
