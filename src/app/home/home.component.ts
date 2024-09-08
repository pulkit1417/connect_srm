import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  subscribeForm: FormGroup;
  showPopup: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.subscribeForm.valid) {
      console.log('Form submitted with email:', this.subscribeForm.value.email);

      // Show the popup
      this.showPopup = true;

      // Reset the form
      this.subscribeForm.reset();

      // Automatically close the popup after 3 seconds
      setTimeout(() => {
        this.closePopup();
      }, 3000);
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
