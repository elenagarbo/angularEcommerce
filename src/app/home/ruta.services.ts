import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Ruta } from './Ruta.model';
import { QueryFn } from 'angularfire2/database/interfaces';
import { HttpHeaders,  HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class RutaService { 
 
  private dbPath = '/rutas';
  
 
  blogsRef: AngularFireList<Ruta> = null;
 
  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    this.blogsRef = db.list(this.dbPath);
  }
 
  crearRuta(blogs: Ruta): void {
    this.blogsRef.push(blogs);
  }
 
  
  /** GET heroes from the server */
  getRutas (): Observable<Ruta[]> {
    console.log("se mete en el get");
    return this.http.get<Ruta[]>(this.dbPath)
      .pipe(
     
        catchError(this.handleError('getRutas', []))
      );
  }
  
  /** GET hero by id. Return `undefined` when id not found */
  getRutaNo404<Data>(id: number): Observable<Ruta> {
    console.log("se mete en get de error");
    const url = '${this.dbPath}/?id=${id}';
    return this.http.get<Ruta[]>(url)
      .pipe(
        map(rutas => rutas[0]), // returns a {0|1} element array
       
        catchError(this.handleError<Ruta>('getRuta id=${id}'))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getRuta(id: number): Observable<Ruta> {
    const url = '${this.dbPath}/${id}';
    return this.http.get<Ruta>(url).pipe(
      
      catchError(this.handleError<Ruta>('getRuta id=${id}'))
    );
  }



  /** PUT: update the hero on the server */
  updateRuta (ruta: Ruta): Observable<any> {
    return this.http.put(this.dbPath, ruta, httpOptions).pipe(
     
      catchError(this.handleError<any>('updateRuta'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}