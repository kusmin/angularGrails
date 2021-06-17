import { Injectable } from "@angular/core";
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from "@angular/http";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Autor } from "./autor";


@Injectable()
export class AutorService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Autor[]> {
    let subject = new Subject<Autor[]>();
    this.http.get(this.baseUrl + 'autor')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Autor(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Autor> {
    return this.http.get(this.baseUrl + 'autor/' + id)
      .map((r: Response) => new Autor(r.json()));
  }

  save(autor: Autor): Observable<Autor> {
    const headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.delete("Content-Type");
    headers.append('X-Requested-With', 'XMLHttpRequest');

    const formData: FormData = new FormData();

    for (let property in autor) {
      if (autor.hasOwnProperty(property)) {
        let value;
        if (autor[property] instanceof Date) {
          value = autor[property].toISOString();
        } else {
          value = autor[property];
        }
        formData.append(property, value);
      }
    }

    const requestOptions = new RequestOptions({
      headers: headers,
      body: formData
    });

    if (autor.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'autor/' + autor.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'autor';
    }

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Autor(r.json()));
  }

  destroy(autor: Autor): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'autor/' + autor.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}
