import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { tap, catchError } from 'rxjs/operators';
import { TaskService } from './task.service';

export class TaskModel {
    storyNumber?: string;
    description?: string;
    estimatedTime?: string;
    date?: string;
    status?: boolean;
    get statusDisplay(): string {
        return this.status ? 'Done' : 'To Do';
    }
    static getObject(data = {}): TaskModel {
        return Object.assign(new TaskModel(), data);
    }

}
export class TaskStateModel {
    list: TaskModel[];
    selectedTask: TaskModel;
    error: TaskModel;
}

export namespace TaskAction {
    export class FetchAll {
        static readonly type = '[Task] Fetch All';
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
}

