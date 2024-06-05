import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ImageValidator {
    /**
     * A validator function that checks whether the image size is greater than the mentioned imageSizeInBytes.
     *
     * @param imageSizeInBytes The maximum image size.
     */
    imageSizeValidator(imageSizeInBytes: number): ValidatorFn {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            const controlValue = control.value;
            return controlValue?.size > imageSizeInBytes ? { invalidImageSize: true } : null;
        }
    }

    /**
     * A validator function that checks whether the image type is equal the mentioned fileTypeImage.
     *
     * @param fileTypeImage The type of image.
     */
    imageTypeValidator(): ValidatorFn {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            const controlValue = control.value;
            return (!controlValue?.type?.startsWith('image/') || controlValue.type === 'image/gif') && controlValue?.type !== undefined ? { invalidImageType: true } : null;
        }
    }

    imageListSizeValidator(maxSizeInBytes: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const files: File[] = control.value;
          if (files && files.length) {
            const invalidFiles = files.filter(file => file.size > maxSizeInBytes);
            return invalidFiles.length ? { invalidImageSize: true } : null;
          }
          return null;
        };
      }
    
      imageListTypeValidator(allowedTypes: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const files: File[] = control.value;
          if (files && files.length) {
            const invalidFiles = files.filter(file => allowedTypes !== file.type);
            return invalidFiles.length ? { invalidImageType: true } : null;
          }
          return null;
        };
      }
}
