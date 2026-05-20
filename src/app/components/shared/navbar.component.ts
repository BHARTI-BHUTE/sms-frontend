import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar bg-white border-bottom px-4 py-2 shadow-sm d-flex justify-content-between align-items-center">
    <span class="fw-bold text-primary fs-5"><i class="bi bi-mortarboard-fill me-2"></i>Student Management System</span>
    <div class="d-flex align-items-center gap-3">
      <span class="badge bg-primary px-3 py-2 rounded-pill fs-6">
        <i class="bi bi-person-circle me-1"></i>{{ user?.name }}
        <span class="opacity-75 ms-1">({{ user?.role | titlecase }})</span>
      </span>
      <button class="btn btn-outline-danger btn-sm" (click)="logout()">
        <i class="bi bi-box-arrow-right me-1"></i>Logout
      </button>
    </div>
  </nav>`
})
export class NavbarComponent {
  user: any;
  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
  }
  logout() { this.auth.logout(); }
}
