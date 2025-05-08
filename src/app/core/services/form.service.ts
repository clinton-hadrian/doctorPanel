import { computed, Injectable, Signal, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  dateOfAllotmentOps,
  DOCTOR_STATUS_MAP,
} from '../../shared/utils/array.utils';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  public formSignal = signal<FormGroup | null>(null);
  private controlSignalMap = new Map<string, Signal<string>>();
  public typeOfTransactionSignal!: Signal<string>;
  public typeOfSecuritySignal!: Signal<string>;

  // Utility to get or create a signal for a form control
  private bindControlToSignal(
    form: FormGroup,
    controlPath: string
  ): Signal<string> {
    if (this.controlSignalMap.has(controlPath)) {
      return this.controlSignalMap.get(controlPath)!;
    }

    const control = form.get(controlPath);
    const signalRef = signal(control?.value ?? '');

    if (control) {
      control.valueChanges.subscribe((val) => {
        //console.log(dateOfAllotmentOps(this))
        signalRef.set(val ?? '');
      });
    }

    this.controlSignalMap.set(controlPath, signalRef);
    return signalRef;
  }

  setForm(form: FormGroup) {
    this.formSignal.set(form);
    this.typeOfTransactionSignal = this.bindControlToSignal(
      form,
      'formStep1.typeoftransactions'
    );
    this.typeOfSecuritySignal = this.bindControlToSignal(
      form,
      'formStep1.typeofSecurities'
    );
  }

  // Optional: expose raw signal if needed
  get form() {
    return this.formSignal;
  }

  typeOfTransaction = computed(() => this.typeOfTransactionSignal());
  typeOfSecurities = computed(() => this.typeOfSecuritySignal());

  allottedQtyLb = computed(() => {
    return this.typeOfTransaction() === 'Transfer'
      ? 'Transferred quantity'
      : 'Allotted quantity';
  });

  allottedQtyPh = computed(() => {
    return (
      'Enter ' +
      (this.typeOfTransaction() === 'Transfer'
        ? 'Transferred quantity'
        : 'Allotted quantity')
    );
  });

  valueofAllottmentLb = computed(() => {
    return this.typeOfTransaction() === 'Transfer'
      ? 'Sale Value per security in Rs.'
      : 'Value of Allotment per security in Rs. (including premium)';
  });

  valueofAllottmentPh = computed(() => {
    return (
      'Enter ' +
      (this.typeOfTransaction() === 'Transfer'
        ? 'Sale value'
        : 'Allotment value')
    );
  });

  totalAllottmentLb = computed(() => {
    return this.typeOfTransaction() === 'Transfer'
      ? 'Total consideration value of Transfer in Rs.'
      : 'Total value of allotment (including premium) in Rs.';
  });

  totalAllottmentPh = computed(() => {
    return (
      'Enter ' +
      (this.typeOfTransaction() === 'Transfer'
        ? 'total consideration value'
        : 'total allotment value')
    );
  });

  dateOfAllotmentLb = computed(() => {
    return `Date of ${this.typeOfTransaction()}`;
  });

  dateOfAllotmentPh = computed(() => {
    return `Select date of ${this.typeOfTransaction()}`;
  });

  allotDateLb = computed(() => {
    return `Date to be ${
      this.typeOfTransaction() == 'Transfer' ? 'Transferred' : 'Allotted'
    }`;
  });

  hasError(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.errors && control.touched);
  }

  getErrorMessage(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (control?.hasError('required') || control?.hasError('noOnlySpaces')) {
      return 'This field is required';
    } else if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    } else if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    } else if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
    } else if (control?.hasError('pattern')) {
      return 'Invalid format';
    } else if (control?.hasError('numericNotAllowed')) {
      return 'Numeric characters not allowed';
    } else if (control?.hasError('invalidCompanyName')) {
      return 'Invalid company name';
    } else if (control?.hasError('invalidEmail')) {
      return 'Invalid email address';
    } else if (control?.hasError('notOnlyText')) {
      return 'Only text is allowed';
    } else if (control?.hasError('invalidMobileNumber')) {
      return 'Invalid mobile number';
    } else if (control?.hasError('requireTrue')) {
      return 'This field is required';
    }

    return '';
  }

  buildDraftPayload(rifForm: FormGroup, regID: number, formStatus: string) {
    const step1 = rifForm.get('formStep1')?.getRawValue() || {};
    const step2 = rifForm.get('formStep2')?.getRawValue() || {};
    const step3 = rifForm.get('formStep3')?.getRawValue() || {};
    const step4 = rifForm.get('formStep4')?.getRawValue() || {};

    const percentage =
      Number((step3.percentageSD || '0').toString().replace('%', '')) || 0;

    const payload = {
      remitterID: regID,
      regID: Number(regID),
      typeofRemitter: step1.typeofRemitter,
      typeofSecurities: step1.typeofSecurities,
      natureofSecurities: step1.natureofSecurities || '',
      typeoftransactions: step1.typeoftransactions,

      companyName: step2.companyName,
      address1: step2.address1,
      address2: step2.address2,
      address3: step2.address3,
      city: step2.city,
      pincode: step2.pincode,
      state: step2.state,
      country: step2.country,
      contactPerson: step2.contactPerson,
      mobileNo: step2.mobileNo,
      emailId: step2.emailId,
      CINno: step2.CINno,

      allottedQty: step3.allottedQty,
      valueofAllottment: step3.valueofAllottment,
      faceValue: step3.faceValue,
      totalAllottment: step3.totalAllottment,
      percentageSD: step3.percentageSD,
      SDPayable:
        step3.SDPayable > step3.SDPayable1 ? step3.SDPayable : step3.SDPayable1,
      ActualSDAmount: Math.ceil(
        Number(step3.totalAllottment) * (percentage / 100)
      ),
      dateofAllottment: this.dateConvert(step3.dateofAllottment),
      selectDateofAllotment: step3.selectDateofAllotment,

      VAS: step4.VAS,
      GST: step4.GST,
      totalVAS: step4.totalVAS,
      invoiceName: step4.invoiceName,
      invoiceAddress: step4.invoiceAddress,
      invoiceCity: step4.invoiceCity,
      invoicePIN: step4.invoicePIN,
      invoiceState: step4.invoiceState,
      GSTNo: step4.GSTNo,
      PANNo: step4.PANNo,
      TDSAmount: step4.deductAmount, // You can add logic if needed
      status: formStatus,
      createdBy: Number(regID),
      ModifiedBy: Number(regID),
    };

    return payload;
  }

  private dateConvert(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString();
  }

  formHelper(fg: FormGroup) {}

  getSeverity(status: any) {
    return DOCTOR_STATUS_MAP[status]?.severity || 'danger';
  }
  getTagIcon(status: any) {
    return DOCTOR_STATUS_MAP[status]?.icon || 'pi pi-times';
  }
  getTagValue(status: any) {
    return DOCTOR_STATUS_MAP[status]?.name || 'Unknown';
  }
}
