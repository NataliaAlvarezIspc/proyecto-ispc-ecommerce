import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  itemEnbalde = '../assets/img/3-svg.png'

  constructor(private elementRef: ElementRef) {}


  volverArriba() {
    this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
  }
}
