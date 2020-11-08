import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'


import { JSHINT } from 'jshint/dist/jshint'
import { HTMLHint } from 'htmlhint/dist/htmlhint'
import { CSSLint } from 'csslint/dist/csslint'

(window as any).JSHINT = JSHINT;
(window as any).HTMLHint = HTMLHint;
(window as any).CSSLint = CSSLint;

import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/css-lint'
import 'codemirror/addon/lint/html-lint'



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
