import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
import { TaskService } from "./task.service";
import { tap, catchError } from "rxjs/operators";
import { getMilliseconds } from 'date-fns';
export class SprintModel {
    name: string;
    start: Date;
    end: Date;

    static getObject(data: Partial<SprintModel> = {}): SprintModel {
        const obj = {
            ...data,
            start: data.start ? new Date(data.start) : null,
            end: data.end ? new Date(data.end) : null,
        }
        console.log(obj)
        return Object.assign(new SprintModel(), obj);
    }
    getRest = () => {
        return {
            name: this.name,
            start: this.start.getTime(),
            end: this.end.getTime()
        }
    }
}

export class SprintStateModel {
    list: SprintModel[] = [];
    error: SprintModel;
    selectedSprint: SprintModel;
}

export namespace SprintAction {
    export class Add {
        static readonly type = '[Sprint] Add';
        constructor(public payload: any) {

        }
    }
}

@State<SprintStateModel>({
    name: 'Sprint',
    defaults:new SprintStateModel()
})
export class SprintState {

    constructor(private service: TaskService, private store: Store) {

    }
    @Selector()
    static sprintError(state: SprintStateModel): SprintModel { return state.error; }

    @Action(SprintAction.Add)
    addSprint(ctx: StateContext<SprintStateModel>, action: SprintAction.Add) {
        const state = ctx.getState();
        const payload = SprintModel.getObject(action.payload).getRest();
        console.log('payload', payload)
        return this.service.addSprint(payload)
            .pipe(
                tap((resp) => {
                    ctx.patchState({
                        list: [...state.list, SprintModel.getObject(resp)],
                        error: SprintModel.getObject()
                    })
                }),
                catchError((err) => {
                    ctx.patchState({
                        error: SprintModel.getObject(err.error)
                    })
                    throw err;
                })
            )
    }
}