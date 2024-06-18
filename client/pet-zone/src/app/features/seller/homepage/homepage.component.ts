import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/core/configs/app.config';
import { Table } from 'primeng/table';
import { IMasterDto, IDropdown, IPetDetailsDto } from 'src/app/core/interfaces/IPetDetailsDto';
import { PetDetailsService } from 'src/app/core/services/petDetails.service';
import { MessageService } from 'primeng/api';
import { ToastTypes } from 'src/app/core/enums';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/core/common/message';
import { ImageValidator } from 'src/app/core/validators/image.validator';
import { TokenHelper } from 'src/app/core/utilities/helpers/token.helper';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('petDetailsTable') resultTable!: Table;
  @ViewChild('ImagesUpload') ImagesUpload: any;

  isVisible = false;
  imageList: File[] = [];
  isEdit = false;
  imageSizeInBytes: number = this.constants.imageSizeInBytes;
  allowedImageType: string = this.constants.allowedImageType;
  petDetailsForm: FormGroup = new FormGroup({});
  masterData: IMasterDto = {
    breeds: [],
    categories: []
  }
  results: IPetDetailsDto[] = [];
  rows = this.constants.row;
  sex: IDropdown[] = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  status: IDropdown[] = [
    { label: 'Available', value: true },
    { label: 'Not Available', value: false }
  ];

  constructor(
    private readonly constants: Constants,
    private readonly fb: FormBuilder,
    private readonly service: PetDetailsService,
    private readonly toast: MessageService,
    private readonly preloader: PreLoaderService,
    public readonly message: Messages,
    private readonly imageValidator: ImageValidator,
    private readonly tokenHelper: TokenHelper
  ) { }

  ngOnInit(): void {
    this.buildPetDetailsForm();
    this.getMaster();
    this.getPets();
  }

  getPets() {
    var userId = this.tokenHelper.getDecodedToken().nameidentifier;

    this.petDetailsForm.patchValue({sellerId: userId});

    this.service.getAllPetDetailsSeller(userId).subscribe({
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

  getMaster() {
    this.service.getMaster().subscribe({
      next: (response: any) => {
        this.preloader.hide();
        this.masterData = response.result;
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

  buildPetDetailsForm() {
    this.petDetailsForm = this.fb.group({
      id: [0],
      breed: [0,
        [Validators.required]
      ],
      category: [0, [Validators.required]],
      age: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      color: ['', [Validators.required]],
      availability: [0, [Validators.required]],
      price: ['', [Validators.required]],
      description: ['',
        [Validators.required, Validators.maxLength(500)]
      ],
      images: [[],        [
        this.imageValidator.imageSizeValidator(this.constants.imageSizeInBytes),
        this.imageValidator.imageTypeValidator()
      ]],
      status: [true],
      sellerId: ['']
    });
  }

  openDialog(isEdit: boolean) {
    this.isVisible = true
    this.isEdit = isEdit;
    if (!isEdit) {
      this.petDetailsForm.reset({
        id: 0,
        breed: 0,
        category: 0,
        age: '',
        sex: '',
        color: '',
        availability: 0,
        price: '',
        description: '',
        images: [],
        status: true,
        sellerId: this.tokenHelper.getDecodedToken().nameidentifier
      });
      this.imageList = [];
    }
  }

  openEditDialog(result: IPetDetailsDto) {
    this.openDialog(true);
    const breedId = this.masterData.breeds.find(b => b.name === result.breed)?.id || 0;
    const categoryId = this.masterData.categories.find(c => c.name === result.category)?.id || 0;
    const updatedResult = { ...result, breed: breedId, category: categoryId, id: result.petId };
    this.petDetailsForm.patchValue(updatedResult);
  }

  updateStatus() {
    this.preloader.show();
    
    const formData = new FormData();
    const temp = this.petDetailsForm.value;

    Object.keys(temp).forEach((key) => {      
      formData.append(key, temp[key]);
    });    

    this.service.updatedPetDetails(formData).subscribe({
      next: () => {
        this.getPets();
        this.toast.add({
          severity: ToastTypes.SUCCESS,
          summary: 'Pet Details Updated Successfully'
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

  onImageSelect(event: { files: File[] }) {
    const selectedFilesArray = Array.from(event.files); // Convert FileList to Array
    const currentImages = this.petDetailsForm.get('images')?.value || [];
  
    if (currentImages.length + selectedFilesArray.length > 4) {
      const extraFiles = currentImages.length + selectedFilesArray.length - 4;
      selectedFilesArray.splice(-extraFiles); // Remove extra files from array
  
      this.toast.add({
        severity: ToastTypes.ERROR,
        summary: 'You can only upload a maximum of 4 images.'
      });
    }

    if (currentImages.length + selectedFilesArray.length >= 4) {
      this.petDetailsForm.get('images')?.markAsDirty();
    }
  
    const updatedImages = [...currentImages, ...selectedFilesArray];
    this.petDetailsForm.patchValue({ images: updatedImages });
  
    // Update the file upload component's file list
    this.ImagesUpload.files = updatedImages;
    // console.log(this.petDetailsForm.get('images')?.value); 
  }

  trackByJobId(index: number, pet: IPetDetailsDto) {
    return pet.petId;
  }

  onSubmit() {
    this.preloader.show();    
    const formData = new FormData();
    const temp = this.petDetailsForm.value;

    Object.keys(temp).forEach((key) => {      
      if (key === 'images') {
        temp[key].forEach((file: File) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, temp[key]);
      }
      
    });    
  
    this.service.addPetDetails(formData).subscribe({
      next: () => {
        this.toast.add({
          severity: ToastTypes.SUCCESS,
          summary: 'Pet details added successfully'
        });
        this.getPets();
      },
      error: () => {
        this.toast.add({
          severity: ToastTypes.ERROR,
          summary: 'An error occurred while adding'
        });
      }
    });
    this.preloader.hide();
    this.petDetailsForm.patchValue({});
    window.location.reload()
  }  

  onUpdate() {
    this.isVisible = false;
    this.service.updatedPetDetails(this.petDetailsForm.value).subscribe({
      next: () => {
        this.toast.add({
          severity: ToastTypes.SUCCESS,
          summary: 'Pet details updated successfully'
        });
        this.getPets();
      },

      error: () => {
        this.toast.add({
          severity: ToastTypes.ERROR,
          summary: 'An error occurred while adding'
        });
      }
    })
  }
}
