import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Constants } from 'src/app/core/configs/app.config';
import { ToastTypes } from 'src/app/core/enums';
import { IAddChatDto } from 'src/app/core/interfaces';
import { IPetDetailsDto } from 'src/app/core/interfaces/IPetDetailsDto';
import { ChatService } from 'src/app/core/services/chat.service';
import { PetDetailsService } from 'src/app/core/services/petDetails.service';
import { PreLoaderService } from 'src/app/core/services/preloader.service';
import { TokenHelper } from 'src/app/core/utilities/helpers/token.helper';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  contentHeight: number = 0;
  windowHeight: number = 0;
  petDetails: IPetDetailsDto = {
    petId: 0,
    age: '',
    breed: '',
    sex: '',
    color: '',
    availability: 0,
    sellerId: '',
    sellerName: '',
    sellerAddress: '',
    price: 0,
    description: '',
    images: [],
    category: '',
    status: false
  };

  constructor(
    private elementRef: ElementRef,
    private readonly tokenHelper: TokenHelper,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly constants: Constants,
    private readonly service: PetDetailsService,
    private readonly chatService: ChatService,
    private readonly preloader: PreLoaderService,
    private readonly messageService: MessageService
    ) { }

  ngOnInit() {
    window.scrollTo(0, 0); 
    this.contentHeight = (document.querySelector('.content') as HTMLElement)?.offsetHeight || 0;
    this.windowHeight = window.innerHeight;
    this.getId();
  }
  
  getId() {
    this.activatedRoute.params.subscribe(params => {
      this.petDetails.petId = Number.parseFloat(params['id']);
    });
        
    this.getPetDetails();
  }

  getPetDetails() {
    this.service.getPetDetailsById(this.petDetails.petId).subscribe({
      next: (response: any) => {
        this.preloader.hide();
        this.petDetails = response.result;       
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
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.pageYOffset;
    const blurValue = Math.min(scrolled / 50, 5); // Adjust the divisor to control blur intensity
    const image = document.querySelector('.pet-background-image') as HTMLElement;
    const details = document.querySelector('.pet-details-container') as HTMLElement;
    const scrollDown = document.querySelector('.scroll-down') as HTMLElement;

    if (image) {
      image.style.filter = `blur(${blurValue}px)`;
    }

    if (details) {
      const opacityValue = Math.max(1 - scrolled / 200, 0); // Adjust the divisor to control opacity transition speed
      details.style.opacity = `${opacityValue}`;
      details.style.visibility = opacityValue === 0 ? 'hidden' : 'visible';
    }

    if (scrollDown) {
      const opacityValue = Math.max(1 - scrolled / 200, 0); // Adjust the divisor to control opacity transition speed
      scrollDown.style.opacity = `${opacityValue}`;
      scrollDown.style.visibility = opacityValue === 0 ? 'hidden' : 'visible';
    }

    // Limit scrolling up behavior
    if (scrolled < this.contentHeight - this.windowHeight) {
      window.scrollTo(0, this.contentHeight - this.windowHeight);
    }

    // Prevent scrolling up beyond the stopScrollThreshold
    if (this.windowHeight - this.contentHeight <= scrolled) {
      window.scrollTo(0, this.constants.stopScrollThreshold);
    }
  }

  onContactClick() {
    const model: IAddChatDto = {
      sellerId: this.petDetails.sellerId,
      petDetailsId: this.petDetails.petId,
      isBlockedOrRemoved: false
    }
    this.chatService.createChat(model).subscribe({
      next: (response: any) => {
        this.preloader.hide();
        this.petDetails = response.result;       
        this.router.navigate(['chats'])
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
  }

  scrollToContent() {
    const content = this.elementRef.nativeElement.querySelector('.content');
    content.scrollIntoView({ behavior: 'smooth' });
  }
}