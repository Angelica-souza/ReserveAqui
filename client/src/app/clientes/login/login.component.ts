import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginModel } from '../models/LoginModel';
import { RequesteService } from '../services/requeste.service';

import { ActivatedRoute } from '@angular/router';

import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  // validate!: boolean
  isPasswordValid!: boolean;
  passwordError!: string;
  message!: string;

  constructor(private formBuilder: FormBuilder, private router: Router,
     public RequesteService: RequesteService, public ValidateService: ValidateService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    ) 

      // this.message = this.activatedRoute.snapshot.queryParams ;
      // console.log(this.activatedRoute.snapshot.queryParams)
  }


  submitLogin() {
    let DadosLogin = this.loginForm.getRawValue() as LoginModel;
    const isPasswordValid = this.ValidateService.validatePassword(DadosLogin.password);

    if (!isPasswordValid) {
      this.passwordError = "A senha deve ter 8 dígitos";
      return;
    }
   
      this.RequesteService.signinUser(DadosLogin).subscribe({
        next(value) {

        },

        error(err) {
          console.log("errors");
        },
      })
  }
}
