(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Entrada suave das seções ao rolar.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('visible'));
  }

  // Menu mobile.
  const menu = $('.menu');
  const mobileMenu = $('.mobile-menu');
  if (menu && mobileMenu) {
    menu.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    $$('.mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Abas da programação.
  $$('.schedule-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.scheduleTab;
      $$('.schedule-tab').forEach(t => t.classList.toggle('active', t === tab));
      $$('.schedule-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.schedulePanel === id));
    });
  });

  // Pequeno efeito de profundidade nos cards, sem exagero.
  const canTilt = window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canTilt) {
    $$('.game, .platform-card, .stat, .live-card-art').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty('--rx', `${(-y * 2.2).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 2.2).toFixed(2)}deg`);
        card.classList.add('tilting');
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('tilting');
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      });
    });
  }

  // Remove emojis do título vindo do YouTube (ex.: "👨‍🌾 Fazenda Nova Aliança #201👨‍🌾").
  const stripEmoji = (s) => s
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Atualiza a área da última live. O GitHub Actions mantém latest-live.json atualizado.
  async function loadLatestLive() {
    const box = $('[data-latest-live]');
    if (!box) return;
    try {
      const res = await fetch(`latest-live.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('latest-live.json indisponível');
      const data = await res.json();
      if (!data || !data.videoId) return;

      const cleanTitle = data.title ? stripEmoji(data.title) : '';

      const title = $('[data-live-title]', box);
      const link = $('[data-live-link]', box);
      if (title) title.textContent = cleanTitle || 'Última live do GalindoGamerBR';
      if (link) {
        link.href = data.url || `https://www.youtube.com/watch?v=${encodeURIComponent(data.videoId)}`;
      }
      box.classList.add('loaded');

      const embed = $('[data-live-embed]');
      if (embed) {
        embed.src = `https://www.youtube.com/embed/${encodeURIComponent(data.videoId)}?autoplay=0`;
      }
    } catch (err) {
      // Mantém o card estático como fallback se o arquivo ainda não tiver sido gerado.
      box.classList.add('fallback');
    }
  }
  loadLatestLive();
})();
