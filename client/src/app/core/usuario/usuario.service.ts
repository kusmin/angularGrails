import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Usuario } from './usuario';



@Injectable()
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Usuario[]> {
    let subject = new Subject<Usuario[]>();
    this.http.get(this.baseUrl + 'usuario')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Usuario(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Usuario> {
    return this.http.get(this.baseUrl + 'usuario/' + id)
      .map((r: Response) => new Usuario(r.json()));
  }

  save(usuario: Usuario): Observable<Usuario> {
    const requestOptions = new RequestOptions();
    if (usuario.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'usuario/' + usuario.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'usuario';
    }
    requestOptions.body = JSON.stringify(usuario);
    requestOptions.headers = new Headers({ "Content-Type": "application/json" });

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Usuario(r.json()));
  }

  destroy(usuario: Usuario): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'usuario/' + usuario.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}
