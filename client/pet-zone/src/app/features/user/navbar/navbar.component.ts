import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { Messages } from 'src/app/core/common/message';
import { Constants } from 'src/app/core/configs/app.config';
import { ToastTypes } from 'src/app/core/enums';
import { IProfileDto } from 'src/app/core/interfaces';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { TokenHelper } from 'src/app/core/utilities/helpers/token.helper';
import { ImageValidator } from 'src/app/core/validators/image.validator';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('imageUpload') imageUpload: any;

  isDialogVisible = false;
  isConfirmShow = false;
  faHome = faHome;
  faLogout = faSignOutAlt
  profileImage = '';
  userId = '';

  allowedFileType: string = this.constants.allowedFileType;
  userProfileForm: FormGroup = new FormGroup({});
  imageSizeInBytes: number = this.constants.imageSizeInBytes;
  allowedImageType: string = this.constants.allowedImageType;

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router,
    private readonly toast: MessageService,
    private readonly tokenHelper: TokenHelper,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly constants: Constants,
    public readonly message: Messages,
    private readonly imageValidator: ImageValidator,
    private readonly preloaderService: PreLoaderService
  ) {

  }

  ngOnInit(): void {
    this.getPath();
    this.getUserProfile();
    this.buildImageForm();
    this.userProfileForm.get('email')?.disable();
  }

  getPath() {
    this.activatedRouter.params.pipe(take(1)).subscribe((params) => {
      console.log(params);

    });
  }

  getUserProfile() {
    this.userId = this.tokenHelper.getDecodedToken().nameidentifier;

    this.authenticationService.getUserProfile(this.userId).subscribe({
      next: (response: any) => {
        this.userProfileForm.patchValue(response.result);
        if (response.result.profileImage != '') {
          this.profileImage = response.result.profileImage;          
        }
      }
    });
  }

  /**
   * Clears the local storage and navigates the user to the home page.
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.toast.add({
      severity: ToastTypes.SUCCESS,
      summary: 'Logged out successfully'
    });
  }

  buildImageForm() {
    this.userProfileForm = this.fb.group({
      id: [this.userId],
      profileImage: ['',
        [
          this.imageValidator.imageSizeValidator(this.constants.imageSizeInBytes),
          this.imageValidator.imageTypeValidator()
        ]
      ],
      name: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      email: [{value: '', disabled: true}],
      phoneNumber: ['',
        [Validators.pattern(this.constants.phoneNumberPattern)]
      ],
      buildingName: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      streetAddress: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      city: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      state: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      country: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      pinCode: ['', [Validators.minLength(6)]],
      isSeller: [false]
    });
  }

  /**
    * Method that used to set a default image when there is an image error.
    */
  handleImageError() {
    this.profileImage = '/assets/images/image-not-available.png';
  }

  /**
   * Handles the selection of an image file and updates the user profile form accordingly.
   * This method is triggered when an image file is selected using an input element.
   *
   * @param params - An object containing the selected image file(s) in the 'files' property.
   * @param params.files - An array of File objects representing the selected image files.
   */
  onImageSelect({ files }: { files: File[] }) {
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    this.profileImage = imageUrl;

    this.userProfileForm.patchValue({ profileImage: file });
    this.userProfileForm.get('profileImage')?.markAsDirty();

    if (this.imageUpload) {
      this.imageUpload.clear();
    }
  }

  onSubmit() {
    this.preloaderService.show();
    const formData = new FormData();
    const temp = this.userProfileForm.value;

    Object.keys(temp).forEach((key) => {      
      formData.append(key, temp[key])
    });    

    
    
    this.authenticationService.updateProfile(formData).subscribe({
      next: () => {
        this.preloaderService.hide();
        this.getUserProfile();
        this.toast.add({
          severity: ToastTypes.SUCCESS,
          summary: 'Profile updated successfully'
        });
      },

      error: () => {
        this.toast.add({
          severity: ToastTypes.ERROR,
          summary: 'An error occurred during image upload'
        });
      }
    })
  }
}
