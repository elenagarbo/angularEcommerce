import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from './../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service';

import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

import { ContactoService } from './contacto/contacto.services';
import { RutaService } from './home/ruta.services';
import { AuthService } from './auth-service-guard/auth.service';
import { RutaDetailComponent } from './ruta-detail/ruta-detail.component';
import { AuthGuard } from './auth-service-guard/auth.guard';
import { LoginComponent } from './login/login.component';

 

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
 
   { path: 'rutadetail/:id',
  component: RutaDetailComponent,
  data: { title: 'Detalles' }
  },
  // {
  //   path: 'login',
  //   component: ErrorComponent,
  //   data: { title: 'Error' }
  //   },
    {
      path: 'formulario',
      component: HomeComponent,
      data: { title: 'Home' },
      canActivate: [AuthGuard]
      },

  {
    path: 'home',
    component: BlogComponent,
    data: { title: 'Blog' }
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
    data: { title: 'Servicios' }
  },
  {
    path: 'contactos',
    component: ContactoComponent,
    data: { title: 'Contacto' }
  },
  { path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**',
  component: ErrorComponent,
  data: { title: 'Error' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ServiciosComponent,
    ContactoComponent,
    HomeComponent,
    ErrorComponent,
    RutaDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ),
  
  ],
  providers: [  CookieService, ContactoService , RutaService, AuthService, AuthGuard],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule implements OnInit { 

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  
  constructor(private contactoService: ContactoService, private rutaService: RutaService){
  }

}
