const links={
 youtube:'https://www.youtube.com/@galindogamerbr',
 twitch:'https://www.twitch.tv/galindogamerbr',
 kick:'https://kick.com/galindogamerbr',
 tiktok:'https://www.tiktok.com/@galindogamerbr',
 instagram:'https://www.instagram.com/galindogamerbr',
 discord:'https://discord.com/invite/JggtZ7qGY3',
 livepix:'https://livepix.gg/galindogamerbr',
 mods:'https://modsync.phmoreira.dev/',
 seguidores:'https://chat.whatsapp.com/JM27GGiEFzRFtUyuc8wUdk',
 vip:'https://chat.whatsapp.com/JpsiqErWdAx3pHqvVSbp7R'
};

document.addEventListener('DOMContentLoaded',()=>{
 const menuBtn=document.querySelector('.menu'), menu=document.querySelector('.mobile-menu');
 if(menuBtn&&menu) menuBtn.addEventListener('click',()=>menu.classList.toggle('open'));
 document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu?.classList.remove('open')));

 const items=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){
   const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
   items.forEach(el=>io.observe(el));
 }else items.forEach(el=>el.classList.add('visible'));

 const sections=document.querySelectorAll('section[id]');
 const navLinks=document.querySelectorAll('.links a');
 if('IntersectionObserver' in window&&sections.length){
   const navObs=new IntersectionObserver(entries=>entries.forEach(e=>{
     if(!e.isIntersecting)return;
     navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
   }),{rootMargin:'-42% 0px -50% 0px'});
   sections.forEach(s=>navObs.observe(s));
 }

 // Alternância Semana A / Semana B, usada na home e na página completa.
 document.querySelectorAll('[data-schedule-tab]').forEach(tab=>{
   tab.addEventListener('click',()=>{
     const target=tab.dataset.scheduleTab;
     const scope=tab.closest('.schedule') || tab.closest('section') || document;
     scope.querySelectorAll('[data-schedule-tab]').forEach(t=>t.classList.toggle('active',t===tab));
     scope.querySelectorAll('[data-schedule-panel]').forEach(panel=>panel.classList.toggle('active',panel.dataset.schedulePanel===target));
   });
 });

 const form=document.querySelector('#newsletter');
 if(form) form.addEventListener('submit',e=>{
   e.preventDefault();
   const email=form.querySelector('input').value.trim();
   if(!email)return;
   localStorage.setItem('galindo_newsletter',email);
   form.innerHTML='<strong style="color:var(--gold)">Cadastro recebido. Obrigado por acompanhar o GalindoGamerBR!</strong>';
 });

 // Pequeno efeito de brilho seguindo o mouse nas áreas principais.
 document.querySelectorAll('.game,.hub,.partner-panel,.vip,.social-showcase,.schedule-card').forEach(card=>{
   card.addEventListener('pointermove',e=>{
     const r=card.getBoundingClientRect();
     card.style.setProperty('--mx',`${e.clientX-r.left}px`);
     card.style.setProperty('--my',`${e.clientY-r.top}px`);
   });
 });
});
