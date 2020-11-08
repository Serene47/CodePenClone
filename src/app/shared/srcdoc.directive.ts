
import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector : '[app-srcdoc]'
})
export class SrcdocDirective implements OnChanges{

  @Input("app-srcdoc") source:string;

  constructor(private elementRef:ElementRef,private renderer:Renderer2) {}


  ngOnChanges(changes: SimpleChanges): void {
    this.renderer.setAttribute(this.elementRef.nativeElement,"srcdoc",changes.source.currentValue);
  }

}
