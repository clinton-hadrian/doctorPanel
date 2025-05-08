import { CommonService } from '../../core/services/common.service';
import { FormService } from '../../core/services/form.service';

export enum roleEnum {
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ALL = 'ALL',
}

export const MESSAGE: any = {
  NO_RIF: {
    message: 'No RIF form was found',
  },
  NO_CUSTOMER: {
    message: 'No customer was found',
  },
};

export const doctorList: any[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Cardiologist',
    contact: '9876543210',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Meena Iyer',
    specialization: 'Dermatologist',
    contact: '9123456780',
    available: false,
  },
  // {
  //   id: 3,
  //   name: 'Dr. Akash Patel',
  //   specialization: 'Orthopedic Surgeon',
  //   contact: '9988776655',
  //   available: true,
  // },
  // {
  //   id: 4,
  //   name: 'Dr. Swathi Reddy',
  //   specialization: 'Pediatrician',
  //   contact: '9001122334',
  //   available: true,
  // },
  // {
  //   id: 5,
  //   name: 'Dr. Arjun Das',
  //   specialization: 'Neurologist',
  //   contact: '9012345678',
  //   available: false,
  // },
  // {
  //   id: 6,
  //   name: 'Dr. Priya Nair',
  //   specialization: 'Gynecologist',
  //   contact: '8899776655',
  //   available: true,
  // },
  // {
  //   id: 7,
  //   name: 'Dr. Kiran Thomas',
  //   specialization: 'General Physician',
  //   contact: '9876123450',
  //   available: true,
  // },
  // {
  //   id: 8,
  //   name: 'Dr. Varun Singh',
  //   specialization: 'ENT Specialist',
  //   contact: '7788990011',
  //   available: false,
  // },
  // {
  //   id: 9,
  //   name: 'Dr. Neha Kapoor',
  //   specialization: 'Ophthalmologist',
  //   contact: '9090909090',
  //   available: true,
  // },
  // {
  //   id: 10,
  //   name: 'Dr. Imran Ali',
  //   specialization: 'Psychiatrist',
  //   contact: '8000111222',
  //   available: false,
  // },
];

export const COLS: any = {
  DOCTOR_COLS: [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'specialization', header: 'Specialization' },
    { field: 'contact', header: 'Contact' },
    { field: 'available', header: 'Availability' },
    { field: 'action', header: 'Action' },
    { field: 'view', header: 'View All' },
  ],

  USER_RIF: [
    { field: 'ID', header: 'RemitterID' },
    { field: 'RemitterID', header: 'Transaction RIF ID' },
    { field: 'loginDetails', header: 'Login Details' },
    { field: 'SDPayable', header: 'Stamp Duty' },
    { field: 'TotalVAS', header: 'Software usage charges' },
    { field: 'Typeoftransactions', header: 'Type of Transaction' },
    { field: 'CompanyName', header: 'Company Name' },
    { field: 'CreatedOn', header: 'Created Date' },
    { field: 'Status', header: 'Status' },
    { field: 'action', header: 'Action' },
    { field: 'payment', header: 'Payment' },
  ],

  CUSTOMER_RIF: [
    { field: 'ID', header: 'RemitterID' },
    { field: 'RemitterID', header: 'Transaction RIF ID' },
    { field: 'Typeoftransactions', header: 'Type of Transaction' },
    { field: 'CompanyName', header: 'Company Name' },
    { field: 'CreatedOn', header: 'Created Date' },
    { field: 'Status', header: 'Status' },
    { field: 'action', header: 'Action' },
    { field: 'payment', header: 'Payment' },
  ],

  CUSTOMER_LIST: [
    { field: 'ID', header: 'ID' },
    { field: 'CreatedOn', header: 'Date Of Enquiry' },
    { field: 'Name', header: 'Name' },
    { field: 'CompanyName', header: 'Company' },
    { field: 'Email', header: 'Email' },
    { field: 'Mobile', header: 'Mobile' },
    { field: 'rifDetails', header: 'RIF Details' },
    { field: 'Status', header: 'Status' },
    { field: 'action', header: 'Action' },
    { field: 'loginLink', header: 'Send Login Link' },
  ],

  PAYMENT_XLSX: [
    { field: 'rifId', header: 'RIF ID' },
    { field: 'remitterId', header: 'Transaction Customer ID' },
    { field: 'camsAmount', header: 'Cams Amount' },
    { field: 'cameoAmount', header: 'Cameo Amount' },
    { field: 'convenienceCharge', header: 'Convenience Charges' },
    { field: 'typeOfPayment', header: 'Type of Payment' },
    { field: 'paymentMode', header: 'Payment Mode' },
    { field: 'status', header: 'Status' },
    { field: 'action', header: 'Action' },
  ],
};

