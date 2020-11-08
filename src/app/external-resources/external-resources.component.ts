import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CodeEditorService } from '../shared/code-editor.service';

@Component({
  selector: 'app-external-resources',
  templateUrl: './external-resources.component.html',
  styleUrls: ['./external-resources.component.css']
})
export class ExternalResourcesComponent implements OnInit {

  externalCSS:string[] = [];
  externalJS:string[] = [];

  externalLinksForm:FormGroup;

  externalCSSFormArray:FormArray;
  externalJSFormArray:FormArray;

  urlRegex:RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  @HostBinding("class.hide") hideComponent = true;

  constructor(private codeEditorService:CodeEditorService) { }

  ngOnInit(): void {

    this.externalCSSFormArray = new FormArray([]);
    this.externalJSFormArray = new FormArray([]);

    this.externalLinksForm = new FormGroup({
      "cssUrls" : this.externalCSSFormArray,
      "jsUrls" : this.externalJSFormArray
    });

  }

  openDialog(){

	this.externalCSSFormArray.clear();

    this.externalJSFormArray.clear();

    if(this.codeEditorService.content.externalCSS.length > 0){

      this.codeEditorService.content.externalCSS.forEach((cssUrl:string) => {

        this.externalCSSFormArray.push(new FormControl(cssUrl,Validators.pattern(this.urlRegex)))

      })

    } else {
      this.addNewUrl("css");
    }

    if(this.codeEditorService.content.externalJS.length > 0){

      this.codeEditorService.content.externalJS.forEach((jsUrl:string) => {

        this.externalJSFormArray.push(new FormControl(jsUrl,Validators.pattern(this.urlRegex)))

      })

    } else {
      this.addNewUrl("js");
    }
	
	this.hideComponent = false;

  }


  addNewUrl(type:string) {

    if(type == "css")
      this.externalCSSFormArray.push(new FormControl(null,Validators.pattern(this.urlRegex)))
    else
      this.externalJSFormArray.push(new FormControl(null,Validators.pattern(this.urlRegex)))

  }

  removeUrl(index:number, type:string){

    if(type == "css")
      this.externalCSSFormArray.removeAt(index);
    else
      this.externalJSFormArray.removeAt(index);

  }

  save() {

    let cssUrls = [], jsUrls = [];

    this.externalCSSFormArray.controls.forEach((formControl:FormControl) => {

      if(formControl.valid && formControl.value != null){
        cssUrls.push(formControl.value);
      }

    });

    this.externalJSFormArray.controls.forEach((formControl:FormControl) => {

      if(formControl.valid && formControl.value != null ){
        jsUrls.push(formControl.value);
      }

    });

    this.codeEditorService.addExternalResources(cssUrls,jsUrls);

    this.hideComponent = true;
  }

  closeDialog() {

    this.hideComponent = true;

  }

}
