import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ExternalResourcesComponent } from './external-resources/external-resources.component';
import { SrcdocDirective } from "./shared/srcdoc.directive";

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    ExternalResourcesComponent,
    SrcdocDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
