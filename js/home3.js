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

  var prev = document.querySelector('.inv3 [data-prev]');
  var next = document.querySelector('.inv3 [data-next]');
  function page(dir) { rail.scrollBy({ left: dir * step, behavior: 'smooth' }); }
  if (prev) prev.addEventListener('click', function () { page(-1); });
  if (next) next.addEventListener('click', function () { page(1); });
  rail.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { page(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { page(-1); e.preventDefault(); }
  });

  /* incremental drag (mid-drag wrap teleport is preserved) */
  var down = false, moved = false, lastX = 0, startX = 0;
  rail.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    down = true; moved = false; lastX = startX = e.clientX;
    try { rail.setPointerCapture(e.pointerId); } catch (err) {}
  });
  rail.addEventListener('pointermove', function (e) {
    if (!down) return;
    rail.scrollLeft -= (e.clientX - lastX);
    lastX = e.clientX;
    if (Math.abs(e.clientX - startX) > 4) { moved = true; rail.classList.add('dragging'); }
  });
  function end() { down = false; rail.classList.remove('dragging'); }
  rail.addEventListener('pointerup', end);
  rail.addEventListener('pointercancel', end);
  rail.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
})();
