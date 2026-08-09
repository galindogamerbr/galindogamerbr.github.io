document.addEventListener("DOMContentLoaded",()=>{
const menu=document.querySelector(".menu"),nav=document.querySelector(".navlinks");
if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open);});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));}
const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();
const top=document.getElementById("backTop"); if(top){window.addEventListener("scroll",()=>top.classList.toggle("show",window.scrollY>500));top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));}
const form=document.getElementById("newsletterForm"); if(form){form.addEventListener("submit",e=>{e.preventDefault();const btn=form.querySelector("button");btn.textContent="Em breve ✓";btn.disabled=true;});}
document.querySelectorAll("[data-modal]").forEach(b=>b.addEventListener("click",()=>{const m=document.getElementById(b.dataset.modal);if(m){m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");}}));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>{const m=document.getElementById(b.dataset.close);if(m){m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");}}));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m){m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");}}));
});