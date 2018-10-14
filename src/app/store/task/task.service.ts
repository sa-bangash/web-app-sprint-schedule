import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from './task.state.model'
import { ActiveService } from '../../http-helper';
@Injectable({
  providedIn: 'root'
})
export class TaskService extends ActiveService {

  constructor(public http: HttpClient) {
    super(http);
  }

  add(obj: TaskModel): Observable<TaskModel> {
    return this.post(`task`, obj) as Observable<TaskModel>;
  }

  fetchAll(): Observable<TaskModel[]> {
    return this.get(`task`) as Observable<TaskModel[]>
  }
}