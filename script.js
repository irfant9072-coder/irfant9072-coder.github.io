window.addEventListener("load",()=>setTimeout(()=>document.documentElement.classList.add("loaded"),350));

const light=document.querySelector(".mouse-light");
const ptr=document.querySelector(".pointer");
const hero=document.querySelector(".hero");
const portrait=document.querySelector(".portrait");
const bg=document.querySelector(".hero-bg");

let mx=innerWidth/2,my=innerHeight/2,px=mx,py=my,lx=mx,ly=my,tx=0,ty=0;
const fine=matchMedia("(pointer:fine)").matches;

if(fine){
  document.documentElement.classList.add("cursor-active");

  document.addEventListener("mousemove",e=>{
    mx=e.clientX; my=e.clientY;
    tx=(e.clientX-innerWidth/2)/innerWidth;
    ty=(e.clientY-innerHeight/2)/innerHeight;
  });

  function frame(){
    px += (mx-px)*.16;
    py += (my-py)*.16;
    lx += (mx-lx)*.07;
    ly += (my-ly)*.07;

    ptr.style.left=px+"px";
    ptr.style.top=py+"px";
    light.style.left=lx+"px";
    light.style.top=ly+"px";

    // Very subtle environmental parallax.
    if(bg){
      bg.style.transform=`translate3d(${tx*-7}px,${ty*-4}px,0)`;
    }

    requestAnimationFrame(frame);
  }
  frame();

  const interactive=document.querySelectorAll("a,button,.skill-grid article,.portrait");
  interactive.forEach(el=>{
    el.addEventListener("mouseenter",()=>document.documentElement.classList.add("cursor-hover"));
    el.addEventListener("mouseleave",()=>document.documentElement.classList.remove("cursor-hover"));
  });

  hero?.addEventListener("mousemove",e=>{
    const r=hero.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    if(portrait){
      portrait.style.transform=`rotate(1deg) rotateY(${x*5}deg) rotateX(${-y*4}deg) translate3d(${x*3}px,${y*2}px,0)`;
    }
  });
  hero?.addEventListener("mouseleave",()=>{
    if(portrait) portrait.style.transform="rotate(2deg)";
  });
}

const h=document.querySelector(".hamb"),d=document.querySelector(".drawer");
h?.addEventListener("click",()=>d.classList.toggle("open"));
d?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>d.classList.remove("open")));
