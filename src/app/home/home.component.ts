import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subscribeForm: FormGroup;
  showPopup: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.animateElements();
  }

  animateElements(): void {
    const elements = document.querySelectorAll('.animate-item');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }

  onSubmit(): void {
    if (this.subscribeForm.valid) {
      console.log('Form submitted with email:', this.subscribeForm.value.email);
      this.showPopup = true;
      this.subscribeForm.reset();
      setTimeout(() => {
        this.closePopup();
      }, 3000);
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }
}