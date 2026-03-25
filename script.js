// Spectro — site interactions
(function () {
  'use strict';

  // 1. Nav blur on scroll
  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');
  if (nav && hero) {
    new IntersectionObserver(
      function (e) { nav.classList.toggle('scrolled', !e[0].isIntersecting); },
      { threshold: 0.05 }
    ).observe(hero);
  }

  // 2. Scroll-triggered animations
  var anims = document.querySelectorAll('[data-animate]');
  if (anims.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    anims.forEach(function (el) { obs.observe(el); });
  }

  // 3. Copy buttons on code editors
  document.querySelectorAll('.code-editor').forEach(function (ed) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');
    ed.appendChild(btn);
    btn.addEventListener('click', function () {
      var code = ed.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });

  // 4. Install bar copy
  document.querySelectorAll('.install-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        btn.classList.add('copied');
        var orig = btn.innerHTML;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
      });
    });
  });

  // 5. Tabbed code explorer
  var tabs = document.querySelectorAll('.ex-tab');
  var panels = document.querySelectorAll('.ex-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var t = tab.getAttribute('data-tab');
      tabs.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (x) { x.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var p = document.querySelector('[data-panel="' + t + '"]');
      if (p) { p.classList.add('active'); if (window.Prism) Prism.highlightAllUnder(p); }
    });
  });

  // 6. Prismatic border glow on feature cards
  document.querySelectorAll('.fcard').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width * 360) | 0;
      card.style.setProperty('--hue', x + 'deg');
    });
  });

  // 7. Mobile menu close on link click
  document.querySelectorAll('.nav-menu .nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      var d = link.closest('details');
      if (d) d.removeAttribute('open');
    });
  });
})();
