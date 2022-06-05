import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})


export class IndexService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  status(): Observable<string[]> {
    let subject = new Subject<string[]>();
    this.http.get(this.baseUrl + 'livro/status')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json)
      });
    return subject.asObservable();
  }

}
