import { Component, OnInit } from '@angular/core';
import { AttendanceService, StudentService, CourseService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
@Component({ selector: 'app-attendance', templateUrl: './attendance.component.html' })
export class AttendanceComponent implements OnInit {
  students: any[] = [];
  courses: any[] = [];
  selectedCourse = '';
  selectedDate = new Date().toISOString().split('T')[0];
  attendanceRows: { student: any; status: string }[] = [];
  records: any[] = [];
  loading = false; saving = false; viewMode = 'mark';
  constructor(private attSvc: AttendanceService, private stuSvc: StudentService, private crsSvc: CourseService, public auth: AuthService) {}
  ngOnInit() {
    this.stuSvc.getAll({ limit: 100 }).subscribe((r: any) => this.students = r.data || []);
    this.crsSvc.getAll().subscribe((r: any) => this.courses = r.data || []);
  }
  loadStudentsForCourse() { this.attendanceRows = this.students.map(s => ({ student: s, status: 'present' })); }
  saveAttendance() {
    if (!this.selectedCourse || !this.selectedDate) return alert('Select course and date');
    this.saving = true;
    const records = this.attendanceRows.map(r => ({ student_id: r.student.id, course_id: +this.selectedCourse, date: this.selectedDate, status: r.status }));
    this.attSvc.mark(records).subscribe({ next: () => { this.saving = false; alert('Attendance saved!'); }, error: () => this.saving = false });
  }
  loadRecords() {
    this.loading = true;
    this.attSvc.getAll({ course_id: this.selectedCourse }).subscribe({
      next: (r: any) => { this.records = r.data || []; this.loading = false; },
      error: () => this.loading = false
    });
  }
  setAll(status: string) { this.attendanceRows.forEach(r => r.status = status); }
}
