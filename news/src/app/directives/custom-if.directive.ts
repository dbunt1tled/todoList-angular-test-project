import { Directive, ElementRef, Renderer2, Input, OnInit, HostListener, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf], appCustomIf'
})
export class CustomIfDirective implements OnInit  {

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}
  @Input ('appCustomIf') set myValue(condition) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
  ngOnInit() {

  }
}
