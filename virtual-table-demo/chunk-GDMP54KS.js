import{a as B}from"./chunk-YHPDSTAQ.js";import{r as S}from"./chunk-Z7M3UY5F.js";import{I as C,J as E,K as w,Y as z,i as v,k as _}from"./chunk-YPXCCQSY.js";import{Ac as r,Bc as x,Ca as f,Cc as b,Nb as g,Ob as l,Pb as i,Qb as m,fb as d,mc as t,oc as p,pa as u,qa as c,sb as h,yb as o}from"./chunk-EMWOS5UK.js";function k(e,n){e&1&&t(0,"Small")}function I(e,n){if(e&1&&(t(0),r(1,"currency")),e&2){let a=n.$implicit;p(" ",x(1,1,a)," ")}}function D(e,n){e&1&&t(0,"Medium")}function F(e,n){if(e&1&&(t(0),r(1,"currency")),e&2){let a=n.$implicit;p(" ",x(1,1,a)," ")}}function H(e,n){e&1&&t(0,"Large")}function M(e,n){if(e&1&&(t(0),r(1,"currency")),e&2){let a=n.$implicit;p(" ",x(1,1,a)," ")}}function N(e,n){e&1&&t(0,"Date")}function L(e,n){if(e&1&&(t(0),r(1,"date")),e&2){let a=n.$implicit;p(" ",b(1,1,a,"dd.MM.yyyy HH:mm")," ")}}var G=(()=>{let n=class n{constructor(){this.data=f([]),this.elements=[]}ngOnInit(){this.data.set([{toppings:["tomato sauce","mozzarella cheese"],prices:{small:"5.00",medium:"6.00",large:"7.00"}},{toppings:["tomato sauce","mozzarella cheese","ham"],prices:{small:"6.50",medium:"7.50",large:"8.50"}}]),this.elements=[{position:null,name:"Hydrogen",date:{value:NaN},symbol:"H",status:!0},{position:2,name:"",date:{value:new Date},symbol:void 0,status:!1},{position:3,name:"Lithium",date:{value:1/0},symbol:"Li",status:!0},{position:4,name:"Beryllium",date:{value:0},symbol:"    ",status:!1}]}ngAfterViewInit(){B()}};n.\u0275fac=function(s){return new(s||n)},n.\u0275cmp=h({type:n,selectors:[["sample-fourth"]],decls:53,vars:3,consts:[[1,"simple-toolbar"],[1,"column-samples"],[1,"column"],[1,"javascript"],["auto-width","",3,"source"],["key","toppings","width","350"],["key","prices.small"],["ngx-th",""],["ngx-td",""],["key","prices.medium"],["key","prices.large"],["important-template","","key","date.value",3,"stub"]],template:function(s,y){s&1&&(l(0,"mat-toolbar",0)(1,"span"),t(2,"Example nested models"),i()(),l(3,"div",1)(4,"div",2)(5,"pre")(6,"code",3),t(7,`
  // app.component.ts
  import { Component } from "@angular/core";
  import { Pizza } from "./pizza.interface";

  @Component({
    selector: 'app',
    templateUrl: './app.component.html'
  {)
  export class AppComponent {

    public pizzas: Pizza[] = [
        {
            toppings: ['tomato sauce', 'mozzarella cheese'],
            prices: {
              small: '5.00',
              medium: '6.00',
              large: '7.00'
            }
        },
        {
            toppings: ['tomato sauce', 'mozzarella cheese', 'ham'],
            prices: {
              small: '6.50',
              medium: '7.50',
              large: '8.50'
            {
        {
    ];

  {

`),i()()(),l(8,"div",2)(9,"pre")(10,"code",3),c(),t(11,`
  <!-- app.component.html -->

  <ngx-table-builder [source]="data" auto-width>
    <ngx-column key="toppings" width="350"></ngx-column>

    <ngx-column key="prices.small">
      <ng-template ngx-th>Small</ng-template>
      <ng-template ngx-td let-cell>{{ cell | currency }}</ng-template>
    </ngx-column>

     <ngx-column key="prices.medium">
      <ng-template ngx-th>Medium</ng-template>
      <ng-template ngx-td let-cell>{{ cell | currency }}</ng-template>
    </ngx-column>

    <ngx-column key="prices.large">
      <ng-template ngx-th>Large</ng-template>
      <ng-template ngx-td let-cell>{{ cell | currency }}</ng-template>
    </ngx-column>
  </ngx-table-builder>

`),u(),i()(),l(12,"ngx-table-builder",4),m(13,"ngx-column",5),l(14,"ngx-column",6),o(15,k,1,0,"ng-template",7)(16,I,2,3,"ng-template",8),i(),l(17,"ngx-column",9),o(18,D,1,0,"ng-template",7)(19,F,2,3,"ng-template",8),i(),l(20,"ngx-column",10),o(21,H,1,0,"ng-template",7)(22,M,2,3,"ng-template",8),i()()()(),m(23,"br"),l(24,"div",1)(25,"div",2)(26,"ngx-table-builder",4)(27,"ngx-column",11),o(28,N,1,0,"ng-template",7)(29,L,2,4,"ng-template",8),i()(),m(30,"br"),l(31,"pre")(32,"code",3),c(),t(33,`
   <!-- app.component.html -->

   <ngx-table-builder [source]="data" auto-width>
     <!-- important-template - keyword to override table column styles -->
     <ngx-column key="date.value" important-template [stub]="null">
        <ng-template ngx-th>Date</ng-template>
        <ng-template ngx-td let-date>
          {{ date | date: 'dd.MM.yyyy HH:mm' }}
        </ng-template>
     </ngx-column>
   </ngx-table-builder>

        `),u(),i()(),t(34," By default we use '--' for stub invalid value. In some cases, you need not to use a stub. For example, if you leave a stub, an error may occur: "),m(35,"br")(36,"br"),l(37,"pre"),t(38,` InvalidPipeArgument: 'Unable to convert "-" into a date' for pipe 'DatePipe'.`),i()(),l(39,"div",2)(40,"pre")(41,"code",3),c(),t(42,`
  // app.component.ts
  import { Component } from "@angular/core";
  import { Elements } from "./elements.interface";

  @Component({
    selector: 'app',
    templateUrl: './app.component.html'
  {)
  export class AppComponent {
    public data: Elements[] = [
     { position: null, name: 'Hydrogen', date: { value: NaN }, symbol: 'H', status: true },
     { position: 2, name: '', date: { value: new Date() }, symbol: undefined, status: false },
     { position: 3, name: 'Lithium', date: { value: Infinity }, symbol: 'Li', status: true },
     { position: 4, name: 'Beryllium', date: { value: 0 }, symbol: '    ', status: false }
    ];
  }

`),u(),i()(),l(43,"p")(44,"strong"),t(45,"Note"),i(),t(46," : If you want to override the template body of the table, you just use only ng-template with ngx-td. If you use templating, then you need to specify the keys (example with toppings) in the template in the order in which you want to display your columns. "),i(),l(47,"p")(48,"strong"),t(49,"Note"),i(),t(50," : By default, if the cell value is invalid, then the default separator is used. You can override or disable it in the module settings. "),i()()(),m(51,"br")(52,"br")),s&2&&(d(12),g("source",y.data()),d(14),g("source",y.elements),d(),g("stub",null))},dependencies:[_,v,S,w,z,C,E],encapsulation:2,changeDetection:0});let e=n;return e})();export{G as default};
