import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastTypes } from 'src/app/core/enums';
import { IPetDetailsDto } from 'src/app/core/interfaces/IPetDetailsDto';
import { PetDetailsService } from 'src/app/core/services/petDetails.service';
import { PreLoaderService } from 'src/app/core/services/preloader.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() petsChange = new EventEmitter<IPetDetailsDto[]>();

  pets: IPetDetailsDto[] = [];
  initialPets: IPetDetailsDto[] = [];
  isResultEmpty = false;
  petFilterForm: FormGroup = new FormGroup({});

  ageOptions = [
    { label: 'All', value: 'all' },
    { label: 'Baby', value: 'baby' },
    { label: 'Adult', value: 'adult' },
    { label: 'Senior', value: 'senior' }
  ];

  sexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  categoryOption = [
    { label: 'Cat', value: 'cat' },
    { label: 'Dog', value: 'dog' }
  ];

  sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Age', value: 'age' },
    { label: 'Sex', value: 'sex' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: PetDetailsService,
    private readonly messageService: MessageService,
    private readonly preloaderService: PreLoaderService
  ) {}

  ngOnInit(): void {
    this.preloaderService.show();
    this.pets = [...this.initialPets];
    this.petsChange.emit(this.pets);
    this.buildPetSearchForm();
    this.getPetList();
  }

  getPetList() {
    this.service.getAllPetDetailsUser().subscribe({
      next: (response: any) => {
        this.pets = this.initialPets = response.result;  
        this.petsChange.emit(this.pets);
      },
      error: (errorResponse) => {
        const errorObject = errorResponse.error;        
        
        // Iterate through the keys in the error object
        if (errorResponse.status == 400) {          
          for (const key in errorObject) {
            if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
              const errorMessage = errorObject[key];
              this.messageService.add({
                severity: ToastTypes.ERROR,
                summary: errorMessage
              });
            }
          }
        } else {
          this.messageService.add({
            severity: ToastTypes.ERROR,
            summary: 'Server Error'
          });
        }
      }
    });

    this.preloaderService.hide();
  }

  buildPetSearchForm() {
    this.petFilterForm = this.fb.group({
      search: [''],
      age: ['all'],
      sex: [''],
      category: [''],
      sort: ['']
    });

    this.petFilterForm.valueChanges.subscribe(() => {
      this.filterPets();
    });
  }

  cancelSearch(): void {
    this.petFilterForm.get('search')?.setValue(''); // Clear the search input value
  }

  filterPets() {
    let filteredPets = [...this.initialPets];

    const { search, age, sex, category, sort } = this.petFilterForm.value;

    if (search) {
      const searchTerm = search.toLowerCase().trim();
      console.log(searchTerm, this.initialPets);
      
      filteredPets = filteredPets.filter(pet => pet.breed.toLowerCase().includes(searchTerm));
    }

    if (age && age !== 'all') {
      filteredPets = filteredPets.filter(pet => this.petAge(parseInt(pet.age)) === age.toLocaleLowerCase());
    }

    if (sex) {
      filteredPets = filteredPets.filter(pet => pet.sex.toLocaleLowerCase() === sex.toLocaleLowerCase());
    }

    if (category) {
      filteredPets = filteredPets.filter(pet => pet.category === category.toLocaleLowerCase());
    }

    // Implement sorting logic if necessary
    if (sort) {
      // Example sorting logic
      if (sort === 'age') {        
        filteredPets = filteredPets.sort((a, b) => { return a.age.localeCompare(b.age)});
      } else if (sort === 'sex') {
        filteredPets = filteredPets.sort((a, b) => a.sex.localeCompare(b.sex));
      }
    }

    this.pets = filteredPets;
    this.isResultEmpty = this.pets.length <= 0;
    this.petsChange.emit(this.pets);
  }

  petAge(age: number) {
    if (age <= 1) {
      return 'baby'
    } else if (age <= 5) {
      return 'adult'
    }
    
    return 'senior'
  }
}
