import{a as j}from"./axios-CCb-kr4I.js";import{u as O}from"./wishlist-CHAUTJtn.js";import{_ as J,r as v,d as S,e as B,m as Q,w as X,o as r,c as g,a as u,F as T,f as z,p as M,t as P,b,q as Y,l as Z,s as A,u as $,j as K,v as f,x as L,i as N}from"./index-CQpPS9Ti.js";import{g as ee}from"./URL-DyqB0Dbf.js";import{M as te}from"./MovieInfiniteScroll-BZGwKjqC.js";const oe={name:"MovieGrid",props:{fetchUrl:{type:String,required:!0}},setup(w){const o=v([]),a=v(1),e=v(null),c=v(4),n=v(20),t=v(window.innerWidth<=768);v("grid");let d=null;const{wishlist:s,loadWishlist:k,toggleWishlist:W,isInWishlist:G}=O(),E=async()=>{try{const m=Math.ceil(6);let h=[];for(let l=1;l<=m;l++){const p=await j.get(w.fetchUrl,{params:{page:l,per_page:n}});h=[...h,...p.data.results]}o.value=h.slice(0,120)}catch(i){console.error("Error fetching movies:",i)}},R=i=>`https://image.tmdb.org/t/p/w300${i}`,x=()=>{if(e.value){const i=e.value.offsetWidth,m=window.innerHeight-e.value.offsetTop,h=t.value?90:200,l=t.value?150:220,p=t.value?10:15,y=-10;c.value=Math.floor(i/(h+p));const _=Math.floor(m/(l+y));n.value=c.value*_}},F=S(()=>{const i=(a.value-1)*n.value,m=i+n.value;return o.value.slice(i,m).reduce((l,p,y)=>{const _=Math.floor(y/c.value);return l[_]||(l[_]=[]),l[_].push(p),l},[])}),C=S(()=>Math.ceil(o.value.length/n.value)),H=()=>{a.value<C.value&&a.value++},q=()=>{a.value>1&&a.value--},I=()=>{t.value=window.innerWidth<=768,x()},D=i=>{U(),d=setTimeout(()=>{W(i)},2e3)},U=()=>{d&&(clearTimeout(d),d=null)};return B(()=>{E(),x(),k(),window.addEventListener("resize",I)}),Q(()=>{window.removeEventListener("resize",I)}),X([c,n],()=>{a.value=1}),{visibleMovieGroups:F,currentPage:a,totalPages:C,getImageUrl:R,nextPage:H,prevPage:q,gridContainer:e,rowSize:c,startWishlistTimer:D,clearWishlistTimer:U,toggleWishlist:W,isInWishlist:G}}},se={class:"movie-grid",ref:"gridContainer"},ae=["onMouseup"],ie=["src","alt"],ne={class:"movie-title"},le={key:0,class:"wishlist-indicator"},re={key:0,class:"pagination"},ce=["disabled"],de=["disabled"];function ue(w,o,a,e,c,n){return r(),g("div",se,[u("div",{class:M(["grid-container",w.currentView])},[(r(!0),g(T,null,z(e.visibleMovieGroups,(t,d)=>(r(),g("div",{key:d,class:M(["movie-row",{full:t.length===e.rowSize}])},[(r(!0),g(T,null,z(t,s=>(r(),g("div",{key:s.id,class:"movie-card",onMouseup:k=>e.toggleWishlist(s)},[u("img",{src:e.getImageUrl(s.poster_path),alt:s.title},null,8,ie),u("div",ne,P(s.title),1),e.isInWishlist(s.id)?(r(),g("div",le,"👍")):b("",!0)],40,ae))),128))],2))),128))],2),e.totalPages>1?(r(),g("div",re,[u("button",{onClick:o[0]||(o[0]=(...t)=>e.prevPage&&e.prevPage(...t)),disabled:e.currentPage===1},"< 이전",8,ce),u("span",null,P(e.currentPage)+" / "+P(e.totalPages),1),u("button",{onClick:o[1]||(o[1]=(...t)=>e.nextPage&&e.nextPage(...t)),disabled:e.currentPage===e.totalPages},"다음 >",8,de)])):b("",!0)],512)}const ve=J(oe,[["render",ue],["__scopeId","data-v-acab3a9b"]]),ge={class:"popular-container"},he={class:"view-toggle"},V="",Me=Y({__name:"home-popular",setup(w){Z.add(A,$);const o=localStorage.getItem("TMDb-Key")||"",a=ee(o),e=v("grid"),c=d=>{e.value=d},n=()=>{document.body.style.overflow="hidden"},t=()=>{document.body.style.overflow="auto"};return B(()=>{n()}),(d,s)=>(r(),g("div",ge,[u("div",he,[u("button",{onClick:s[0]||(s[0]=()=>{c("grid"),n()}),class:M({active:e.value==="grid"})},[K(f(N),{icon:["fas","th"]})],2),u("button",{onClick:s[1]||(s[1]=()=>{c("list"),t()}),class:M({active:e.value==="list"})},[K(f(N),{icon:["fas","bars"]})],2)]),e.value==="grid"?(r(),L(ve,{key:0,title:"인기 영화",fetchUrl:f(a),apiKey:f(o),genreCode:V},null,8,["fetchUrl","apiKey"])):b("",!0),e.value==="list"?(r(),L(te,{key:1,title:"인기 영화",fetchUrl:f(a),apiKey:f(o),genreCode:V},null,8,["fetchUrl","apiKey"])):b("",!0)]))}});export{Me as default};