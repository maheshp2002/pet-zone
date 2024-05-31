import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPetDetailsDto } from 'src/app/core/interfaces/IPetDetailsDto';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() pets: IPetDetailsDto[] = [];

  constructor(private readonly router: Router) {}

  onClick(petId: number) {
    this.router.navigate(['user/pet-details', petId])
  }
}
