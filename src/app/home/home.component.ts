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
  showNotification: boolean = false;
  notificationMessage: string = '';

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
      const email = this.subscribeForm.value.email;
      console.log('Form submitted with email:', email);
      this.notificationMessage = `Successfully subscribed: ${email}`;
      this.showNotification = true;
      this.subscribeForm.reset();
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}