/* index2 — Sell feature carousel: steps auto-advance, image swaps, progress bar */
(function sellFeature() {
  'use strict';
  var sec = document.getElementById('sell');
  if (!sec) return;
  var steps = Array.prototype.slice.call(sec.querySelectorAll('.sf-step'));
  var imgs = Array.prototype.slice.call(sec.querySelectorAll('.sf-img'));
  if (steps.length < 2) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var i = 0, timer = null, DUR = 5000;

  function set(n) {
    i = (n + steps.length) % steps.length;
    steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    imgs.forEach(function (im, k) { im.classList.toggle('is-active', k === i); });
    var fill = steps[i].querySelector('.sf-step__fill');
    if (fill) { fill.style.animation = 'none'; void fill.offsetWidth; fill.style.animation = ''; }
  }
  function next() { set(i + 1); }
  function start() { if (reduce.matches || timer) return; timer = window.setInterval(next, DUR); }
  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

  steps.forEach(function (s, k) {
    s.querySelector('.sf-step__btn').addEventListener('click', function () { set(k); stop(); start(); });
  });
  sec.addEventListener('mouseenter', stop);
  sec.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  set(0); start();
})();

/* index2 — The Collection: full-bleed infinite rail (drag / scroll / arrows, loops seamlessly) */
(function collection() {
  'use strict';
  var rail = document.querySelector('.coll-rail');
  if (!rail) return;
  var track = rail.querySelector('.coll-track');
  var originals = Array.prototype.slice.call(track.children);
  if (originals.length < 2) return;

  /* clone SETS_SIDE sets on each side so the middle band always has content to loop through */
  var SETS_SIDE = 2;
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
    unit = track.scrollWidth / (SETS_SIDE * 2 + 1);   // width of one set (all sets identical)
    step = unit / originals.length;                    // one card + gap
    peek = step * 0.3;                                 // ~30% peeking on the left
  }
  function recenter() { rail.scrollLeft = unit * SETS_SIDE - peek; }

  /* seamless wrap: keep the scroll position inside the middle band */
  function wrap() {
    if (!unit) return;
    var lo = unit * (SETS_SIDE - 0.5);
    var hi = unit * (SETS_SIDE + 0.5);
    if (rail.scrollLeft < lo) rail.scrollLeft += unit;
    else if (rail.scrollLeft > hi) rail.scrollLeft -= unit;
  }

  measure(); recenter();
  rail.addEventListener('scroll', wrap, { passive: true });
  window.addEventListener('resize', function () { measure(); recenter(); });
  window.addEventListener('load', function () { measure(); recenter(); });

  var prev = document.querySelector('[data-prev]');
  var next = document.querySelector('[data-next]');
  function page(dir) { rail.scrollBy({ left: dir * step, behavior: 'smooth' }); }
  if (prev) prev.addEventListener('click', function () { page(-1); });
  if (next) next.addEventListener('click', function () { page(1); });
  rail.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { page(1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { page(-1); e.preventDefault(); }
  });

  /* incremental drag (so a mid-drag wrap teleport isn't undone) */
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
