// courses.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-courses', templateUrl: './courses.component.html' })
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  loading = false; saving = false;
  showModal = false; isEdit = false;
  form: FormGroup; editId: number | null = null;
  departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Electronics' }
  ];

  constructor(private svc: CourseService, public auth: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      course_name:   ['', Validators.required],
      course_code:   ['', Validators.required],
      department_id: ['', Validators.required],
      credits:       [3, Validators.required],
      semester:      [1, Validators.required],
      description:   ['']
    });
  }

  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.svc.getAll().subscribe({ next: r => { this.courses = r.data; this.loading = false; }, error: () => this.loading = false });
  }

  openAdd() { this.isEdit = false; this.form.reset({ credits: 3, semester: 1 }); this.showModal = true; }
  openEdit(c: any) {
    this.isEdit = true; this.editId = c.id;
    this.form.patchValue(c); this.showModal = true;
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    const obs = this.isEdit ? this.svc.update(this.editId!, this.form.value) : this.svc.create(this.form.value);
    obs.subscribe({ next: () => { this.showModal = false; this.saving = false; this.load(); }, error: () => this.saving = false });
  }

  delete(id: number) {
    if (!confirm('Delete this course?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
