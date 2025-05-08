export class messageHelper {
  static getErrorMessage(err: any): string {
    console.log('Error2', err?.error)
    return err?.error?.Message ? err?.statusText : err?.status == 0 ? "Cannot connect to server. Please check your network or try again later." : err?.error || 'An unexpected error occurred.';
  }
}
