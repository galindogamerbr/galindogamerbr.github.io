const links={
 youtube:'https://www.youtube.com/@galindogamerbr', twitch:'https://www.twitch.tv/galindogamerbr', kick:'https://kick.com/galindogamerbr', tiktok:'https://www.tiktok.com/@galindogamerbr', instagram:'https://www.instagram.com/galindogamerbr', discord:'https://discord.com/invite/JggtZ7qGY3', livepix:'https://livepix.gg/galindogamerbr', mods:'https://modsync.phmoreira.dev/', seguidores:'https://chat.whatsapp.com/JM27GGiEFzRFtUyuc8wUdk', vip:'https://chat.whatsapp.com/JpsiqErWdAx3pHqvVSbp7R'
};
function openExternal(url){window.open(url,'_blank','noopener,noreferrer')}
document.addEventListener('DOMContentLoaded',()=>{
 const menuBtn=document.querySelector('.menu'); const menu=document.querySelector('.mobile-menu');
 if(menuBtn) menuBtn.addEventListener('click',()=>menu.classList.toggle('open'));
 document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
 const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}}),{rootMargin:'-40% 0px -55% 0px'});
 document.querySelectorAll('section[id]').forEach(s=>obs.observe(s));
 const form=document.querySelector('#newsletter'); if(form) form.addEventListener('submit',e=>{e.preventDefault();const email=form.querySelector('input').value.trim(); if(!email)return; localStorage.setItem('galindo_newsletter',email); form.innerHTML='<strong style="color:var(--gold)">Cadastro recebido. Obrigado por acompanhar o GalindoGamerBR!</strong>';});
});
