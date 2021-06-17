import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Categoria } from './categoria';



@Injectable()
export class CategoriaService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Categoria[]> {
    let subject = new Subject<Categoria[]>();
    this.http.get(this.baseUrl + 'categoria')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Categoria(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Categoria> {
    return this.http.get(this.baseUrl + 'categoria/' + id)
      .map((r: Response) => new Categoria(r.json()));
  }

  save(categoria: Categoria): Observable<Categoria> {
    const requestOptions = new RequestOptions();
    if (categoria.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'categoria/' + categoria.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'categoria';
    }
    requestOptions.body = JSON.stringify(categoria);
    requestOptions.headers = new Headers({ "Content-Type": "application/json" });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Categoria(r.json()));
  }

  destroy(categoria: Categoria): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'categoria/' + categoria.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}
