import{b as Y,c as j}from"./chunk-7KV7CJZV.js";import"./chunk-VQYTXSYH.js";import{a as U}from"./chunk-YFW3QQN3.js";import"./chunk-YS25ZLIA.js";import{a as G}from"./chunk-5W42VNXU.js";import"./chunk-RHX3XEC6.js";import"./chunk-HZPZNH2T.js";import"./chunk-5SMHXN7V.js";import{a as P}from"./chunk-YHPDSTAQ.js";import{r as N}from"./chunk-Z7M3UY5F.js";import{I as D,J as A,K as F,N as R,O as L,P as O,V as J,Y as z,Z as K,k as B}from"./chunk-YPXCCQSY.js";import{Ac as T,Bc as V,Ca as M,Ib as S,Jb as h,Kb as $,Lb as y,Mb as f,Nb as g,Ob as e,Pb as n,Qb as c,Ub as b,Zb as _,_b as s,fb as r,ic as u,mc as t,nc as w,oc as C,pa as v,qa as E,ra as p,sa as d,sb as I,yb as k}from"./chunk-EMWOS5UK.js";var H=(m,a)=>a.key;function Q(m,a){if(m&1){let i=b();e(0,"ngx-context-menu-item",31),_("onClick",function(o){let x=p(i).$implicit;return s(),u(12).toggleColumnVisibility(x.key),d(o.preventDefault())}),e(1,"ngx-menu-content",32),t(2),n(),e(3,"ngx-menu-content",33),c(4,"mat-checkbox",34),n()()}if(m&2){let i=a.$implicit;g("visible",i.isModel),r(2),w(i.key),r(2),g("checked",i.isVisible)}}function W(m,a){if(m&1){let i=b();e(0,"ngx-context-menu-item",14,1),_("onClick",function(){p(i);let o=u(1),x=s(2);return d(x.copyId(o.state.value))}),c(2,"ngx-menu-content",16),e(3,"ngx-menu-content"),t(4,"Copy in buffer ID"),n()()}}function X(m,a){if(m&1&&(e(0,"ngx-context-menu-item",null,1),c(2,"ngx-menu-content",16),e(3,"ngx-menu-content"),t(4),n()()),m&2){let i=u(1);r(4),C("Price: ",i.state.textContent)}}function Z(m,a){if(m&1&&(t(0),T(1,"currency")),m&2){let i=a.$implicit;C(" ",V(1,1,i)," ")}}function ee(m,a){}function ne(m,a){if(m&1&&t(0),m&2){let i=a.$implicit;s();let l=u(59);C(" ",l.selectionModel.get(i.id)?"x":"-"," ")}}function te(m,a){if(m&1&&c(0,"ngx-column",29),m&2){let i=a.$implicit;g("key",i)}}function ie(m,a){if(m&1){let i=b();e(0,"ngx-context-menu-item",31),_("onClick",function(o){let x=p(i).$implicit;return s(),u(59).toggleColumnVisibility(x.key),d(o.preventDefault())}),e(1,"ngx-menu-content",32),t(2),n(),e(3,"ngx-menu-content",33),c(4,"mat-checkbox",34),n()()}if(m&2){let i=a.$implicit;g("visible",i.isModel),r(2),w(i.key),r(2),g("checked",i.isVisible)}}function oe(m,a){if(m&1){let i=b();e(0,"div",5)(1,"mat-tab-group",6),_("selectedTabChange",function(){p(i);let o=s();return d(o.update())}),e(2,"mat-tab",7)(3,"div",8)(4,"div",5),c(5,"br"),e(6,"pre")(7,"code",9),t(8,`
                <!-- app.component.html -->
                <ngx-table-builder [source]="data">
                <ngx-context-menu>
                <ngx-context-menu-item contextTitle divider>
                <ngx-menu-content icon="./assets/angular.svg"></ngx-menu-content>
                <ngx-menu-content>My custom context menu title</ngx-menu-content>
                </ngx-context-menu-item>
                <ngx-context-menu-item (onClick)="exportExcel(data)">
                <ngx-menu-content icon="./assets/excel.png"></ngx-menu-content>
                <ngx-menu-content>Export Excel</ngx-menu-content>
                </ngx-context-menu-item>
                <ngx-context-menu-item #item divider
                [disable]="!item.state.key"
                (onClick)="showLine(item.state.key, item.state.item)">
                <ngx-menu-content icon></ngx-menu-content>
                <ngx-menu-content>Show item row</ngx-menu-content>
                </ngx-context-menu-item>
                <ngx-context-menu-item #item
                *ngIf="item.state.key === 'id'"
                (onClick)="copyId(item.state.value)">
                <ngx-menu-content icon></ngx-menu-content>
                <ngx-menu-content>Show item row</ngx-menu-content>
                </ngx-context-menu-item>
                </ngx-context-menu>
                </ngx-table-builder>
              `),n()()(),e(9,"div",5),c(10,"br"),e(11,"ngx-table-builder",10,0)(13,"ngx-context-menu",11)(14,"ngx-context-menu-item",12),c(15,"ngx-menu-content",13),e(16,"ngx-menu-content"),t(17,"My custom context menu title"),n()(),e(18,"ngx-context-menu-item",14),_("onClick",function(){p(i);let o=s();return d(o.exportExcel(o.licences))}),c(19,"ngx-menu-content",15),e(20,"ngx-menu-content"),t(21,"Export Excel"),n()(),e(22,"ngx-context-menu-item"),c(23,"ngx-menu-content",16),e(24,"ngx-menu-content"),t(25,"Column settings"),n(),e(26,"ngx-context-menu-item")(27,"ngx-menu-content"),t(28,"List"),n(),y(29,Q,5,3,"ngx-context-menu-item",17,H),n()(),e(31,"ngx-context-menu-item",18,1),_("onClick",function(){p(i);let o=u(32),x=s();return d(x.showLine(o.state.key,o.state.item))}),c(33,"ngx-menu-content",16),e(34,"ngx-menu-content"),t(35,"Show item row"),n()(),e(36,"ngx-context-menu-item",19,1),_("onClick",function(){p(i);let o=u(32),x=s();return d(x.showColumnName(o.state.key))}),c(38,"ngx-menu-content",16),e(39,"ngx-menu-content"),t(40,"Show column name"),n()(),S(41,W,5,0,"ngx-context-menu-item"),S(42,X,5,1,"ngx-context-menu-item"),e(43,"ngx-context-menu-item"),c(44,"ngx-menu-content",16),e(45,"ngx-menu-content"),t(46),T(47,"mapToTableEntries"),n()()(),e(48,"ngx-column",20),k(49,Z,2,3,"ng-template",21),n()(),c(50,"br")(51,"br"),e(52,"pre")(53,"code",22),t(54,`
                      // app.component.ts
                      import { Component } from "@angular/core";
                      import { Data } from "./data.interface";
                      @Component({
                      selector: 'app',
                      templateUrl: './app.component.html'
                      })
                      export class AppComponent {
                      public data: Data[] = [ .. ];
                      public exportExcel(data: Data[]): void {
                      window.alert('export excel - ' + JSON.stringify(data));
                      }
                      public showLine(key: string, item: Data): void {
                      window.alert('key - ' + key + ' item - ' + JSON.stringify(item));
                      }
                      public copyId(id: string): void {
                      window.alert('Copy on buffer - ' + id);
                      }
                      }
                    `),n()()()()(),e(55,"mat-tab",23),c(56,"br"),e(57,"div")(58,"ngx-table-builder",24,2),_("schemaChanges",function(o){p(i);let x=s();return d(x.updatedSchema(o))}),c(60,"ngx-options",25),e(61,"ngx-column",26),k(62,ee,0,0,"ng-template",27)(63,ne,1,1,"ng-template",28),n(),y(64,te,1,1,"ngx-column",29,$),e(66,"ngx-context-menu")(67,"ngx-context-menu-item",12)(68,"ngx-menu-content"),t(69),n()(),e(70,"ngx-context-menu-item"),c(71,"ngx-menu-content",16),e(72,"ngx-menu-content"),t(73,"Item1"),n()(),e(74,"ngx-context-menu-item"),c(75,"ngx-menu-content",16),e(76,"ngx-menu-content"),t(77,"Item2"),n()(),e(78,"ngx-context-menu-item"),c(79,"ngx-menu-content",16),e(80,"ngx-menu-content"),t(81,"Item3"),n()(),e(82,"ngx-context-menu-item",30),c(83,"ngx-menu-content",16),e(84,"ngx-menu-content"),t(85,"Item4"),n()(),e(86,"ngx-context-menu-item")(87,"ngx-menu-content"),t(88,"Column list"),n(),y(89,ie,5,3,"ngx-context-menu-item",17,H),n(),e(91,"ngx-context-menu-item",19),_("onClick",function(){p(i);let o=u(59);return d(o.resetSchema())}),e(92,"ngx-menu-content"),t(93,"Reset table settings"),n()(),e(94,"ngx-context-menu-item")(95,"ngx-menu-content"),t(96,"Example tree"),n(),e(97,"ngx-context-menu-item")(98,"ngx-menu-content"),t(99,"Root A"),n(),e(100,"ngx-context-menu-item")(101,"ngx-menu-content"),t(102,"Child A1"),n()(),e(103,"ngx-context-menu-item")(104,"ngx-menu-content"),t(105,"Child A2"),n()(),e(106,"ngx-context-menu-item")(107,"ngx-menu-content"),t(108,"Child A3"),n()()(),e(109,"ngx-context-menu-item")(110,"ngx-menu-content"),t(111,"Root B"),n()(),e(112,"ngx-context-menu-item")(113,"ngx-menu-content"),t(114,"Root C"),n(),e(115,"ngx-context-menu-item")(116,"ngx-menu-content"),t(117,"Child C1"),n()(),e(118,"ngx-context-menu-item")(119,"ngx-menu-content"),t(120,"Child C2"),n()(),e(121,"ngx-context-menu-item")(122,"ngx-menu-content"),t(123,"Child C3"),n()()()()()()(),e(124,"div",8)(125,"div",5),c(126,"br"),e(127,"p")(128,"b"),t(129,"Note"),n(),t(130," : You can also wrap the templates in your component. "),n(),e(131,"pre")(132,"code",9),E(),t(133,`
                          <!-- app.component.html -->
                          <ngx-table-builder #table [source]="data" height="500" enable-selection>
                          <ngx-options [resizable]="true" [sortable]="true"></ngx-options>
                          <ngx-context-menu>
                          <my-menu [table]="table"></my-menu>
                          </ngx-context-menu>
                          <ngx-column key="action" custom-key sticky [resizable]="false" [width]="50">
                          <ng-template ngx-th></ng-template>
                          <ng-template ngx-td row let-row>
                          {{ table.selectionModel.get($any(row).id) ? 'x' : '-' }}
                          </ng-template>
                          </ngx-column>
                          <ngx-column *ngFor="let key of table.modelColumnKeys" [key]="key"></ngx-column>
                          </ngx-table-builder>
                        `),v(),n()(),c(134,"br"),e(135,"pre")(136,"code",22),t(137,`
                          // my-menu.component.ts
                          import { TableBuilderComponent } from "@angular-ru/cdk/virtual-table";
                          import { Component } from "@angular/core";
                          @Component({
                          selector: 'my-menu',
                          templateUrl: './my-menu.component.html'
                          })
                          export class MyMenuComponent {
                          @Input() public table: TableBuilderComponent;
                          }
                        `),n()()(),e(138,"div",5),c(139,"br"),e(140,"p")(141,"b"),t(142,"Note"),n(),t(143," : You can also wrap the templates in your component. "),n(),e(144,"pre")(145,"code",9),E(),t(146,`
                          <!-- my-menu.component.html -->
                          <!-- first item -->
                          <ngx-context-menu-item contextTitle divider>
                          <ngx-menu-content>Menu</ngx-menu-content>
                          </ngx-context-menu-item>
                          <!-- second item -->
                          <ngx-context-menu-item>
                          <ngx-menu-content>Column list</ngx-menu-content>
                          <ngx-context-menu-item
                          *ngFor="let column of table.columnSchema"
                          (onClick)="table.toggleColumnVisibility(column.key); $events.preventDefault()"
                          [visible]="column.isModel"
                          >
                          <ngx-menu-content no-margin>{{ column.key }}</ngx-menu-content>
                          <ngx-menu-content no-margin align-center>
                          <mat-checkbox
                          color="primary"
                          [checked]="column.visible"
                          ></mat-checkbox>
                          </ngx-menu-content>
                          </ngx-context-menu-item>
                          </ngx-context-menu-item>
                          <!-- third item -->
                          <ngx-context-menu-item (onClick)="table.resetSchema()" divider>
                          <ngx-menu-content>Reset table settings</ngx-menu-content>
                          </ngx-context-menu-item>
                          <!-- fourth item -->
                          <ngx-context-menu-item>
                          <ngx-menu-content>Example tree</ngx-menu-content>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Root A</ngx-menu-content>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Child A1</ngx-menu-content>
                          </ngx-context-menu-item>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Child A2</ngx-menu-content>
                          </ngx-context-menu-item>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Child A3</ngx-menu-content>
                          </ngx-context-menu-item>
                          </ngx-context-menu-item>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Root B</ngx-menu-content>
                          </ngx-context-menu-item>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Root C</ngx-menu-content>
                          <ngx-context-menu-item>
                          <ngx-menu-content> Child C1</ngx-menu-content>
                          </ngx-context-menu-item>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Child C2</ngx-menu-content>
                          </ngx-context-menu-item>
                          <ngx-context-menu-item>
                          <ngx-menu-content>Child C3</ngx-menu-content>
                          </ngx-context-menu-item>
                          </ngx-context-menu-item>
                          </ngx-context-menu-item>
                        `),v(),n()()()()()()()}if(m&2){let i=u(12),l=u(32),o=u(59),x=s();r(11),g("source",x.licences),r(2),g("height",null),r(16),f(i.columnSchema),r(2),g("disable",!l.state.key),r(10),h(l.state.key==="id"?41:-1),r(),h(l.state.key==="price"?42:-1),r(4),C(" Selected items (",V(47,9,i==null?null:i.selectedKeyList).length,") "),r(12),g("source",x.data()),r(3),g("is-draggable",!1),r(3),f(o.modelColumnKeys),r(5),C("Menu ",o.selection.selectionModel.size),r(20),f(o.columnSchema)}}var Se=(()=>{let a=class a{constructor(){this.data=M([]),this.licences=[{id:1,name:"single",price:29.3},{id:2,name:"developer",price:49.8},{id:3,name:"premium",price:99.5},{id:4,name:"enterprise",price:199}]}ngOnInit(){G.generator(50,15).then(x=>{this.data.set(x)})}ngAfterViewInit(){this.update()}update(){P()}exportExcel(l){window.alert(`export excel - ${JSON.stringify(l)}`)}showLine(l,o){window.alert(`key - ${l} item - ${JSON.stringify(o)}`)}copyId(l){window.alert(`Copy on buffer - ${l}`)}updatedSchema(l){console.log("Update schema",l)}showColumnName(l){window.alert(l)}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=I({type:a,selectors:[["sample-eleven"]],decls:5,vars:1,consts:[["table1",""],["item",""],["table2",""],[1,"simple-toolbar"],[1,"night"],[1,"column"],[3,"selectedTabChange"],["label","Custom context menu"],[1,"column-samples"],[1,"html"],["enable-selection","",3,"source"],[3,"height"],["contextTitle","","divider",""],["icon","https://angular.io/assets/images/logos/angular/angular.svg"],[3,"onClick"],["icon","/assets/img/excel.png"],["icon",""],[3,"visible"],["divider","",3,"onClick","disable"],["divider","",3,"onClick"],["important-template","","key","price"],["ngx-td",""],[1,"javascript"],["label","Custom sub menu"],["enable-selection","","height","500",3,"schemaChanges","source"],["is-draggable","","is-resizable","","is-sortable",""],["custom-key","","key","action","sticky","","width","50",3,"is-draggable"],["ngx-th",""],["ngx-td","","row",""],[3,"key"],["divider",""],[3,"onClick","visible"],["no-margin",""],["align-center","","no-margin",""],["color","primary",3,"checked"]],template:function(o,x){o&1&&(e(0,"mat-toolbar",3)(1,"span"),t(2,"Example context menu"),n()(),e(3,"div",4),S(4,oe,147,11,"div",5),n()),o&2&&(r(4),h(x.licences.length?4:-1))},dependencies:[B,U,Y,j,N,K,F,R,L,O,J,z,D,A],styles:[`.night{position:relative;margin:auto}.night .mat-tab-body-content{padding:5px 0;height:calc(100% - 10px);overflow:hidden}.night .mat-tab-body-wrapper .mat-tab-body.mat-tab-body-active{overflow:visible;max-width:100%}
`],encapsulation:2,changeDetection:0});let m=a;return m})();export{Se as default};
