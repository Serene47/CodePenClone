
import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({providedIn : 'root'})
export class CodeEditorService {

  content = {
    html : "",
    css : "",
    javascript : "",
    externalCSS : [],
    externalJS : []
  }

  codeEditorsCount = 3;
  shrinkedEditors = 0;

  contentChanged:BehaviorSubject<string>;

  constructor() {

    this.contentChanged = new BehaviorSubject<string>("");

    let storedContent = localStorage.getItem("iframeContent");

    if(storedContent){

      this.content = JSON.parse(storedContent);

      this.generateContent();

    }

  }

  updateShrinkCount(isEditorShrinked:boolean) {
    isEditorShrinked ? ++this.shrinkedEditors : --this.shrinkedEditors;
  }

  canShrink():boolean{
    return this.shrinkedEditors + 1 < this.codeEditorsCount;
  }

  updateContent(code:string,mode:string){

    this.content[mode] = code;

    this.generateContent();

  }

  addExternalResources(cssUrls:string[],jsUrls:string[]) {

    this.content.externalCSS = cssUrls;
    this.content.externalJS = jsUrls;

    this.generateContent();
  }

  generateContent() {

    let iframeContent =
      `<html>
          <head>
            ${this.content.externalCSS.map((link) => `<link rel="stylesheet" href="${link}" \>`)}
            <style>
              ${this.content.css}
            </style>
          </head>
          <body>
            ${this.content.html}
            ${this.content.externalJS.map((link) => `<script src="${link}" ></script>`)}
            <script>
              ${this.content.javascript}
            </script>
          </body>
        </html>`

    this.contentChanged.next(iframeContent);

  }

  saveToLocalStorage(){

    localStorage.setItem("iframeContent", JSON.stringify(this.content));

  }


}
