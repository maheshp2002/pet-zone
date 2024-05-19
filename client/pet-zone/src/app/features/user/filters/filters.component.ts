import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
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
