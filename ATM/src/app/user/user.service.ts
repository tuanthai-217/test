import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from '../shared/services/base.service';

@Injectable({ providedIn: "root" })
export class UserService extends BaseService {
    constructor(
        private httpc: HttpClient,
    ) {
        super(httpc)
    }

    sendContact(body: any) {
        return this.postData(`contact`, body)
    }

    // getProfile(): Observable<any> {
    //     const user$: Observable<any> = new Observable((observer: any) => {
    //         this.getData("user/profile").subscribe({
    //             next: (res) => {
    //                 observer.next(res);
    //                 this.profileChanged.next(res);
    //             },
    //             error: (err) => {
    //                 observer.error(err);
    //                 this.loggedIn.next(false);
    //             },
    //         });
    //     });
    //     return user$;
    // }

    getListAtm(type:number, search?:string, page:string|number = 1, limit:string|number = 10 ) {
      return this.getData(`atm?type=${type}&search=${search}&page=${page}&limit=${limit}`)
    }

    editATM(_id?: string, body?:any) {
      let tmp_query = `atm/${_id}`
      return this.putData(tmp_query,body);
    }

    deleteATM(_id?: string, body?:any) {
      let tmp_query = `atm/${_id}`
      return this.delete(tmp_query,body);
    }

    createATM(body: any) {
      return this.postData('atm',body)
    }
}
