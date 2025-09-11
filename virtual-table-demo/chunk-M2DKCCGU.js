import{a as j}from"./chunk-OYNQ5WAV.js";import{a as z}from"./chunk-YFW3QQN3.js";import"./chunk-YS25ZLIA.js";import{c as K}from"./chunk-VP7U7VFG.js";import{a as O}from"./chunk-5W42VNXU.js";import"./chunk-CPBGOJHF.js";import{b as F}from"./chunk-4VS2STHW.js";import"./chunk-RHX3XEC6.js";import"./chunk-QAGGN5Z3.js";import"./chunk-HZPZNH2T.js";import"./chunk-5SMHXN7V.js";import{a as B}from"./chunk-YHPDSTAQ.js";import{r as D}from"./chunk-Z7M3UY5F.js";import{I as E,J as A,K as N,Y as $}from"./chunk-YPXCCQSY.js";import{Ca as x,Ib as C,Jb as w,Kb as T,Lb as S,Mb as v,Nb as u,Ob as a,Pb as r,Qb as M,Ub as b,Zb as h,_b as p,fb as s,ic as c,ka as f,mc as _,oc as V,pc as I,ra as d,sa as g,sb as k,yb as y}from"./chunk-EMWOS5UK.js";function J(e,n){if(e&1&&(a(0,"span"),_(1),r()),e&2){let t;p();let i=c(9);s(),I("(",(t=i.source())==null?null:t.length,"x",i.displayedColumns.length,")")}}function P(e,n){if(e&1){let t=b();a(0,"mat-checkbox",9),h("change",function(){d(t);let o=p(),l=c(9);return g(l.selection.toggleAll(o.data()))}),r()}if(e&2){p();let t=c(9);u("checked",t.selectionModel.isAll)("indeterminate",t.selectionModel.isIndeterminate)}}function R(e,n){if(e&1){let t=b();a(0,"mat-checkbox",10),h("change",function(){let o=d(t).$implicit;p();let l=c(9);return g(l.selection.toggle(o))}),r()}if(e&2){let t=n.$implicit;p();let i=c(9);u("checked",i.selectionModel.get(t.id))}}function q(e,n){if(e&1&&M(0,"ngx-column",8),e&2){let t=n.$implicit;u("key",t)}}var re=(()=>{let n=class n{constructor(){this.dialog=f(K),this.data=x([])}ngOnInit(){O.generator(1e3,59).then(l=>{this.data.set(l)})}disableFn(i){return(i?.id??0)%5===0}ngAfterViewInit(){B()}showSample(){this.dialog.open(j,{data:{title:"Overview selection table",description:"In order to use the API for string highlighting, you can use the table.selection service. <br>In more detail you can read in the guide.",code:`
<ngx-table-builder #table [source]="data" enable-selection>
    <ngx-column key="selection" sticky width="55" custom-key>
        <ng-template ngx-th>
            <mat-checkbox
                (change)="table.selection.toggleAll(data)"
                [indeterminate]="table.selectionModel.isIndeterminate"
                [checked]="table.selectionModel.isAll"
            ></mat-checkbox>
        </ng-template>
        <ng-template ngx-td row let-row (onClick)="$event.preventDefault()">
            <mat-checkbox
                [checked]="table.selectionModel.get($any(row).id)"
                (change)="table.selection.toggle(row)"
            ></mat-checkbox>
        </ng-template>
    </ngx-column>

    @for (key of table.modelColumnKeys; track key) {
        <ngx-column [key]="key">
        <!--
            If you want to parameterize your templates, you can describe the code here.
            <ng-template ngx-th>{{ key }}</ng-template>
            <ng-template ngx-td let-cell>{{ cell }}</ng-template>
       -->
        </ngx-column>
    }
</ngx-table-builder>
                    `}})}};n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=k({type:n,selectors:[["sample-third"]],decls:15,vars:4,consts:[["table",""],[1,"simple-toolbar"],[2,"margin-left","5px"],["mat-raised-button","","type","button",1,"show-simple",3,"click"],["enable-selection","",3,"produce-disable-fn","source"],["custom-key","","key","selection","sticky","","width","55"],["ngx-th",""],["ngx-td","","row","",3,"onClick"],[3,"key"],[3,"change","checked","indeterminate"],[3,"change","checked"]],template:function(o,l){if(o&1){let m=b();a(0,"mat-toolbar",1)(1,"span"),_(2," Example selection "),C(3,J,2,2,"span"),a(4,"span",2),_(5),r()(),a(6,"button",3),h("click",function(){return d(m),g(l.showSample())}),_(7," show code sample "),r()(),a(8,"ngx-table-builder",4,0)(10,"ngx-column",5),y(11,P,1,2,"ng-template",6)(12,R,1,1,"ng-template",7),h("onClick",function(H){return d(m),g(H.preventDefault())}),r(),S(13,q,1,1,"ngx-column",8,T),r()}if(o&2){let m=c(9);s(3),w(m.isRendered?3:-1),s(2),V("Selected: ",m.selection.selectionModel.size),s(3),u("produce-disable-fn",l.disableFn)("source",l.data()),s(5),v(m.modelColumnKeys)}},dependencies:[F,z,D,N,$,E,A],encapsulation:2,changeDetection:0});let e=n;return e})();export{re as default};
