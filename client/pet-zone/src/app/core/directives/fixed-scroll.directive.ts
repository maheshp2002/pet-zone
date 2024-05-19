import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFixedScroll]'
})
export class FixedScrollDirective {
  private originalOffsetTop!: number;

  constructor(private el: ElementRef) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.originalOffsetTop) {
      const navbar = document.querySelector('.navbar');
      this.originalOffsetTop = this.el.nativeElement.getBoundingClientRect().top + window.pageYOffset - (navbar ? navbar.clientHeight : 0);
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollTop > this.originalOffsetTop) {
      this.el.nativeElement.classList.add('fixed');
    } else {
      this.el.nativeElement.classList.remove('fixed');
    }
  }
}