export const SIDEBAR: any = {
  true: {
    icon: 'pi pi-angle-double-right',
  },
  false: {
    icon: 'pi pi-angle-double-left',
  },
};

export const STATUS_MAP: any = {
  PAYMENT_STAMP: {
    severity: 'warning',
    icon: 'pi pi-exclamation-triangle',
    name: 'Pending(SD)',
  },
  PAYMENT_INVOICE: {
    severity: 'warning',
    icon: 'pi pi-exclamation-triangle',
    name: 'Pending(I)',
  },
  PAYMENT_STAMP_INVOICE: {
    severity: 'warning',
    icon: 'pi pi-exclamation-triangle',
    name: 'Pending(SD/I)',
  },
  SUCCESS: {
    severity: 'success',
    icon: 'pi pi-check',
    name: 'Success',
  },
  CAPTURED: {
    severity: 'success',
    icon: 'pi pi-check',
    name: 'Success',
  },
  Rejected: {
    severity: 'danger',
    icon: 'pi pi-times',
    name: 'Rejected',
  },
  FAILURE: {
    severity: 'danger',
    icon: 'pi pi-times',
    name: 'Failure',
  },

  'Draft Saved': {
    severity: 'secondary',
    icon: 'pi pi-save',
    name: 'Draft Saved',
  },
  Submitted: {
    severity: '',
    icon: 'pi pi-check',
    name: 'Submitted',
  },
  Approved: {
    severity: 'info',
    icon: 'pi pi-thumbs-up-fill',
    name: 'Approved',
  },
};

export const CUSTOMER_STATUS_MAP: any = {
  Rejected: {
    severity: 'danger',
    icon: 'pi pi-thumbs-down-fill',
    name: 'Rejected',
  },
  Submitted: {
    severity: 'info',
    icon: 'pi pi-check',
    name: 'Submitted',
  },
  Approved: {
    severity: 'success',
    icon: 'pi pi-thumbs-up-fill',
    name: 'Approved',
  },
};

export const DOCTOR_STATUS_MAP: any = {
  false: {
    severity: 'danger',
    icon: 'pi pi-hourglass',
    name: 'Not Available',
  },
  true: {
    severity: 'success',
    icon: 'pi pi-check',
    name: 'Available',
  },
};

export function getStatuses(commonService: CommonService) {
  return [
    {
      label: 'All',
      value: 'all',
      visible: commonService.hasRoles('CUSTOMER', 'USER'),
    },
    {
      label: 'Draft Saved',
      value: 'Draft Saved',
      visible: commonService.hasRoles('CUSTOMER', 'USER'),
    },
    {
      label: 'Submitted',
      value: 'Submitted',
      visible: commonService.hasRoles('CUSTOMER', 'USER'),
    },
    {
      label: 'Approved',
      value: 'Approved',
      visible: commonService.hasRoles('CUSTOMER', 'USER'),
    },
    {
      label: 'Failure/Pending',
      value: 'FAILURE',
      visible: commonService.hasRoles('USER'),
    },
    {
      label: 'Pending Receipt',
      value: 'pendingReceipt',
      visible: commonService.hasRoles('USER'),
    },
    {
      label: 'Pending Invoice',
      value: 'pendingInvoice',
      visible: commonService.hasRoles('USER'),
    },
    {
      label: 'Pending invoice download',
      value: 'invoiceDownload',
      visible: commonService.hasRoles('USER'),
    },
    {
      label: 'Success',
      value: 'SUCCESS',
      visible: commonService.hasRoles('CUSTOMER', 'USER'),
    },
    {
      label: 'Rejected',
      value: 'Rejected',
      visible: commonService.hasRoles('CUSTOMER', 'USER'),
    },
  ].filter((status) => status.visible);
}

export function dateOfAllotmentOps(fs: any) {
  return [
    { label: `Date of ${fs}`, value: 'Date of Allotment' },
    {
      label: `Yet to be approved by board`,
      value: 'Yet to be approved by board',
    },
  ];
}
