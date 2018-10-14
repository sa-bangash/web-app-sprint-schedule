import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ActiveService {

    constructor(public http: HttpClient) { }

    private get url(): string {
        return environment.restUrl;
    }

    post(path: string, payload: any): Observable<any> {
        return this.http.post(this.url + path, payload);
    }

    get(path: string): Observable<any> {
        return this.http.get(this.url + path);
    }

    put(path: string, payload: any): Observable<any> {
        return this.http.put(this.url + path, payload);
    }

    delete(path: string): Observable<any> {
        return this.http.delete(this.url + path);
    }

}
