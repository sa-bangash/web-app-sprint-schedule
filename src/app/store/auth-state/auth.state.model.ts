import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';

export class AuthStateModel {
    token?: string;
    email?: string;
    name?: string;
    error: any;
}

export namespace AuthAction {
    export class Login {
        static readonly type = '[Auth] login';
        constructor(public payload: { email: string, password: string }) { }
    }

    export class CreateWorkSpace {
        static readonly type = '[Auth] Create work space';
        constructor(public payload: { name: string, email: string, password: string, confirmPassword: string, workSpace: string }) { }
    }
    export class Signup {
        static readonly type = '[Auth] sign up';
        constructor(public payload: { name: string, email: string, password: string, confirmPassword: string }) { }
    }

    export class Logout {
        static readonly type = '[Auth] logout';
    }
}

@State<AuthStateModel>({
    name: 'Auth'
})
export class AuthState {
    constructor(private service: AuthService, private store: Store) { }
    @Selector()
    static token(state: AuthStateModel) { return state.token };

    @Selector()
    static error(state: AuthStateModel) { return state.error }
    @Action(AuthAction.Login)
    login({ patchState }: StateContext<AuthStateModel>, action: AuthAction.Login) {
        return this.service.login(action.payload)
            .pipe(tap((resp) => {
                patchState({
                    ...resp,
                })
                this.store.dispatch(new Navigate(['dashboard/sprint-form']))
            }), catchError((err) => {
                patchState({
                    error: err.error,
                })
                throw err.error;
            }))
    }

    @Action(AuthAction.Signup)
    signup({ patchState }: StateContext<AuthStateModel>, action: AuthAction.Signup) {
        return this.service.signup(action.payload)
            .pipe(tap((resp) => {
                patchState({
                    ...resp
                })
            }))
    }

    @Action(AuthAction.CreateWorkSpace)
    createWorkSpace({ patchState }: StateContext<AuthStateModel>, action: AuthAction.CreateWorkSpace) {
        return this.service.createWorkSpace(action.payload)
            .pipe(tap((resp) => {
                patchState({
                    ...resp,
                    error: null,
                })
                this.store.dispatch(new Navigate(['dashboard/sprint-form']))
            }), catchError((err) => {
                console.log(err, err.error)
                patchState({
                    error: err.error,
                })
                throw err.error;
            }))
    }
}

