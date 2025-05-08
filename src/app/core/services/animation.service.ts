import { ElementRef, Injectable, QueryList } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  slideIn(element: ElementRef): void {
    gsap.from(element.nativeElement, {
      opacity: 0,
      y: -70,
      scale: 0.9,
      duration: 1.2,
      ease: 'power3.out'
    })
  }

  slideInStagger(elements: QueryList<ElementRef>): void {
    gsap.from(elements.map((el => el.nativeElement)), {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2
    })
  }




}
