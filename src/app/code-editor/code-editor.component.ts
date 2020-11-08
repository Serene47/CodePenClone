import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { CodeEditorService } from "../shared/code-editor.service";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  @Input() mode:string; 

  options: { [key:string]: any };

  @HostBinding("class.shrink") shrinked = false;

  constructor(public codeEditorService:CodeEditorService) { }

  ngOnInit(): void {

    this.options = {
      theme : "material-darker",
      lineNumbers : true,
      lineWrapping : true,
      lint : true,
      gutters: ["CodeMirror-lint-markers"],
    }

    switch(this.mode) {

      case "html" :

        this.options.mode = "xml";
        this.options.htmlMode = true;

        break;

      case "javascript" :
      case "css" :

        this.options.mode = this.mode;
        this.options.matchbrackets = true;
        this.options.closebrackets = true;

        break;

    }

  }

  onChangeHandler(event) {

    this.codeEditorService.updateContent(event,this.mode);

  }

  toggleEditor() {

    if(!this.shrinked) {

      if(this.codeEditorService.canShrink()) {

        this.shrinked = true;

        this.codeEditorService.updateShrinkCount(this.shrinked)

      }

    } else {

      this.shrinked = false;

      this.codeEditorService.updateShrinkCount(this.shrinked)
    }

  }

}
