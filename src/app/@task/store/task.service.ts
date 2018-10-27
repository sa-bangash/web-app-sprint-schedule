import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from './task.state.model'
import { ActiveService } from '../../http-helper';
import { catchError } from 'rxjs/operators';
import { SprintModel } from './sprint.state.model';
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
    return this.get(`task/all`) as Observable<TaskModel[]>
  }
  fetchMy(): Observable<TaskModel[]> {
    return this.get(`task`) as Observable<TaskModel[]>
  }

  addSprint(obj: any): Observable<SprintModel> {
    return this.post('task/sprint', obj) as Observable<SprintModel>
  }
  FetchAllSprints(): Observable<SprintModel[]> {
    return this.get('task/sprint') as Observable<SprintModel[]>
  }
}
