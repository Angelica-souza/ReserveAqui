import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { LoginModel } from '../../models/LoginModel';
import { RequesteService } from '../../services/requeste.service';

import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

type LoginResponse = {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  isPasswordValid!: boolean;
  passwordError!: string;
  message!: string;

  constructor(private formBuilder: FormBuilder, private router: Router,
     public RequesteService: RequesteService, public userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    ) 

    if(this.userService.getToken()) this.router.navigate([''])
  }


  submitLogin() {
    let DadosLogin = this.loginForm.getRawValue() as LoginModel;
    const isPasswordValid = this.userService.validatePassword(DadosLogin.password);

    if (!isPasswordValid) {
      this.passwordError = "A senha deve ter 8 dígitos";
      return;
    }
   
      this.RequesteService.signinUser(DadosLogin).subscribe({
        next: (value: LoginResponse) => {
          window.localStorage.setItem('token', value.accessToken)
          window.localStorage.setItem('name', value.user.name)

          this.router.navigate([''])
        },

        error(err) {
          console.error("errors");
        },
      })
  }
}
