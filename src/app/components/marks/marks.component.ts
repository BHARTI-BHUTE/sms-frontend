// marks.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarksService, StudentService, CourseService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-marks', templateUrl: './marks.component.html' })
export class MarksComponent implements OnInit {
  marks: any[] = [];
  students: any[] = [];
  courses: any[] = [];
  form: FormGroup;
  showModal = false; loading = false; saving = false;
  filterStudent = ''; filterCourse = '';

  examTypes = ['internal1','internal2','midterm','final','assignment','practical'];

  constructor(
    private svc: MarksService,
    private stuSvc: StudentService,
    private crsSvc: CourseService,
    public auth: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      student_id:     ['', Validators.required],
      course_id:      ['', Validators.required],
      exam_type:      ['internal1', Validators.required],
      max_marks:      [100, Validators.required],
      obtained_marks: ['', Validators.required],
      semester:       [1, Validators.required],
      year:           [new Date().getFullYear(), Validators.required],
      remarks:        ['']
    });
  }

  ngOnInit() {
    this.stuSvc.getAll({ limit: 100 }).subscribe(r => this.students = r.data);
    this.crsSvc.getAll().subscribe(r => this.courses = r.data);
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll({ student_id: this.filterStudent, course_id: this.filterCourse }).subscribe({
      next: r => { this.marks = r.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    this.svc.add(this.form.value).subscribe({
      next: () => { this.showModal = false; this.saving = false; this.load(); },
      error: () => this.saving = false
    });
  }

  gradeClass(g: string) {
    if (['O','A+','A'].includes(g)) return 'bg-success';
    if (['B+','B'].includes(g)) return 'bg-info';
    if (g === 'C') return 'bg-warning';
    return 'bg-danger';
  }
}
