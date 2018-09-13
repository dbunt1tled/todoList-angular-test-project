import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomColor], appCustomColor'
})
export class CustomColorDirective implements OnInit {
  @Input() message;
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}
  ngOnInit() {
    if (this.message) {
      this.element.nativeElement.textContent = this.message;
    }
  }
  @Input('appCustomColor') set NewColor(color) {
    if (color.length) {
      this.renderer.setStyle(this.element.nativeElement, 'color', color);
    }else {
      this.renderer.setStyle(this.element.nativeElement, 'color', 'red');
    }

  }
}
