import { Component } from '@angular/core';
import { IPetDetailsDto } from 'src/app/core/interfaces/IPetDetailsDto';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  pets: IPetDetailsDto[] = [];

  handlePetsChange(updatedPets: IPetDetailsDto[]) {
    this.pets = updatedPets;
  }
}
