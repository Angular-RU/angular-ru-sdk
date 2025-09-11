import{b as c}from"./chunk-XVCRVNBE.js";import{a as g}from"./chunk-YHPDSTAQ.js";import{Y as u}from"./chunk-YPXCCQSY.js";import{Nb as s,Ob as i,Pb as t,Qb as l,fb as d,mc as e,pa as o,qa as m,sb as p}from"./chunk-EMWOS5UK.js";var w=(()=>{let n=class n{constructor(){this.rowData=[{make:"Toyota",model:"Celica",price:35e3},{make:"Ford",model:"Mondeo",price:32e3},{make:"Porsche",model:"Boxter",price:72e3}]}ngAfterViewInit(){g()}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=p({type:n,selectors:[["guide"]],decls:53,vars:1,consts:[[1,"main__wrap"],[1,"plaintext"],[1,"javascript"],[1,"typescript"],[3,"source"],["routerLink","samples/guide"],[1,"guide"],["alt","","src","assets/img/pipeline.png"]],template:function(a,x){a&1&&(i(0,"div",0)(1,"h1"),e(2,"Guide overview"),t(),i(3,"p"),e(4," The "),i(5,"strong"),e(6,"ngx-table-builder"),t(),e(7," provides a styled data-table that can be used to display rows of data. The "),i(8,"strong"),e(9,"ngx-table-builder"),t(),e(10," is an customizable data-table with a fully-templated API, dynamic columns, and an accessible DOM structure. This component acts as the core upon which anyone can build their own tailored data-table experience. "),t(),i(11,"pre")(12,"code",1),e(13,`
  $ npm install --save @angular-ru/cdk/virtual-table

`),t()(),i(14,"p")(15,"strong"),e(16,"Benefits:"),t(),l(17,"br"),t(),i(18,"ul")(19,"li"),e(20,"Outstanding Performance;"),t(),i(21,"li"),e(22,"Simple use and setup;"),t(),i(23,"li"),e(24,"Customisable Appearance;"),t(),i(25,"li"),e(26,"State Persistence;"),t(),i(27,"li"),e(28,"Filtering;"),t(),i(29,"li"),e(30,"Sorting;"),t(),i(31,"li"),e(32,"Selection;"),t()(),i(33,"p"),e(34," After a few seconds of waiting, you should be good to go. Let's get to the actual coding! As a first step, let's add the Angular table builder module to our app module (src/app.module.ts): "),t(),i(35,"pre")(36,"code",2),m(),e(37,`
    import { provideVirtualTable } from '@angular-ru/cdk/virtual-table';

    export const appConfig: ApplicationConfig = {
       providers: [
          provideVirtualTable()
       ],
       ...
    };
    `),o(),t()(),i(38,"p"),e(39,"Next, let's declare the basic grid configuration. Edit src/app.component.ts:"),t(),i(40,"pre")(41,"code",3),e(42,`
    import { Component } from '@angular/core';
    import { MyData } from './my-data.interface';
    import { VirtualTable } from '@angular-ru/cdk/virtual-table';

    @Component({
      selector: 'app-root',
      template: \`<ngx-table-builder [source]="data"></ngx-table-builder>\`,
      imports: [VirtualTable]
    })
    export class AppComponent {
      public data: MyData[] = [
          { make: 'Toyota', model: 'Celica', price: 35000 },
          { make: 'Ford', model: 'Mondeo', price: 32000 },
          { make: 'Porsche', model: 'Boxter', price: 72000 }
      ];
    }
    `),t()(),l(43,"ngx-table-builder",4),i(44,"p"),e(45," For more information on the interface and a detailed look at how the table is implemented, see the "),i(46,"a",5),e(47,"guide"),t(),e(48," . "),t(),i(49,"div",6)(50,"h2"),e(51,"Rendering pipeline"),t(),l(52,"img",7),t()()),a&2&&(d(43),s("source",x.rowData))},dependencies:[c,u],encapsulation:2,changeDetection:0});let r=n;return r})();export{w as default};
