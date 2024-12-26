import{_ as U,o as u,c as h,a as s,t as _,n as p,b as L,r,d as S,e as F,w as z,F as T,f as N,g as V,l as j,h as Y,i as G,j as H,k as g,m as E}from"./index-vy3ybcVg.js";import{u as O}from"./wishlist-BOYOVTEl.js";import{g as P,a as J,b as Q,f as Z}from"./URL-YXE4ujl1.js";const $={name:"BannerComponent",props:{movie:{type:Object,required:!0}},computed:{backdropUrl(){return console.log(this.movie),this.movie?`https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`:""}}},ee={class:"banner-content"};function te(i,t,a,e,l,c){return a.movie?(u(),h("div",{key:0,class:"banner",style:p({backgroundImage:`url(${c.backdropUrl})`})},[s("div",ee,[s("h1",null,_(a.movie.title),1),s("p",null,_(a.movie.overview),1),t[0]||(t[0]=s("button",{class:"play-btn title-btn"},"재생",-1)),t[1]||(t[1]=s("button",{class:"info-btn title-btn"},"상세 정보",-1))])],4)):L("",!0)}const oe=U($,[["render",te],["__scopeId","data-v-4241ddb4"]]),ne={name:"MovieRow",props:{title:{type:String,required:!0},fetchUrl:{type:String,required:!0}},setup(i){const t=r([]),a=r(null),e=r(null),l=r(0),c=r(!1),o=r(!1),d=r(0),M=r(0),{wishlist:fe,toggleWishlist:k,isInWishlist:W}=O(),y=()=>a.value&&e.value?Math.max(0,a.value.scrollWidth-e.value.clientWidth):0,v=r(y()),R=S(()=>l.value<=0),x=S(()=>l.value>=v.value),I=async()=>{try{const n=await V.get(i.fetchUrl);t.value=n.data.results,console.log(t)}catch(n){console.error("Error fetching movies:",n)}},B=n=>`https://image.tmdb.org/t/p/w300${n}`,w=(n,m=null)=>{const f=m||e.value.clientWidth*.8;n==="left"?l.value=Math.max(0,l.value-f):l.value=Math.min(v.value,l.value+f)},C=()=>{c.value=!0},D=()=>{c.value=!1},K=n=>{if(n.preventDefault(),o.value)return;o.value=!0;const m=n.deltaY>0?"right":"left";w(m),setTimeout(()=>{o.value=!1},500)},X=n=>{d.value=n.touches[0].clientX,M.value=n.touches[0].clientX},q=n=>{M.value=n.touches[0].clientX},A=()=>{const n=d.value-M.value;if(Math.abs(n)>50){const f=n>0?"right":"left";w(f,Math.abs(n))}},b=()=>{v.value=y(),l.value=Math.min(l.value,v.value)};return F(()=>{I(),window.addEventListener("resize",b),b()}),z(t,()=>{setTimeout(b,0)}),{movies:t,slider:a,sliderWindow:e,scrollAmount:l,maxScroll:v,atLeftEdge:R,atRightEdge:x,showButtons:c,getImageUrl:B,slide:w,handleMouseMove:C,handleMouseLeave:D,handleWheel:K,handleTouchStart:X,handleTouchMove:q,handleTouchEnd:A,toggleWishlist:k,isInWishlist:W}}},le={class:"movie-row"},se=["disabled"],ae={class:"slider-window",ref:"sliderWindow"},ie=["onClick"],re=["src","alt"],ce={key:0,class:"wishlist-indicator"},de=["disabled"];function ue(i,t,a,e,l,c){return u(),h("div",le,[s("h2",null,_(a.title),1),s("div",{class:"slider-container",onWheel:t[2]||(t[2]=(...o)=>e.handleWheel&&e.handleWheel(...o)),onTouchstart:t[3]||(t[3]=(...o)=>e.handleTouchStart&&e.handleTouchStart(...o)),onTouchmove:t[4]||(t[4]=(...o)=>e.handleTouchMove&&e.handleTouchMove(...o)),onTouchend:t[5]||(t[5]=(...o)=>e.handleTouchEnd&&e.handleTouchEnd(...o)),onMousemove:t[6]||(t[6]=(...o)=>e.handleMouseMove&&e.handleMouseMove(...o)),onMouseleave:t[7]||(t[7]=(...o)=>e.handleMouseLeave&&e.handleMouseLeave(...o))},[s("button",{class:"slider-button left",onClick:t[0]||(t[0]=o=>e.slide("left")),style:p({opacity:e.showButtons&&!e.atLeftEdge?1:0}),disabled:e.atLeftEdge},"<",12,se),s("div",ae,[s("div",{class:"movie-slider",ref:"slider",style:p({transform:`translateX(${-e.scrollAmount}px)`})},[(u(!0),h(T,null,N(e.movies,o=>(u(),h("div",{key:o.id,class:"movie-card",onClick:d=>e.toggleWishlist(o)},[s("img",{src:e.getImageUrl(o.poster_path),alt:o.title},null,8,re),e.isInWishlist(o.id)?(u(),h("div",ce,"👍")):L("",!0)],8,ie))),128))],4)],512),s("button",{class:"slider-button right",onClick:t[1]||(t[1]=o=>e.slide("right")),style:p({opacity:e.showButtons&&!e.atRightEdge?1:0}),disabled:e.atRightEdge},">",12,de)],32)])}const he=U(ne,[["render",ue],["__scopeId","data-v-321b45fe"]]);j.add(Y,G);console.log("production");const ve={name:"Home",components:{BannerComponent:oe,MovieRow:he,FontAwesomeIcon:H},data(){return{apiKey:localStorage.getItem("TMDb-Key")||"",featuredMovie:null,popularMoviesUrl:"",newReleasesUrl:"",actionMoviesUrl:""}},created(){this.popularMoviesUrl=P(this.apiKey),this.newReleasesUrl=J(this.apiKey),this.actionMoviesUrl=Q(this.apiKey,"28"),Z(this.apiKey).then(i=>{this.featuredMovie=i})},methods:{handleScroll(){const i=document.querySelector(".app-header");window.scrollY>50?i.classList.add("scrolled"):i.classList.remove("scrolled")}},mounted(){window.addEventListener("scroll",this.handleScroll),setInterval(()=>{},1e3)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)}};function me(i,t,a,e,l,c){const o=E("BannerComponent"),d=E("movie-row");return u(),h(T,null,[g(o,{movie:l.featuredMovie},null,8,["movie"]),g(d,{title:"인기 영화",fetchUrl:l.popularMoviesUrl},null,8,["fetchUrl"]),g(d,{title:"최신 영화",fetchUrl:l.newReleasesUrl},null,8,["fetchUrl"]),g(d,{title:"액션 영화",fetchUrl:l.actionMoviesUrl},null,8,["fetchUrl"])],64)}const we=U(ve,[["render",me],["__scopeId","data-v-61f76f36"]]);export{we as default};
