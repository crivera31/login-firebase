import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}
  
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error)
    }
  }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      // console.log(result)
      // this.user = JSON.stringify(result.user);
      // console.log(result.user.email);
      localStorage.setItem('email', result.user.email);
      return result;
    } catch (error) {
      // console.log(JSON.stringify(error));
      if (error.code === 'auth/user-not-found') {
        Swal.fire('Error', 'El correo no esta registrado.', 'error');
      } else if (error.code === 'auth/wrong-password') {
        Swal.fire('Error', 'Su contraseña es incorrecta.', 'error');
      }
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('email');
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string, nick: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // console.log(result.user);
      const { uid } = result.user;
      /**guardar en firestore */
      await this.crearUsuario(uid, email, nick);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  /**guardar en firestore */
  private crearUsuario(uid: string, email: string, nick: string) {
    return this.firestore.collection('usuarios').doc(uid).set({
      uid: uid,
      email: email,
      nick: nick,
      enabled: 1,
    });
  }
}
