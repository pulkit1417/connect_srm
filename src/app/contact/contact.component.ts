import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';
  isLoading = false; // New property for loader

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  animateElements(): void {
    const elements = document.querySelectorAll('.animate-item');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }

  ngOnInit(): void {
    emailjs.init("G3vZQsFGEWTN344ei");
    this.animateElements();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true; // Start loading
      const params = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        message: this.contactForm.get('message')?.value,
      };

      const serviceID = "service_4po8z8e";
      const templateID = "template_lkf3fsg";

      emailjs.send(serviceID, templateID, params)
        .then((res) => {
          this.showNotification = true;
          this.notificationMessage = "Your message sent successfully!!";
          this.notificationType = 'success';
          this.contactForm.reset();
          setTimeout(() => this.showNotification = false, 5000);
        })
        .catch((err) => {
          console.error('Error sending email:', err);
          this.showNotification = true;
          this.notificationType = 'error';
          if (err.status === 412) {
            this.notificationMessage = "There was an issue with the email service. Please try again later or contact support.";
          } else {
            this.notificationMessage = "An error occurred while sending your message. Please try again.";
          }
          setTimeout(() => this.showNotification = false, 5000);
        })
        .finally(() => {
          this.isLoading = false; // Stop loading
        });
    }
  }
}