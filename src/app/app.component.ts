import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { CodeEditorService } from "./shared/code-editor.service";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ExternalResourcesComponent } from './external-resources/external-resources.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Codepen Clone';

  codeChangeSubscription:Subscription;

  @ViewChild(ExternalResourcesComponent) resourcesComponent;

  mobileEditorPicker = "html";

  iframeContent = "";

  constructor(public codeEditorService:CodeEditorService) {  }

  ngOnInit(): void {

    this.codeEditorService.contentChanged
      .pipe(
        debounceTime(1000)
      )
      .subscribe(

        (content:string) => {
          this.iframeContent = content;
        }

      )
  }
  
  openResourcesDialog() {
	 
	this.resourcesComponent.openDialog();
	  
  }
  

  @HostListener("window:unload")
  onWindowUnload() {

    this.codeEditorService.saveToLocalStorage();

  }


}
