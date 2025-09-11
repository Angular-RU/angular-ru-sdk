import{a as B}from"./chunk-5W42VNXU.js";import{a as N}from"./chunk-YHPDSTAQ.js";import{r as u}from"./chunk-Z7M3UY5F.js";import{Q as h,T as f,U as v,V as E,W as S,Y as y}from"./chunk-YPXCCQSY.js";import{Ca as g,Nb as o,Ob as t,Pb as n,Qb as i,fb as r,mc as e,pa as l,qa as a,sb as b,vc as x}from"./chunk-EMWOS5UK.js";var w=()=>[],O=(()=>{let d=class d{constructor(){this.data=g([]),this.licences=[{id:1,name:"single",price:29.3},{id:2,name:"developer",price:49.8},{id:3,name:"premium",price:99.5},{id:4,name:"enterprise",price:199}]}ngOnInit(){B.generator(50,15).then(s=>{this.data.set(s)})}ngAfterViewInit(){this.update()}update(){N()}};d.\u0275fac=function(m){return new(m||d)},d.\u0275cmp=b({type:d,selectors:[["sample-twelve"]],decls:86,vars:8,consts:[[1,"simple-toolbar"],[1,"column-samples"],[1,"column"],[3,"source"],[1,"no-data"],[1,"html"],[1,"css"],["align-center","","bold","","content-cell",""],[3,"height","source"],["is-draggable","","is-sortable",""],[2,"height","500px"],["height","100%",3,"source"],["align-center","","bold","","content-cell","","expandablePanel",""]],template:function(m,s){m&1&&(t(0,"mat-toolbar",0)(1,"span"),e(2,"Example table header, footer"),n()(),t(3,"h3")(4,"i"),e(5,"<ngx-source-null></ngx-source-null>"),n(),e(6,` - display content when table value not set
`),n(),i(7,"br"),t(8,"div",1)(9,"div",2)(10,"ngx-table-builder",3)(11,"ngx-source-null")(12,"div",4),e(13,"Source not set (null/undefined/NaN)"),n()()(),t(14,"pre")(15,"code",5),a(),e(16,`
  <!-- app.component.html -->
  <ngx-table-builder [source]="null">
    <ngx-source-null>
      <div class="no-data">Source not set (null/undefined/NaN)</div>
    </ngx-source-null>
  </ngx-table-builder>

`),l(),n()()(),t(17,"div",2)(18,"pre")(19,"code",6),a(),e(20,`
  /* app.component.css */

  .no-data {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
  }

`),l(),n()()()(),t(21,"h3")(22,"i"),e(23,"<ngx-empty></ngx-empty>"),n(),e(24,` - display content when empty table
`),n(),i(25,"br"),t(26,"div",1)(27,"div",2)(28,"ngx-table-builder",3)(29,"ngx-empty")(30,"div",4),e(31,"No data"),n()()(),t(32,"pre")(33,"code",5),a(),e(34,`
  <!-- app.component.html -->
  <ngx-table-builder [source]="[]">
    <ngx-empty>
      <div class="no-data">No data</div>
    </ngx-empty>
  </ngx-table-builder>

`),l(),n()()(),t(35,"div",2)(36,"pre")(37,"code",6),a(),e(38,`
  /* app.component.css */

  .no-data {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
  }

`),l(),n()()()(),t(39,"h3")(40,"i"),e(41,"<ngx-header></ngx-header>"),n(),e(42," - display table header, "),t(43,"i"),e(44,"<ngx-footer></ngx-footer>"),n(),e(45,` - display table footer
`),n(),i(46,"br"),t(47,"div",1)(48,"div",2)(49,"ngx-table-builder",3)(50,"ngx-header",7),e(51," License list "),n()(),i(52,"br"),t(53,"pre")(54,"code",5),a(),e(55,`
  <!-- app.component.html -->
  <ngx-table-builder [source]="data">
     <ngx-header content-cell align-center bold>License list</ngx-header>
  </ngx-table-builder>

`),l(),n()()(),t(56,"div",2)(57,"ngx-table-builder",3)(58,"ngx-footer",7),e(59," Footer "),n()(),i(60,"br"),t(61,"pre")(62,"code",5),a(),e(63,`
  <!-- app.component.html -->
  <ngx-table-builder [source]="data">
     <ngx-footer content-cell align-center bold>Footer</ngx-footer>
  </ngx-table-builder>

`),l(),n()()()(),t(64,"h3"),e(65,"Header and footer are always sticky position"),n(),i(66,"br"),t(67,"ngx-table-builder",8),i(68,"ngx-options",9),t(69,"ngx-header",7),e(70," Header 1 "),n(),t(71,"ngx-footer",7),e(72," Footer 1 "),n()(),t(73,"h3"),e(74,"Table with header can be expandable"),n(),t(75,"pre")(76,"code",5),a(),e(77,`
  <!-- app.component.html -->

    <ngx-table-builder [source]="data" height="100%">
        <ngx-options is-draggable is-sortable></ngx-options>
        <ngx-header content-cell align-center bold expandable>Header 3</ngx-header>
    </ngx-table-builder>

`),l(),n()(),i(78,"br"),t(79,"div",10)(80,"ngx-table-builder",11),i(81,"ngx-options",9),t(82,"ngx-header",12),e(83," Header 3 "),n()()(),i(84,"br")(85,"br")),m&2&&(r(10),o("source",null),r(18),o("source",x(7,w)),r(21),o("source",s.licences),r(8),o("source",s.licences),r(10),o("height",500)("source",s.data()),r(13),o("source",s.data()))},dependencies:[u,h,f,v,E,S,y],styles:[`.no-data{text-align:center;font-size:16px;font-weight:700;margin-bottom:10px}
`],encapsulation:2,changeDetection:0});let c=d;return c})();export{O as default};
