import{Qa as d,ea as r,eb as t,fa as s,fb as n,yb as e}from"./chunk-SHGSNXWT.js";var p=(()=>{let i=class i{ngAfterViewInit(){let a=Array.from(document.querySelectorAll("pre code")??[]);for(let o of a)hljs.highlightBlock(o)}};i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=d({type:i,selectors:[["guide"]],decls:21,vars:0,consts:[[1,"main__wrap"],[1,"plaintext"],[1,"javascript"],[1,"css"]],template:function(o,c){o&1&&(t(0,"div",0)(1,"h1"),e(2,"Guide overview"),n(),t(3,"p"),e(4," The "),t(5,"strong"),e(6,"flex-layout"),n(),e(7," provides a styled library with simple directives. "),n(),t(8,"pre")(9,"code",1),e(10,"$ npm install --save @angular-ru/cdk"),n()(),t(11,"p"),e(12," After a few seconds of waiting, you should be good to go. Let's get to the actual coding! As a first step, let's add the Angular flex layout module to our app module (src/app.module.ts): "),n(),t(13,"pre")(14,"code",2),s(),e(15,`import { FlexLayout } from '@angular-ru/cdk/flex-layout';

@Component({
   imports: [
      FlexLayout
   ],
   ...
})
export class AppComponent { }
    `),r(),n()(),t(16,"p"),e(17,"Next, let's import styles to your project. Edit src/styles.css:"),n(),t(18,"pre")(19,"code",3),s(),e(20,`
@import '~@angular-ru/cdk/flex-layout/styles';

`),r(),n()()())},encapsulation:2,changeDetection:0});let l=i;return l})();export{p as default};
