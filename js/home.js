/* =====================================================================
   WES FINANCIAL AUTO — HOME interactions
   Progressive enhancement: nothing here is required to read the page.
   All motion respects prefers-reduced-motion.
   ===================================================================== */
(function () {
  'use strict';

  // mark JS active so .reveal / .clip-reveal can safely start hidden
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- sticky nav: solid glass on scroll ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScrollNav = function () {
      nav.classList.toggle('solid', window.scrollY > 24);
    };
    onScrollNav();
    window.addEventListener('scroll', onScrollNav, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- scroll reveals (IntersectionObserver) ---------- */
  (function reveals() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- subtle parallax (hero + visual break) ---------- */
  (function parallax() {
    if (reduceMotion.matches) return;          // skip entirely under reduced motion
    var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!layers.length) return;
    var ticking = false;

    function update() {
      ticking = false;
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
    }
    function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  })();
})();
