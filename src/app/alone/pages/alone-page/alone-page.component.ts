import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  //que diga standalone es que sea independiente
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {
  //el objetivo esque puedan sobrevivir solitos

}
