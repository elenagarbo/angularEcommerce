import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Ruta } from '../home/Ruta.model';
import { RutaService } from '../home/ruta.services';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})

export class ServiciosComponent implements OnInit {
 //conseguir mostrar database rutas de firebase
  blogObservable: Observable<any[]>;
  rutas: Ruta[];

  countries:any;
  
  constructor(private http:HttpClient,  private db: AngularFireDatabase, private rutaService: RutaService) {
  }
//conseguir mostrar database rutas de firebase
  ngOnInit() {
    // this.getCountries();
    this.blogObservable = this.getBlog('/rutas')
  }

  getBlog(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
  getRutas(): void {
    this.rutaService.getRutas()
    .subscribe(rutas => this.rutas = rutas);
  }

//hasta aqui. Esto de countries no hace falta
  // getCountries() {
  //   this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
  //     // the first argument is a function which runs on success
  //     data => { this.countries = data},
  //     // the second argument is a function which runs on error
  //     err => console.error(err),
  //     // the third argument is a function which runs on completion
  //     () => console.log('done loading countries')
  //   );
  // }
}
