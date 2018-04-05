import { Component, OnInit, Input } from '@angular/core';
import { RutaService } from '../home/ruta.services';
import { Ruta } from '../home/Ruta.model';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ruta-detail',
  templateUrl: './ruta-detail.component.html',
  styleUrls: ['./ruta-detail.component.css']
})
export class RutaDetailComponent implements OnInit {
  
  rutaObservable:Observable<any[]>;
  _id: number;

  constructor(private CookieService: CookieService, private db: AngularFireDatabase,private route: ActivatedRoute,private rutaService: RutaService,private location: Location) { }

  ngOnInit() {
    this._id =this.route.snapshot.params['id'];
    this.rutaObservable= this.getRutaId('/rutas');

    // this.cookieService.set( 'Test', 'Hello World' );
    // this.cookieValue = this.cookieService.get('Test');
  }
  
getRutaId(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

}
