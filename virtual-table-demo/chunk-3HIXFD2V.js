import{a as O}from"./chunk-OYNQ5WAV.js";import{c as F}from"./chunk-VP7U7VFG.js";import{a as I}from"./chunk-5W42VNXU.js";import"./chunk-CPBGOJHF.js";import{b as M}from"./chunk-4VS2STHW.js";import"./chunk-RHX3XEC6.js";import"./chunk-QAGGN5Z3.js";import"./chunk-5SMHXN7V.js";import{a as E}from"./chunk-YHPDSTAQ.js";import{r as D}from"./chunk-Z7M3UY5F.js";import{K as T,V,Y as z}from"./chunk-YPXCCQSY.js";import{Ca as x,Ib as _,Jb as y,Nb as d,Ob as n,Pb as o,Qb as u,Ub as C,Zb as g,_b as v,fb as s,ic as b,ka as h,mc as a,pc as S,ra as c,sa as p,sb as w,vc as k}from"./chunk-EMWOS5UK.js";var N=()=>["guid"];function j(i,e){if(i&1&&(n(0,"span"),a(1),o()),i&2){let f;v();let t=b(12);s(),S("(",(f=t.source())==null?null:f.length,"x",t.displayedColumns.length,")")}}var Z=(()=>{let e=class e{constructor(){this.dialog=h(F),this.data=x([])}ngOnInit(){I.generator(1e3,40).then(l=>{this.data.set(l)})}ngAfterViewInit(){E()}showSample(){this.dialog.open(O,{data:{title:"Overview resizable table",description:"",code:`
<ngx-table-builder [source]="data">
    <!--
       <ngx-options /> - declaration common options for columns

       Also you can customize your columns manually
       <ngx-column key="myKey" [resizable]="true">...</ngx-column>
    -->
    <ngx-options is-draggable is-resizable />
</ngx-table-builder>

                `}})}updatedSchema(t){console.log(t)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=w({type:e,selectors:[["sample-five"]],decls:15,vars:7,consts:[["table",""],[1,"simple-toolbar"],["mat-raised-button","","type","button",1,"show-simple",3,"click"],[3,"schemaChanges","exclude-keys","row-height","source","vertical-border"],["is-draggable","","is-resizable","",3,"nowrap"],["important-template","","key","id","sticky","","width","80"]],template:function(r,l){if(r&1){let m=C();n(0,"mat-toolbar",1)(1,"span"),a(2," Example resizing "),_(3,j,2,2,"span"),o(),n(4,"button",2),g("click",function(){return c(m),p(l.showSample())}),a(5," show code sample "),o()(),n(6,"b"),a(7,"Default col width"),o(),a(8,`
: 150px
`),u(9,"br")(10,"br"),n(11,"ngx-table-builder",3,0),g("schemaChanges",function(B){return c(m),p(l.updatedSchema(B))}),u(13,"ngx-options",4)(14,"ngx-column",5),o()}if(r&2){let m=b(12);s(3),y(m.isRendered?3:-1),s(8),d("exclude-keys",k(6,N))("row-height",55)("source",l.data())("vertical-border",!1),s(2),d("nowrap",!1)}},dependencies:[M,D,T,V,z],encapsulation:2,changeDetection:0});let i=e;return i})();export{Z as default};
