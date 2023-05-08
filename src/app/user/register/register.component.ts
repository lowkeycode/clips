import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  showAlert = false;
  alertMessage = 'Please wait! Your account is being created.';
  alertColor = 'blue';
  isSubmitting = false;

  name = new FormControl('', [Validators.minLength(2), Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  tel = new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    tel: this.tel,
  });

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.isSubmitting = true;


    try {
      await this.authService.createUser(this.registerForm.value as User);
    } catch (err) {
      console.log(err);
      this.alertMessage =
        'An unexpected error occurred while registering your user. Please try again later.';
      this.alertColor = 'red';
      this.isSubmitting = false;
      return;
    }

    this.alertMessage = 'Success! Your account has been created';
    this.alertColor = 'green';
  }
}
