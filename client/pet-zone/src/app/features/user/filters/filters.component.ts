import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constants } from 'src/app/core/configs/app.config';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { TokenHelper } from 'src/app/core/utilities/helpers/token.helper';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  pets = [];
  initialPets = [];
  isResultEmpty = false;
  petFilterForm: FormGroup = new FormGroup({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly constants: Constants,
    private readonly router: Router,
    private readonly tokenHelper: TokenHelper,
    private readonly preloader: PreLoaderService,
    private readonly messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildJobSearchForm();
  }

  buildJobSearchForm() {
    this.petFilterForm = this.fb.group({
      search: [''],
    });

    this.petFilterForm.get('search')?.valueChanges.subscribe((value: any) => {
      this.searchPets(value);
    });
  }

  cancelSearch(): void {
    this.petFilterForm.get('search')?.setValue(''); // Clear the search input value
    this.searchPets(''); // Trigger filtering with an empty search term
  }

  searchPets(value: string) {
    if (!value) {
      this.pets = [...this.initialPets];
      this.isResultEmpty = false;
      return;
    }

    const searchTerm = value.toLowerCase().trim();
    // this.pets = this.initialPets.filter(
    //   pets => pets.title.toLowerCase().includes(searchTerm)
    // );

    this.isResultEmpty = this.pets.length <= 0 ? true : false;
  }

  ageOptions = [
    { label: 'All', value: 'all' },
    { label: 'Puppy', value: 'puppy' },
    { label: 'Adult', value: 'adult' },
    { label: 'Senior', value: 'senior' }
  ];

  sexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  sizeOptions = [
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Bird', value: 'bird' }
  ];

  sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Age', value: 'age' },
    { label: 'Size', value: 'size' }
  ];

  selectedAge: any;
  selectedSex: any;
  selectedSize: any;
  selectedSort: any;
}
