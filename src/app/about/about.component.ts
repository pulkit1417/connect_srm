import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ContactComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
