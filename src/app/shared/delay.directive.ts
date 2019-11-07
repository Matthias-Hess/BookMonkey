import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[bmDelay]'
})
export class DelayDirective implements OnInit {
  @Input() bmDelay;
  ngOnInit(): void {
    setTimeout(() => {
      this.ViewContainerRef.createEmbeddedView(this.templateRef);
    }, this.bmDelay);
  }
  constructor(private templateRef: TemplateRef<any>, private ViewContainerRef: ViewContainerRef) { }
}
