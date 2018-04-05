import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Ruta } from './Ruta.model';
import { RutaService } from './ruta.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ruta: Ruta = new Ruta();
  submitted2 = false;
  constructor(private rutaService: RutaService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  nuevaRuta(): void {
    this.submitted2 = false;
    this.ruta = new Ruta();
  }
 
  saveRuta() {
    this.rutaService.crearRuta(this.ruta);
    this.ruta = new Ruta();
  }
  onSubmit2() {
    this.submitted2 = true;
    this.saveRuta();
  }

}
