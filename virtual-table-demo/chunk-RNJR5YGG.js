import{a as v}from"./chunk-Q7AV7LR7.js";import{a as J}from"./chunk-YFW3QQN3.js";import"./chunk-YS25ZLIA.js";import"./chunk-HZPZNH2T.js";import"./chunk-5SMHXN7V.js";import{a as K}from"./chunk-YHPDSTAQ.js";import{r as A}from"./chunk-Z7M3UY5F.js";import{I as O,J as $,K as I,Y as B}from"./chunk-YPXCCQSY.js";import{Kb as w,Lb as S,Mb as T,Nb as _,Ob as l,Pb as o,Qb as b,Ub as u,Zb as g,_b as a,fb as x,ic as m,ka as V,mc as s,oc as y,pa as F,qa as E,ra as p,sa as d,sb as D,uc as M,yb as h}from"./chunk-EMWOS5UK.js";function N(t,n){if(t&1){let e=u();l(0,"mat-checkbox",12),g("change",function(){p(e);let i=a(),c=m(19);return d(c.selection.toggleAll(i.data))}),o()}if(t&2){a();let e=m(19);_("checked",e.selectionModel.isAll)("indeterminate",e.selectionModel.isIndeterminate)}}function j(t,n){if(t&1){let e=u();l(0,"mat-checkbox",13),g("change",function(){let i=p(e).$implicit;a();let c=m(19);return d(c.selection.toggle(i))}),o()}if(t&2){let e=n.$implicit;a();let r=m(19);_("checked",r.selectionModel.get(e.id))}}function U(t,n){if(t&1&&s(0),t&2){let e=n.$implicit;y(" ",e," ")}}function H(t,n){if(t&1){let e=u();l(0,"ngx-column",10),h(1,U,1,1,"ng-template",14),g("onClick",function(i){p(e);let c=a();return d(c.rowOnClick(i))}),o()}if(t&2){let e=n.$implicit;_("key",e)}}function P(t,n){if(t&1){let e=u();l(0,"mat-checkbox",12),g("change",function(){p(e);let i=a(),c=m(32);return d(c.selection.toggleAll(i.data))}),o()}if(t&2){a();let e=m(32);_("checked",e.selectionModel.isAll)("indeterminate",e.selectionModel.isIndeterminate)}}function R(t,n){if(t&1){let e=u();l(0,"mat-checkbox",13),g("change",function(){let i=p(e).$implicit;a();let c=m(32);return d(c.selection.toggle(i))}),o()}if(t&2){let e=n.$implicit;a();let r=m(32);_("checked",r.selectionModel.get(e.id))}}function q(t,n){if(t&1&&s(0),t&2){let e=n.$implicit;y(" ",e," ")}}function z(t,n){if(t&1){let e=u();l(0,"ngx-column",10),h(1,q,1,1,"ng-template",15),g("dblClick",function(i){p(e);let c=a();return d(c.rowDblClick(i))}),o()}if(t&2){let e=n.$implicit;_("key",e)}}var oe=(()=>{let n=class n{constructor(){this.toast=V(v),this.data=[{id:1,name:"single",price:29.3},{id:2,name:"developer",price:49.8},{id:3,name:"premium",price:99.5},{id:4,name:"enterprise",price:199}]}ngAfterViewInit(){this.update()}update(){K()}rowOnClick(r){this.toast.success(JSON.stringify(r,null,4),"OnClick",{timeOut:2e3,onActivateTick:!0})}rowDblClick(r){this.toast.success(JSON.stringify(r,null,4),"DblClick",{timeOut:2e3,onActivateTick:!0})}};n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=D({type:n,selectors:[["sample-thirteen"]],features:[M([v])],decls:43,vars:2,consts:[["tableFirst",""],["tableSecond",""],[1,"simple-toolbar"],[1,"column-samples"],[1,"column"],[1,"html"],["enable-selection","",3,"source"],["custom-key","","key","selection","sticky","","width","55"],["ngx-th",""],["ngx-td","","row","",3,"onClick"],[3,"key"],[1,"javascript"],[3,"change","checked","indeterminate"],[3,"change","checked"],["ngx-td","",3,"onClick"],["ngx-td","",3,"dblClick"]],template:function(i,c){if(i&1){let k=u();l(0,"mat-toolbar",2)(1,"span"),s(2,"Example mouse events"),o()(),l(3,"div",3)(4,"div",4),b(5,"br"),l(6,"pre")(7,"code",5),E(),s(8,`
      <b>OnClick</b>:

      <ngx-table-builder [source]="data" enable-selection #tableFirst>
      <ngx-column key="selection" sticky width="55" custom-key>
      <ng-template ngx-th>
      <mat-checkbox
      (change)="tableFirst.selection.toggleAll(data)"
      [indeterminate]="tableFirst.selectionModel.isIndeterminate"
      [checked]="tableFirst.selectionModel.isAll"
      ></mat-checkbox>
      </ng-template>
      <ng-template ngx-td row let-row (onClick)="$events.preventDefault()">
      <mat-checkbox
      [checked]="tableFirst.selectionModel.get($any(row).id)"
      (change)="tableFirst.selection.toggle(row)"
      ></mat-checkbox>
      </ng-template>
      </ngx-column>

      <ngx-column *ngFor="let key of tableFirst.modelColumnKeys" [key]="key">
      <ng-template ngx-td (onClick)="rowOnClick($events)" let-cell>
      {{ cell }}
      </ng-template>
      </ngx-column>
      </ngx-table-builder>

      <b>DblClick</b>:

      <ngx-table-builder [source]="data" enable-selection #tableSecond>
      <ngx-column key="selection" sticky width="55" custom-key>
      <ng-template ngx-th>
      <mat-checkbox
      (change)="tableSecond.selection.toggleAll(data)"
      [indeterminate]="tableSecond.selectionModel.isIndeterminate"
      [checked]="tableSecond.selectionModel.isAll"
      ></mat-checkbox>
      </ng-template>
      <ng-template ngx-td row let-row (onClick)="$events.preventDefault()">
      <mat-checkbox
      [checked]="tableSecond.selectionModel.get($any(row).id)"
      (change)="tableSecond.selection.toggle(row)"
      ></mat-checkbox>
      </ng-template>
      </ngx-column>

      <ngx-column *ngFor="let key of tableSecond.modelColumnKeys" [key]="key">
      <ng-template ngx-td (dblClick)="rowDblClick($events)" let-cell>
      {{ cell }}
      </ng-template>
      </ngx-column>
      </ngx-table-builder>

    `),F(),o()(),l(9,"p"),s(10," A template reference variable is often a reference to a DOM element within a template. It can also refer to a directive (which contains a component), an element, TemplateRef, or a web component. Use the hash symbol (#) to declare a reference variable. As per Official documentation it is not recommended to give same name for template reference variables as it will yield inconsistent results at runtime. Therefore, use different reference names (#tableFirst, #tableSecond). "),o()(),l(11,"div",4),b(12,"br"),l(13,"b"),s(14,"OnClick"),o(),s(15," : "),b(16,"br")(17,"br"),l(18,"ngx-table-builder",6,0)(20,"ngx-column",7),h(21,N,1,2,"ng-template",8)(22,j,1,1,"ng-template",9),g("onClick",function(C){return p(k),d(C.preventDefault())}),o(),S(23,H,2,1,"ngx-column",10,w),o(),b(25,"br"),l(26,"b"),s(27,"DblClick"),o(),s(28," : "),b(29,"br")(30,"br"),l(31,"ngx-table-builder",6,1)(33,"ngx-column",7),h(34,P,1,2,"ng-template",8)(35,R,1,1,"ng-template",9),g("onClick",function(C){return p(k),d(C.preventDefault())}),o(),S(36,z,2,1,"ngx-column",10,w),o(),b(38,"br")(39,"br"),l(40,"pre")(41,"code",11),s(42,`
              // app.component.ts
              import { TableEvent } from "@angular-ru/cdk/virtual-table";
              import { Component } from "@angular/core";
              import { ToastService } from "./toast.service";
              import { Data } from "./data.interface";

              @Component({
                  selector: 'app',
                  templateUrl: './app.component.html'
              })
              export class AppComponent {
                  public data: Data[] = [ .. ];

                  constructor(private toast: ToastService) {}

                  public rowOnClick(events: TableEvent): void {
                      this.toast.success('OnClick', events);
                  }

                  public rowDblClick(events: TableEvent): void {
                      this.toast.success('DblClick', events);
                  }
              }
            `),o()()()()}if(i&2){let k=m(19),f=m(32);x(18),_("source",c.data),x(5),T(k.modelColumnKeys),x(8),_("source",c.data),x(5),T(f.modelColumnKeys)}},dependencies:[J,A,I,B,O,$],encapsulation:2,changeDetection:0});let t=n;return t})();export{oe as default};
