import { Injectable } from "@angular/core";
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from "@angular/http";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Livro } from "./livro";



@Injectable()
export class LivroService {


  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Livro[]> {
    let subject = new Subject<Livro[]>();
    this.http.get(this.baseUrl + 'livro')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Livro(item)))
      });
    return subject.asObservable();
  }

  // search(filtro: LivroFiltro): Observable<Livro[]> {
  //   return this.http.get(this.baseUrl + 'livro/search' + id)
  //   .map((r: Response) => new Livro(r.json()));  }

  get(id: number): Observable<Livro> {
    return this.http.get(this.baseUrl + 'livro/' + id)
      .map((r: Response) => new Livro(r.json()));
  }

  save(livro: Livro): Observable<Livro> {
    const headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.delete("Content-Type");
    headers.append('X-Requested-With', 'XMLHttpRequest');

    const formData: FormData = new FormData();

    for (let property in livro) {
      if (livro.hasOwnProperty(property)) {
        let value;
        if (livro[property] instanceof Date) {
          value = livro[property].toISOString();
        } else {
          value = livro[property];
        }
        formData.append(property, value);
      }
    }

    const requestOptions = new RequestOptions({
      headers: headers,
      body: formData
    });

    if (livro.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'livro/' + livro.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'livro';
    }

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Livro(r.json()));
  }

  destroy(livro: Livro): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'livro/' + livro.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}
