import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showSuccess(title: string, content: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: content,
    });
  }

  showInfo(title: string, content: string) {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: content,
    });
  }

  showWarn(title: string, content: string) {
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: content,
    });
  }

  showError(title: string, content: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: content,
    });
  }

  showContrast(title: string, content: string) {
    this.messageService.add({
      severity: 'contrast',
      summary: title,
      detail: content,
    });
  }

  showSecondary(title: string, content: string) {
    this.messageService.add({
      severity: 'secondary',
      summary: title,
      detail: content,
    });
  }
}
