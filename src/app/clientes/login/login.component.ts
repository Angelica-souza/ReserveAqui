import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginModel } from '../models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router){  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      } 
    )
  }

  submitLogin(){
    debugger

    let DadosLogin = this.loginForm.getRawValue() as LoginModel;
    console.log(DadosLogin);
    

  }
}
