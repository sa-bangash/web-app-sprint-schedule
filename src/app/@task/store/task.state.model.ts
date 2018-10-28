import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { TaskService } from './task.service';
import { SprintModel } from './sprint.state.model'
const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satureday'];
export class UserModel {
    name: string;
    email: string;
}
export interface IStatus {
    id: number;
    display: string;
}
export class TaskModel {
    _id: string;
    storyNumber?: string;
    description?: string;
    estimatedTime?: string;
    date?: number;
    status?: IStatus;
    user?: UserModel;
    sprintId?: string | SprintModel;
    get statusDisplay(): string {
        return this.status.display;
    }

    get dateToString(): string {
        const date = new Date(this.date);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    get getWeekOfDay(): string {
        return WeekDays[new Date(this.date).getDay()];
    }

    static getObject(data = {} as TaskModel): TaskModel {

        const newObj = Object.assign(new TaskModel(), data);

        if (typeof newObj.date === 'string') {
            newObj.date = new Date(data.date).getTime();
            if (isNaN(newObj.date)) {
                newObj.date = data.date;
            }
        }

        if (data && typeof data.sprintId === 'object') {
            newObj.sprintId = SprintModel.getObject(data.sprintId);
        }
        return newObj;
    }

}
export class TaskStateModel {
    list: TaskModel[] = [];
    selectedTask: TaskModel;
    error: TaskModel;
    statusList: Array<IStatus> = [];
}

export namespace TaskAction {
    export class FetchAll {
        static readonly type = '[Task] Fetch All Task';
    }

    export class FetchMy {
        static readonly type = '[Task] Fetch My Task'
    }
    export class FetchById {
        static readonly type = '[Task] Fetch by id';
        constructor(public payload: { id: string }) { }
    }

    export class Add {
        static readonly type = '[Task] post';
        constructor(public payload: any) { }
    }

    export class Update {
        static readonly type = '[Task] Update';
        constructor(public payload: TaskStateModel) { }
    }

    export class Delete {
        static readonly type = '[Task] Delete';
        constructor(public payload: string) { }
    }

    export class FetchStatus {
        static readonly type = '[Task] Status load';
    }

    export class UpdateTaskStatus {
        static readonly type = '[Task] Task Status update';
        constructor(public payload: TaskModel) {

        }
    }
}

@State<TaskStateModel>({
    name: 'Task'
})
export class TaskState {
    constructor(private service: TaskService, private store: Store) { }
    @Selector()
    static task(state: TaskStateModel): TaskModel[] { return state.list }

    @Selector()
    static taskError(state: TaskStateModel): TaskModel {
        return state.error;
    }

    @Selector()
    static statusList(state: TaskStateModel): IStatus[] { return state.statusList }

    @Action(TaskAction.FetchMy)
    fetchMy({ patchState }: StateContext<TaskStateModel>, action: TaskAction.FetchAll) {
        return this.service.fetchMy()
            .pipe(
                tap((resp) => {
                    patchState({
                        list: resp.map((item) => TaskModel.getObject(item)),
                    })
                })
            )
    }
    @Action(TaskAction.FetchAll)
    fetchAll({ patchState }: StateContext<TaskStateModel>, action: TaskAction.FetchAll) {
        return this.service.fetchAll()
            .pipe(
                tap((resp) => {
                    patchState({
                        list: resp.map((item) => TaskModel.getObject(item)),
                    })
                })
            )
    }

    @Action(TaskAction.Add)
    add(ctx: StateContext<TaskStateModel>, action: TaskAction.Add) {
        const state = ctx.getState();
        const payload = TaskModel.getObject(action.payload);
        return this.service.add(payload)
            .pipe(
                tap((resp) => {
                    ctx.patchState({
                        list: [...state.list, TaskModel.getObject(resp)],
                        error: TaskModel.getObject()
                    })
                }),
                catchError((err) => {
                    ctx.patchState({
                        error: TaskModel.getObject(err.error),
                    })
                    throw err;
                })
            )
    }

    @Action(TaskAction.Delete)
    delete(ctx: StateContext<TaskStateModel>, action: TaskAction.Add) {
        const state = ctx.getState();
        const id = action.payload;
        return this.service.deleteTask(id)
            .pipe(
                tap((resp => {
                    ctx.patchState({
                        list: state.list.filter((item) => item._id !== id)
                    })
                }))
            )
    }

    @Action(TaskAction.FetchStatus)
    fetchStatus({ patchState }: StateContext<TaskStateModel>) {
        return this.service.fetchStatus()
            .pipe(tap((resp) => {
                patchState({
                    statusList: resp,
                })
            }))
    }

    @Action(TaskAction.UpdateTaskStatus)
    updateTaskStatus(ctx: StateContext<TaskStateModel>, action: TaskAction.UpdateTaskStatus) {
        const state = ctx.getState();
        console.log(action.payload)
        return this.service.updateTaskStatus(action.payload)
            .pipe(
                tap((resp) => {
                    ctx.patchState({
                        list: state.list.map((item) => {
                            if (item._id === action.payload._id) {
                                return TaskModel.getObject(resp);
                            }
                            return item;
                        })
                    })
                })
            )
    }
}

