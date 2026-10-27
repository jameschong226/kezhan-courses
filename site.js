/* 课栈共用脚本：小工具、收藏、封面备援、背景极光、平滑滚动、跟随游标 */
(()=>{
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine=matchMedia("(hover: hover) and (pointer: fine)").matches;
const hasGsap=typeof gsap!=="undefined";
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const catVar=c=>`var(--cat-${Math.max(0,window.KZ_CATS.indexOf(c))})`;
const ph=t=>`<div class="cover-ph" aria-hidden="true"><b>${esc([...t][0]||"课")}</b><span>COVER</span></div>`;
const img=(c,cls="")=>c.cover
  ?`<img class="${cls}" src="${esc(c.cover)}" data-alt="${esc(c.cover2||"")}" data-t="${esc(c.title)}" alt="${esc(c.title)} 课程封面" referrerpolicy="no-referrer" draggable="false">`
  :ph(c.title);

let saved=new Set();
try{saved=new Set(JSON.parse(localStorage.getItem("kz-saved")||"[]"))}catch(e){}
const persist=()=>{try{localStorage.setItem("kz-saved",JSON.stringify([...saved]))}catch(e){}};
const syncSavedCount=()=>document.querySelectorAll("[data-saved-n]").forEach(n=>n.textContent=saved.size);

// 封面载入失败：先换备用封面，再不行就显示文字封面
document.addEventListener("error",e=>{
  const im=e.target;
  if(!(im instanceof HTMLImageElement)||!im.dataset.t)return;
  if(im.dataset.alt&&!im.dataset.tried){im.dataset.tried="1";im.src=im.dataset.alt;return}
  im.outerHTML=ph(im.dataset.t);
},true);

window.KZ={reduce,fine,hasGsap,esc,catVar,ph,img,saved,persist,syncSavedCount,lenis:null};
document.addEventListener("DOMContentLoaded",syncSavedCount);

/* 平滑滚动 */
if(hasGsap&&!reduce&&typeof Lenis!=="undefined"){
  if(typeof ScrollTrigger!=="undefined")gsap.registerPlugin(ScrollTrigger);
  const lenis=new Lenis({lerp:.09,smoothWheel:true});
  if(typeof ScrollTrigger!=="undefined")lenis.on("scroll",ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
  window.KZ.lenis=lenis;
}
window.KZ.scrollTo=sel=>{const el=document.querySelector(sel);if(!el)return;
  window.KZ.lenis?window.KZ.lenis.scrollTo(el,{offset:-20,duration:1.4}):el.scrollIntoView({behavior:reduce?"auto":"smooth"})};

/* 跟随游标：带 data-cursor 的地方会变成文字圆圈 */
document.addEventListener("DOMContentLoaded",()=>{
  const ring=document.querySelector(".ring-cursor");
  if(!ring||!fine||reduce||!hasGsap)return;
  const label=ring.querySelector("span");
  const rx=gsap.quickTo(ring,"x",{duration:.45,ease:"power3"}),ry=gsap.quickTo(ring,"y",{duration:.45,ease:"power3"});
  addEventListener("pointermove",e=>{
    ring.classList.add("on");rx(e.clientX);ry(e.clientY);
    const t=e.target instanceof Element?e.target:null,big=t&&t.closest("[data-cursor]");
    if(big)label.textContent=big.dataset.cursor;
    ring.classList.toggle("big",!!big);
    ring.classList.toggle("link",!big&&!!(t&&t.closest("a,button,select,input")));
  });
  document.addEventListener("pointerleave",()=>ring.classList.remove("on"));
  // 按钮磁吸
  document.querySelectorAll("[data-magnet]").forEach(el=>{
    const xTo=gsap.quickTo(el,"x",{duration:.6,ease:"elastic.out(1,.4)"}),yTo=gsap.quickTo(el,"y",{duration:.6,ease:"elastic.out(1,.4)"});
    el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();xTo((e.clientX-r.left-r.width/2)*.35);yTo((e.clientY-r.top-r.height/2)*.45)});
    el.addEventListener("pointerleave",()=>{xTo(0);yTo(0)});
  });
});

/* 背景极光（WebGL） */
document.addEventListener("DOMContentLoaded",()=>{
  const cv=document.getElementById("aurora");if(!cv)return;
  const gl=cv.getContext("webgl",{premultipliedAlpha:false,antialias:false});
  if(!gl){cv.remove();return}
  const vs=`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const fs=`precision mediump float;uniform vec2 r;uniform float t;uniform vec3 a,b,c;uniform vec2 m;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,s=.5;for(int i=0;i<5;i++){v+=s*n(p);p=p*2.03+vec2(1.7,9.2);s*=.5;}return v;}
  void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.6;
    float k=t*.05;vec2 q=vec2(fbm(p+k),fbm(p-k+3.1));
    vec2 w=vec2(fbm(p+2.*q+vec2(1.7,9.2)+k*1.4),fbm(p+2.*q+vec2(8.3,2.8)-k));
    float f=fbm(p+2.6*w+(m-.5)*.6);
    vec3 col=mix(a,b,smoothstep(.2,.8,f));col=mix(col,c,smoothstep(.45,.95,w.x));
    gl_FragColor=vec4(col,smoothstep(.15,.95,f)*.95);}`;
  const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s};
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){cv.remove();return}
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  const U=k=>gl.getUniformLocation(pr,k),ur=U("r"),ut=U("t"),um=U("m"),cols=[U("a"),U("b"),U("c")];
  const hex=v=>{v=v.trim().replace("#","");return [0,2,4].map(i=>parseInt(v.slice(i,i+2),16)/255)};
  const setCols=()=>{const cs=getComputedStyle(document.documentElement);["--aura-1","--aura-2","--aura-3"].forEach((k,i)=>gl.uniform3fv(cols[i],hex(cs.getPropertyValue(k))))};
  let mx=.5,my=.5,tx=.5,ty=.5;
  const draw=now=>{mx+=(tx-mx)*.03;my+=(ty-my)*.03;gl.uniform1f(ut,now/1000);gl.uniform2f(um,mx,my);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)};
  const size=()=>{cv.width=Math.max(2,innerWidth*.5|0);cv.height=Math.max(2,innerHeight*.5|0);gl.viewport(0,0,cv.width,cv.height);gl.uniform2f(ur,cv.width,cv.height)};
  setCols();size();
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{setCols();draw(performance.now())});
  addEventListener("resize",()=>{size();if(reduce)draw(12000)});
  addEventListener("pointermove",e=>{tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight});
  if(reduce){draw(12000);return}
  const loop=now=>{draw(now);requestAnimationFrame(loop)};requestAnimationFrame(loop);
});
})();
