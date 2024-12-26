import{u as S}from"./wishlist-6zuVsTNT.js";import{_ as U,r as v,d as p,e as V,p as F,w as G,o as i,c as r,a as c,F as x,f as z,q as I,t as P,b as y,s as N,y as R}from"./index-DOus_prH.js";const j={name:"MovieGrid",setup(){const n=v(null),t=v(4),o=v(20),e=v(1),u=v(window.innerWidth<=768);v("grid");const{wishlist:M,loadWishlist:s,toggleWishlist:_,isInWishlist:a}=S(),h=p(()=>M.value),B=l=>l?`https://image.tmdb.org/t/p/w300${l}`:"/placeholder-image.jpg",W=()=>{if(n.value){const l=n.value.offsetWidth,m=window.innerHeight-n.value.offsetTop,C=u.value?90:220,d=u.value?150:330,f=u.value?10:15,w=-10;t.value=Math.floor(l/(C+f));const g=Math.floor(m/(d+w));o.value=t.value*g}},L=p(()=>{const l=(e.value-1)*o.value,m=l+o.value;return h.value.slice(l,m).reduce((d,f,w)=>{const g=Math.floor(w/t.value);return d[g]||(d[g]=[]),d[g].push(f),d},[])}),b=p(()=>Math.ceil(h.value.length/o.value)),E=()=>{e.value<b.value&&e.value++},H=()=>{e.value>1&&e.value--},k=()=>{u.value=window.innerWidth<=768,W()};return V(()=>{s(),W(),window.addEventListener("resize",k)}),F(()=>{window.removeEventListener("resize",k)}),G([t,o],()=>{e.value=1}),{visibleWishlistMovies:L,wishlistMovies:h,currentPage:e,totalPages:b,getImageUrl:B,nextPage:E,prevPage:H,gridContainer:n,rowSize:t,toggleWishlist:_,isInWishlist:a}}},q={class:"movie-grid",ref:"gridContainer"},D=["onClick"],T=["src","alt"],J={class:"movie-title"},K={key:0,class:"empty-wishlist"},O={key:1,class:"pagination"},Q=["disabled"],X=["disabled"];function Y(n,t,o,e,u,M){return i(),r("div",q,[c("div",{class:I(["grid-container",n.currentView])},[(i(!0),r(x,null,z(e.visibleWishlistMovies,(s,_)=>(i(),r("div",{key:_,class:I(["movie-row",{full:s.length===e.rowSize}])},[(i(!0),r(x,null,z(s,a=>(i(),r("div",{key:a.id,class:"movie-card",onClick:h=>e.toggleWishlist(a)},[c("img",{src:e.getImageUrl(a.poster_path),alt:a.title},null,8,T),c("div",J,P(a.title),1),t[2]||(t[2]=c("div",{class:"wishlist-indicator"},"👍",-1))],8,D))),128))],2))),128))],2),e.wishlistMovies.length===0?(i(),r("div",K," 위시리스트가 비어 있습니다. ")):y("",!0),e.totalPages>1?(i(),r("div",O,[c("button",{onClick:t[0]||(t[0]=(...s)=>e.prevPage&&e.prevPage(...s)),disabled:e.currentPage===1},"< 이전",8,Q),c("span",null,P(e.currentPage)+" / "+P(e.totalPages),1),c("button",{onClick:t[1]||(t[1]=(...s)=>e.nextPage&&e.nextPage(...s)),disabled:e.currentPage===e.totalPages},"다음 >",8,X)])):y("",!0)],512)}const Z=U(j,[["render",Y],["__scopeId","data-v-170007c7"]]),ee=N({__name:"home-wishlist",setup(n){return(t,o)=>(i(),R(Z))}});export{ee as default};