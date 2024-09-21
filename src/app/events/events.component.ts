import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  email: string = '';
  showNotification: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // The notification will not show up on page load
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.showNotification = true;
      this.email = '';
      form.resetForm();
      
      // Add class to trigger slide-down animation
      setTimeout(() => {
        const notification = this.el.nativeElement.querySelector('.notification');
        this.renderer.addClass(notification, 'show');
      }, 10);

      setTimeout(() => this.hideNotification(), 5000);
    }
  }

  hideNotification(): void {
    const notification = this.el.nativeElement.querySelector('.notification');
    this.renderer.removeClass(notification, 'show');
    
    // Wait for the slide-up animation to complete before hiding
    setTimeout(() => {
      this.showNotification = false;
    }, 300);
  }
}