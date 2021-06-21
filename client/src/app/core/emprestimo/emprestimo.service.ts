import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Emprestimo } from './emprestimo';



@Injectable()
export class EmprestimoService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  buscar(params): Observable<Emprestimo[]> {
    let pesquisa = new Subject<Emprestimo[]>();
    // const requestOptions = new RequestOptions();
    // requestOptions.body = JSON.stringify(params);
    // requestOptions.headers = new Headers({ "Content-Type": "application/json" });
    this.http.get(this.baseUrl + 'emprestimo/search', params)
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        pesquisa.next(json.map((item: any) => new Emprestimo(item)))
      });
    return pesquisa.asObservable();
  }

  list(): Observable<Emprestimo[]> {
    let subject = new Subject<Emprestimo[]>();
    this.http.get(this.baseUrl + 'emprestimo')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Emprestimo(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Emprestimo> {
    return this.http.get(this.baseUrl + 'emprestimo/' + id)
      .map((r: Response) => new Emprestimo(r.json()));
  }

  save(emprestimo: Emprestimo): Observable<Emprestimo> {
    const requestOptions = new RequestOptions();
    if (emprestimo.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'emprestimo/' + emprestimo.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'emprestimo';
    }
    requestOptions.body = JSON.stringify(emprestimo);
    requestOptions.headers = new Headers({ "Content-Type": "application/json" });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Emprestimo(r.json()));
  }

  destroy(emprestimo: Emprestimo): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'emprestimo/' + emprestimo.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}
