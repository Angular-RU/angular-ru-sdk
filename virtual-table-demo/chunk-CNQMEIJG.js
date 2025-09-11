import{a as S}from"./chunk-OYNQ5WAV.js";import{c as C}from"./chunk-VP7U7VFG.js";import{a as E}from"./chunk-5W42VNXU.js";import"./chunk-CPBGOJHF.js";import{b as y}from"./chunk-4VS2STHW.js";import"./chunk-RHX3XEC6.js";import"./chunk-QAGGN5Z3.js";import"./chunk-5SMHXN7V.js";import"./chunk-YHPDSTAQ.js";import{r as h}from"./chunk-Z7M3UY5F.js";import{Q as b,V as x,W as f,Y as w}from"./chunk-YPXCCQSY.js";import{Ca as m,Nb as g,Ob as s,Pb as t,Qb as d,Zb as u,fb as c,ka as r,mc as n,sb as p}from"./chunk-EMWOS5UK.js";var I=(()=>{let e=class e{constructor(){this.dialog=r(C),this.data=m([]),this.rowCssClasses={1:["highlight"],3:["highlight"]}}ngOnInit(){E.generator(50,5).then(i=>{this.data.set(i)})}showSample(){this.dialog.open(S,{data:{title:"Overview sortable table",description:"",code:`
<ngx-table-builder
    [source]="data"
    [row-css-classes]="rowCssClasses"
    primary-key="id"
>
    <!-- rowCssClasses === { 1: ['highlight'], 3: ['highlight'] } -->
    <ngx-empty>No data</ngx-empty>
    <ngx-source-null>Loading</ngx-source-null>
    <ngx-options is-sortable></ngx-options>
</ngx-table-builder>
                `}})}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=p({type:e,selectors:[["sample-eighteen"]],decls:11,vars:2,consts:[[1,"simple-toolbar"],["mat-raised-button","","type","button",1,"show-simple",3,"click"],["primary-key","id",3,"row-css-classes","source"],["is-sortable",""]],template:function(o,i){o&1&&(s(0,"mat-toolbar",0)(1,"span"),n(2,"Example cell css classes"),t(),s(3,"button",1),u("click",function(){return i.showSample()}),n(4," show code sample "),t()(),s(5,"ngx-table-builder",2)(6,"ngx-empty"),n(7,"No data"),t(),s(8,"ngx-source-null"),n(9,"Loading"),t(),d(10,"ngx-options",3),t()),o&2&&(c(5),g("row-css-classes",i.rowCssClasses)("source",i.data()))},dependencies:[y,h,b,x,f,w],styles:[`.highlight{background:#90ee90}
`],encapsulation:2,changeDetection:0});let a=e;return a})();export{I as default};
