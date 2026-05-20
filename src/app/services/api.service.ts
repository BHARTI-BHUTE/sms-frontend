import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE = 'http://localhost:3000/api';

function toParams(obj: any): HttpParams {
  let p = new HttpParams();
  if (!obj) return p;
  Object.keys(obj).forEach(k => { if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') p = p.set(k, obj[k]); });
  return p;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) {}
  getAll(params?: any): Observable<any>          { return this.http.get(`${BASE}/students`, { params: toParams(params) }); }
  getOne(id: number): Observable<any>            { return this.http.get(`${BASE}/students/${id}`); }
  create(data: any): Observable<any>             { return this.http.post(`${BASE}/students`, data); }
  update(id: number, d: any): Observable<any>    { return this.http.put(`${BASE}/students/${id}`, d); }
  delete(id: number): Observable<any>            { return this.http.delete(`${BASE}/students/${id}`); }
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any>                      { return this.http.get(`${BASE}/courses`); }
  create(data: any): Observable<any>             { return this.http.post(`${BASE}/courses`, data); }
  update(id: number, d: any): Observable<any>    { return this.http.put(`${BASE}/courses/${id}`, d); }
  delete(id: number): Observable<any>            { return this.http.delete(`${BASE}/courses/${id}`); }
}

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  constructor(private http: HttpClient) {}
  mark(records: any[]): Observable<any>          { return this.http.post(`${BASE}/attendance`, { records }); }
  getAll(params?: any): Observable<any>          { return this.http.get(`${BASE}/attendance`, { params: toParams(params) }); }
}

@Injectable({ providedIn: 'root' })
export class MarksService {
  constructor(private http: HttpClient) {}
  add(data: any): Observable<any>                { return this.http.post(`${BASE}/marks`, data); }
  getAll(params?: any): Observable<any>          { return this.http.get(`${BASE}/marks`, { params: toParams(params) }); }
  getReport(sid: number, sem: number, yr: number): Observable<any> { return this.http.get(`${BASE}/marks/report/${sid}/${sem}/${yr}`); }
  delete(id: number): Observable<any>            { return this.http.delete(`${BASE}/marks/${id}`); }
}

@Injectable({ providedIn: 'root' })
export class FeesService {
  constructor(private http: HttpClient) {}
  getAll(params?: any): Observable<any>          { return this.http.get(`${BASE}/fees`, { params: toParams(params) }); }
  getSummary(): Observable<any>                  { return this.http.get(`${BASE}/fees/summary`); }
  add(data: any): Observable<any>                { return this.http.post(`${BASE}/fees`, data); }
  pay(id: number, data: any): Observable<any>    { return this.http.put(`${BASE}/fees/${id}/pay`, data); }
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}
  getStats(): Observable<any>                    { return this.http.get(`${BASE}/dashboard`); }
}

@Injectable({ providedIn: 'root' })
export class NoticeService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any>                      { return this.http.get(`${BASE}/notices`); }
  create(data: any): Observable<any>             { return this.http.post(`${BASE}/notices`, data); }
  delete(id: number): Observable<any>            { return this.http.delete(`${BASE}/notices/${id}`); }
}
