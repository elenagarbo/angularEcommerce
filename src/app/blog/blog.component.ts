import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { RutaService } from '../home/ruta.services';
import { Ruta } from '../home/Ruta.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  blogObservable: Observable<any[]>;
  rutas: Ruta[];


  constructor( private db: AngularFireDatabase, private rutaService: RutaService) { }

  ngOnInit() {
  this.blogObservable = this.getBlog('/blogs');
}
  
  getBlog(listPath): Observable<any[]> {
  return this.db.list(listPath).valueChanges();
}
getRutas(): void {
  this.rutaService.getRutas()
  .subscribe(rutas => this.rutas = rutas);
}

}