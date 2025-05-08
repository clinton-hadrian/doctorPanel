import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Validator for no leading or trailing spaces
export function noLeadingTrailingSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const valid = value.trim().length > 0;
    return valid ? null : { noOnlySpaces: { value: control.value } };
  };
}

export function noNumericValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  return /\d/.test(value) ? { numericNotAllowed: true } : null;
}

export function companyNameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  // Check if the value is only numeric
  // if (/^\d+$/.test(value) || /^[^a-zA-Z0-9]+$/.test(value) || ) {
  //     return { invalidCompanyName: true };
  // }

  if (
    /^\d+$/.test(value) ||
    /^[^a-zA-Z0-9]+$/.test(value) ||
    /^[\d\W]+$/.test(value)
  ) {
    return { invalidCompanyName: true };
  }

  return null; // Valid input
}

// export const strictEmailValidator = (control: AbstractControl) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value) ? null : { invalidEmail: true };

export function strictEmailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value || typeof value !== 'string') {
    return null;
  }

  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value)
    ? null
    : { invalidEmail: true };
}

export function onlyTextValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  // Check if the value is only text
  if (/^[A-Za-z\s]+$/.test(value) || value === null || value === '') {
    return null;
  }
  return { notOnlyText: true };
}

export function onlyTextOrAlphNumValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  // Allow empty values (optional, adjust as needed)
  if (!value || typeof value !== 'string') {
    return null;
  }

  // Regex patterns
  const isOnlyNumbers = /^\d+$/; // Matches strings with only numbers
  const isOnlySpecialCharacters = /^[^A-Za-z0-9]+$/; // Matches strings with only special characters
  const isValidInput = /[A-Za-z0-9]/; // Matches strings with at least one alphanumeric character

  // Check conditions
  if (isOnlyNumbers.test(value) || isOnlySpecialCharacters.test(value)) {
    return { textNorAlphaNum: true }; // Invalid if only numbers or only special characters
  }

  if (isValidInput.test(value)) {
    return null; // Valid if it contains alphanumeric characters or a mix of characters and symbols
  }

  return { textNorAlphaNum: true }; // Default case: invalid
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    return /^\d{10}$/.test(value) ? null : { invalidMobileNumber: true };
  };
}

export function requireTrue(control: AbstractControl): ValidationErrors | null {
  return control.value === true ? null : { requireTrue: true };
}
