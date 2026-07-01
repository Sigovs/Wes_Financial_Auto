/* index3 — nav */
(function () {
  'use strict';

  /* keep --nav-h in sync so the hero fits exactly under the nav on any screen */
  var nav = document.getElementById('site-nav');
  function setNavH() {
    if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  setNavH();
  window.addEventListener('resize', setNavH);
  window.addEventListener('load', setNavH);

  /* transparent header over the hero -> solid once scrolled */
  function onScroll() {
    if (nav) nav.classList.toggle('solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* mobile menu toggle */
  var toggle = document.querySelector('.nav3__toggle');
  var menu = document.getElementById('nav3-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

/* index3 — The Collection: full-bleed infinite rail (drag / scroll / arrows, loops seamlessly) */
(function collection() {
  'use strict';
  var rail = document.querySelector('.inv3-rail');
  if (!rail) return;
  var track = rail.querySelector('.inv3-track');
  var originals = Array.prototype.slice.call(track.children);
  if (originals.length < 2) return;

  var SETS_SIDE = 2;   // clone 2 sets each side -> 5 identical sets, seamless loop
  function mkClone(li) {
    var c = li.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    c.classList.add('is-clone');
    var a = c.querySelector('a'); if (a) a.tabIndex = -1;
    return c;
  }
  for (var s = 0; s < SETS_SIDE; s++) {
    var pre = document.createDocumentFragment(), post = document.createDocumentFragment();
    originals.forEach(function (li) { pre.appendChild(mkClone(li)); post.appendChild(mkClone(li)); });
    track.appendChild(post);
    track.insertBefore(pre, track.firstChild);
  }

  var unit = 0, step = 0, peek = 0;
  function measure() {
    unit = track.scrollWidth / (SETS_SIDE * 2 + 1);
    step = unit / originals.length;
    peek = step * 0.2;
  }
  function recenter() { rail.scrollLeft = unit * SETS_SIDE - peek; }
  function wrap() {
    if (!unit) return;
    if (rail.scrollLeft < unit * (SETS_SIDE - 0.5)) rail.scrollLeft += unit;
    else if (rail.scrollLeft > unit * (SETS_SIDE + 0.5)) rail.scrollLeft -= unit;
  }

  measure(); recenter();
  rail.addEventListener('scroll', wrap, { passive: true });
  window.addEventListener('resize', function () { measure(); recenter(); });
  window.addEventListener('load', function () { measure(); recenter(); });

  /* inertia glide (shared by drag release) */
  var vx = 0, glideId = null;
  function glideStop() { if (glideId) { cancelAnimationFrame(glideId); glideId = null; } }
  function glide() {
    if (Math.abs(vx) < 0.35) { glideId = null; return; }
    rail.scrollLeft -= vx;
    vx *= 0.94;                     // friction
    glideId = requestAnimationFrame(glide);
  }

  var prev = document.querySelector('.inv3 [data-prev]');
  var next = document.querySelector('.inv3 [data-next]');
  function page(dir) { glideStop(); rail.scrollBy({ left: dir * step, behavior: 'smooth' }); }
  if (prev) prev.addEventListener('click', function () { page(-1); });
  if (next) next.addEventListener('click', function () { page(1); });
  rail.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { page(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { page(-1); e.preventDefault(); }
  });

  /* mouse drag with inertia (touch & trackpad use native momentum scroll) */
  var down = false, moved = false, lastX = 0, startX = 0;
  rail.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;   // mouse only
    glideStop();
    down = true; moved = false; vx = 0; lastX = startX = e.clientX;
    rail.classList.add('dragging');
    try { rail.setPointerCapture(e.pointerId); } catch (err) {}
  });
  rail.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - lastX;
    lastX = e.clientX;
    rail.scrollLeft -= dx;
    vx = vx * 0.7 + dx * 0.3;                                  // smoothed velocity
    if (Math.abs(e.clientX - startX) > 4) moved = true;
  });
  function release() {
    if (!down) return;
    down = false; rail.classList.remove('dragging');
    if (Math.abs(vx) > 0.8) { glideStop(); glideId = requestAnimationFrame(glide); }  // fling
  }
  rail.addEventListener('pointerup', release);
  rail.addEventListener('pointercancel', release);
  rail.addEventListener('lostpointercapture', release);
  rail.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
  /* a fresh wheel/touch scroll should cancel any running glide */
  rail.addEventListener('wheel', glideStop, { passive: true });
})();

/* index3 — feature photos: pointer-following 3D tilt on hover (deck + depth slices) */
(function tilt() {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var medias = Array.prototype.slice.call(document.querySelectorAll('.feat3__media'));
  var TILT = 9;   // degrees either side

  medias.forEach(function (m) {
    var deck = m.querySelector('.feat3__deck');
    if (!deck) return;
    m.addEventListener('pointermove', function (e) {
      if (reduce.matches) return;
      var r = m.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      var rotY = Math.max(-1, Math.min(1, dx)) * TILT;
      var rotX = -Math.max(-1, Math.min(1, dy)) * TILT;
      deck.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
    });
    m.addEventListener('pointerleave', function () { deck.style.transform = ''; });
  });
})();

/* index3 — staircase slide-in reveal for titles (.r-step groups) */
(function reveals() {
  'use strict';
  var steps = Array.prototype.slice.call(document.querySelectorAll('.r-step'));
  if (!steps.length) return;
  if (!('IntersectionObserver' in window)) { steps.forEach(function (s) { s.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  steps.forEach(function (s) { io.observe(s); });
})();

/* index3 — scroll parallax on [data-parallax] media (skipped for reduced motion) */
(function parallax() {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!layers.length) return;
  var ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var host = el.parentElement;                 // measure the section, not the oversized media
      var rect = host.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
      var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', update);
  update();
})();
