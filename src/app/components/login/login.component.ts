import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required)
  });

  loginMsg = '';

  constructor(public auth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch((reason) => this.loginMsg = reason.message);
  }

  loginWithEmailAndPassword() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.signInWithEmailAndPassword(email, password).catch(reason => this.loginMsg = reason.message);
  }

  logout() {
    this.auth.signOut();
  }
}
