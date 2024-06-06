import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/core/configs/app.config';
import { Table } from 'primeng/table';
import { IMasterDto, IPetDetailsDto } from 'src/app/core/interfaces/IPetDetailsDto';
import { PetDetailsService } from 'src/app/core/services/petDetails.service';
import { MessageService } from 'primeng/api';
import { ToastTypes } from 'src/app/core/enums';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Messages } from 'src/app/core/common/message';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('breedTable') breedTable!: Table;
  @ViewChild('categoryTable') categoryTable!: Table;

  isVisible = false;
  isBreed = false;
  masterForm: FormGroup = new FormGroup({});
  results: IMasterDto = {
    breeds: [],
    categories: []
  }
  rows = this.constants.row;

  constructor(
    private readonly constants: Constants,
    private readonly fb: FormBuilder,
    private readonly service: PetDetailsService,
    private readonly toast: MessageService,
    private readonly preloader: PreLoaderService,
    public readonly message: Messages
  ) { }

  ngOnInit(): void {
    this.buildMasterForm();
    this.getMaster();
  }

  getMaster() {
    this.service.getMaster().subscribe({
      next: (response: any) => {
        this.preloader.hide();
        this.results = response.result;
      },
      error: (errorResponse) => {
        const errorObject = errorResponse.error;

        // Iterate through the keys in the error object
        if (errorResponse.status == 400) {
          for (const key in errorObject) {
            if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
              const errorMessage = errorObject[key];
              this.toast.add({
                severity: ToastTypes.ERROR,
                summary: errorMessage
              });
            }
          }
        } else {
          this.toast.add({
            severity: ToastTypes.ERROR,
            summary: 'Server Error'
          });
        }
      }
    });
  }

  buildMasterForm() {
    this.masterForm = this.fb.group({
      name: [''],
    });
  }

  addBreed() {
    this.preloader.show();  

    this.service.addBreed(this.masterForm.value).subscribe({
      next: () => {
        this.getMaster();
        this.toast.add({
          severity: ToastTypes.SUCCESS,
          summary: 'Pet Breed Updated Successfully'
        });
      },
      
      error: () => {
        this.toast.add({
          severity: ToastTypes.ERROR,
          summary: 'An error occurred while adding'
        });
      }
    });
    this.isVisible = false;
    this.preloader.hide();
  }

  addCategory() {
    this.preloader.show();  

    this.service.addCategory(this.masterForm.value).subscribe({
      next: () => {
        this.getMaster();
        this.toast.add({
          severity: ToastTypes.SUCCESS,
          summary: 'Pet Category Updated Successfully'
        });
        this.masterForm.patchValue({name: ''})
      },
      
      error: () => {
        this.toast.add({
          severity: ToastTypes.ERROR,
          summary: 'An error occurred while adding'
        });
      }
    });
    this.isVisible = false;
    this.preloader.hide();
  }

  trackByJobId(index: number, pet: IPetDetailsDto) {
    return pet.petId;
  }

  openDialog() {
    this.isVisible = true;
  }
}
