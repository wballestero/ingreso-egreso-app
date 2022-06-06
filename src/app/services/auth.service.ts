import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore ) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>
      {
        console.log(fuser);
        console.log(fuser?.uid);
        console.log(fuser?.email);
      }
      )
  }

  crearUsuario(nombre:string, email:string, password:string){
  //console.log({nombre, email,password});

 return this.auth.createUserWithEmailAndPassword(email,password).
 then(({ user }) =>{
   const newUser = new Usuario(user!.uid, nombre,email);

  return this.firestore.doc(`${ user!.uid }/usuario` ).set( {...newUser} )
 })

  }

  loginUsuario(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout() {
  return this.auth.signOut();    
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    );
  }
  
}
