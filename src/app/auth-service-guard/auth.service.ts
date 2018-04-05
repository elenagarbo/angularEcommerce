import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from 'firebase/app';


@Injectable()
export class AuthService {
user: User;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router) {
   
    }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(userData =>  resolve(userData),
    value => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/formulario');
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  });
}
  
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
     console.log('Sucess', value),
     this.router.navigateByUrl('/formulario');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
     console.log('Sucess', value),
     this.router.navigateByUrl('/formulario');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
  
 
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
