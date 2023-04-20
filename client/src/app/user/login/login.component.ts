import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginModel } from '../../models/LoginModel';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

type LoginResponse = {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
    admin: boolean;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  passwordError!: string;
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public RequestService: RequestService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )

    if (this.userService.getToken()) this.router.navigate([''])
  }


  submitLogin() {
    let DadosLogin = this.loginForm.getRawValue() as LoginModel;
    const isPasswordValid = this.userService.validatePassword(DadosLogin.password);

    if (!isPasswordValid) {
      this.passwordError = "A senha deve ter 8 dígitos";
      return;
    }

    this.RequestService.signinUser(DadosLogin).subscribe({
      next: (value: LoginResponse) => {
        window.localStorage.setItem('token', value.accessToken)
        window.localStorage.setItem('name', value.user.name)
        window.localStorage.setItem('admin', String(value.user.admin))

        this.router.navigate([''])
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.message = "O usuário não existe"
        }
      }
    })
  }
}
