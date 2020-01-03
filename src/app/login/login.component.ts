import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private sweetAlertService: SweetAlertService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    const body = this.loginForm.getRawValue();
    if (!body['username'] || !body['password']) {
      this.sweetAlertService.warn('Invalid operation', 'Please fill in all required fields');
    } else {
      this.authService.login(body)
          .subscribe(
            res => {
              const token = res['token'];
              localStorage.setItem('token', token);
              localStorage.setItem('username', body['username']);
              this.router.navigate(['']);
            },
            err => {
              this.sweetAlertService.error(null, err.error.msg);
            }
          );
    }
  }
}
