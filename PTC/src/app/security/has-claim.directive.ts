import { Directive , Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { SecurityService } from './security.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService) { }

    @Input() set hasClaim(claimType: any) {
      if (this.securityService.hasClaim(claimType, null)) {
        // Add Template to the DOM
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // Remove template from the DOM
        this.viewContainer.clear();
      }
    }
}
