import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {

  constructor() { }
  @HostBinding('class.small') isZoomed: boolean;
  @HostListener('mouseenter') onMouseEnter() {
    this.isZoomed = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.isZoomed = false;
  }



}
