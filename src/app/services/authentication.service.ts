import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    authenticateUser(username: string, password: string) {
        return this.http.get<any>(`../../assets/validUsers.json`)
            .pipe(map(data => {  
                var userData = data.users ;
                return (userData.filter(x => x.userName === username && x.password === password)).length  > 0 ;
            }),
        );
    }

}