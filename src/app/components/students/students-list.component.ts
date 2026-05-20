// students-list.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-students-list', templateUrl: './students-list.component.html' })
export class StudentsListComponent implements OnInit {
  students: any[] = [];
  total = 0; page = 1; limit = 10;
  search = ''; loading = false;

  constructor(public auth: AuthService, private svc: StudentService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAll({ page: this.page, limit: this.limit, search: this.search }).subscribe({
      next: r => { this.students = r.data; this.total = r.total; this.loading = false; },
      error: () => this.loading = false
    });
  }

  delete(id: number) {
    if (!confirm('Delete this student?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }

  onSearch() { this.page = 1; this.load(); }
  pages() { return Math.ceil(this.total / this.limit); }
}
