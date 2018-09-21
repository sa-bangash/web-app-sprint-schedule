import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

export class AuthStateModel {
    token?: string;
    email?: string;
    name?: string;
}

export namespace AuthAction {
    export class Login {
        static readonly type = '[Auth] login';
        constructor(public payload: { email: string, password: string }) { }
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
    
    @Action(AuthAction.Login)
    login({ patchState }: StateContext<AuthStateModel>, action: AuthAction.Login) {
        return this.service.login(action.payload)
            .pipe(tap((resp) => {
                patchState({
                    ...resp,
                })
                this.store.dispatch(new Navigate(['dashboard']))
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
}

