import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RequesteService } from '../../services/requeste.service';
import { UserService } from '../../services/user.service';

import { RegisterModel } from '../../models/RegisterModel';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  passwordError!: string;
  resp!: string;

  constructor(private formBuilder: FormBuilder, public router: Router,
    public requesteService: RequesteService, public userService: UserService) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        name: ['', [Validators.required]],
        admin: [false]
      }
    )

    if (this.userService.getToken()) this.router.navigate([''])
  }

  submitRegister() {
    const dadosRegister = this.registerForm.getRawValue() as RegisterModel;
    const isPasswordValid = this.userService.validatePassword(dadosRegister.password);

    if (!isPasswordValid) {
      this.passwordError = "A senha deve ter 8 dígitos";
      return;
    }

    this.requesteService.signupUser(dadosRegister).subscribe({
      next: (value) => {
        window.localStorage.setItem('name', value.user.name)
        window.localStorage.setItem('token', value)
        window.localStorage.setItem('admin', String(value.user.admin))

        this.router.navigate([''])
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status)
        if (error.status == 400) {
          this.resp = "Usuário já existe"
        }
      }
    });
  }
}
