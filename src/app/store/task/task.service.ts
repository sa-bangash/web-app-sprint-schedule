import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TaskModel } from './task.state.model'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = environment.restUrl;
  constructor(private http: HttpClient) { }

  add(obj: TaskModel): Observable<TaskModel> {
    return this.http.post(`${this.baseUrl}task`, obj) as Observable<TaskModel>;
  }

  fetchAll(): Observable<TaskModel[]> {
    return this.http.get(`${this.baseUrl}task`) as Observable<TaskModel[]>
  }
}
