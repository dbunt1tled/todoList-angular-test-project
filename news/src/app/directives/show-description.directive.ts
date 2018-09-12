import { Directive, ElementRef, Renderer2, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowDescription], appCustomColor'
})
export class ShowDescriptionDirective implements OnInit  {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}
  ngOnInit() {

  }
  @HostListener('click', ['$event']) onMyClick(e: MouseEvent) {
    console.log(e);
    const description = this.renderer.nextSibling(this.element.nativeElement);
    // this.renderer.listen(description, 'click', function (e) {
    //   console.log('click');
    // });

    // const descr = this.element.nativeElement.nextElementSibling; // Тоже самое
    const state = description.hidden;
    this.renderer.setProperty(description, 'hidden', !state);
  }
  @HostListener('mouseover') onMyMouseOver() {
    this.changeCursor('pointer');
  }
  changeCursor(type) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', type);
  }
}
