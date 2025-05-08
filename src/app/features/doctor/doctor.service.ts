import { Injectable, signal } from '@angular/core';
import { Doctor } from '../../core/models/doctor.model';
import { doctorList } from '../../shared/utils/array.utils';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private storageKey = 'doctors';

  doctorListSignal = signal<Doctor[]>([]);

  constructor() {
    const doctors = this.getDoctors();
    if (this.doctorListSignal().length === 0) this.seedData();
  }

  private getData(): Doctor[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private setData(doctors: Doctor[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(doctors));
  }

  getDoctors(pageNumber?: number, pageSize?: number, filter?: any): void {
    let doctors = this.getData();

    if (filter) {
      if (filter?.searchText) {
        const search = filter.searchText.toLowerCase();
        doctors = doctors.filter(
          (doc) =>
            doc.name.toLowerCase().includes(search) ||
            doc.specialization.toLowerCase().includes(search) ||
            doc.contact.toLowerCase().includes(search)
        );
      }
      if (filter.statusFilter) {
        if (filter.statusFilter !== 'all') {
          doctors = doctors.filter(
            (doc) => doc.available === filter.statusFilter
          );
        }
      }
    }

    doctors = doctors.sort((a, b) => a.name.localeCompare(b.name));

    if (pageNumber !== undefined && pageSize !== undefined) {
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      doctors = doctors.slice(start, end);
    }

    this.doctorListSignal.set(doctors);
  }

  getDoctorById(id: number): Doctor | undefined {
    console.log('get doc', id);
    return this.getData().find((doc) => doc.id === id);
  }

  addDoctor(doctor: Omit<Doctor, 'id'>): void {
    const doctors = this.getData();
    const newDoctor: Doctor = { id: Date.now(), ...doctor };
    doctors.push(newDoctor);
    this.setData(doctors);
  }

  updateDoctor(id: number, updatedDoctor: Doctor): void {
    console.log('doctors edit');
    const doctors = this.getData().map((doc) =>
      doc.id === id ? { ...doc, ...updatedDoctor } : doc
    );
    this.setData(doctors);
    console.log('doctors', doctors);
  }

  deleteDoctor(id: number): void {
    const doctors = this.getData().filter((doc) => doc.id !== id);
    this.setData(doctors);
  }

  private seedData() {
    this.setData(doctorList);
  }
}
