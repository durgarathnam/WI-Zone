import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router) {

  }
  ngOnInit(): void {
  }
  register(form: NgForm): void {
    if (form.valid) {
      this.authService.register(form.value).subscribe({
        next: (registeredUser) => {
          this.successMessage = 'Registration successful!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error', err);
        }
      });
    }
  }



}
