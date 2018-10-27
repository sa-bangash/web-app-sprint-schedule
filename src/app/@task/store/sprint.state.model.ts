import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
import { TaskService } from "./task.service";
import { tap, catchError } from "rxjs/operators";
export class SprintModel {
    _id: string;
    name: string;
    start: Date;
    end: Date;

    get startToString(): string {
        const date = new Date(this.start);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    get endToString(): string {
        const date = new Date(this.end);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    static getObject(data: Partial<SprintModel> = {}): SprintModel {
        let obj = {};
        if (data) {
            obj = {
                ...data,
                start: data.start ? new Date(data.start) : null,
                end: data.end ? new Date(data.end) : null,
            }
        }

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
    export class FetchAll {
        static readonly type = '[Sprint] Fetch All';
    }
}

@State<SprintStateModel>({
    name: 'Sprint',
    defaults: new SprintStateModel()
})
export class SprintState {

    constructor(private service: TaskService, private store: Store) {

    }
    @Selector()
    static sprintError(state: SprintStateModel): SprintModel { return state.error; }

    @Selector()
    static fetchAll(state: SprintStateModel): SprintModel[] { return state.list; }

    @Action(SprintAction.Add)
    addSprint(ctx: StateContext<SprintStateModel>, action: SprintAction.Add) {
        const state = ctx.getState();
        const payload = SprintModel.getObject(action.payload).getRest();
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

    @Action(SprintAction.FetchAll)
    fetchAll({ patchState }: StateContext<SprintStateModel>) {
        return this.service.FetchAllSprints()
            .pipe(
                tap((resp) => {
                    patchState({
                        list: resp.map((item) => SprintModel.getObject(item)),
                    })
                })
            )
    }
}