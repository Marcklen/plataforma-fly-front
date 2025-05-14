import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;
  sucesso = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admin: [false] // Setando inicialmente como false, mas no back vou criar 2 usuarios ao subir a aplicação sendo 1 admin e outro user normal
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.http.post('http://localhost:8080/usuario', this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.sucesso = true;
        });
    }
  }

}
