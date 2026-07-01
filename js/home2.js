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

/* index2 — inventory drag carousel (mouse drag; touch/trackpad use native scroll) */
(function () {
  'use strict';
  var rail = document.querySelector('.inv-rail');
  if (!rail) return;
  var down = false, moved = false, startX = 0, startScroll = 0;

  rail.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; moved = false; startX = e.clientX; startScroll = rail.scrollLeft;
    try { rail.setPointerCapture(e.pointerId); } catch (err) {}
  });
  rail.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 4) { moved = true; rail.classList.add('dragging'); }
    rail.scrollLeft = startScroll - dx;
  });
  function end() { down = false; rail.classList.remove('dragging'); }
  rail.addEventListener('pointerup', end);
  rail.addEventListener('pointercancel', end);
  rail.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
  rail.addEventListener('keydown', function (e) {
    if (e.target !== rail) return;
    var slide = rail.querySelector('.inv-slide');
    var step = slide ? slide.getBoundingClientRect().width + 32 : 320;
    if (e.key === 'ArrowRight') { rail.scrollLeft += step; e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { rail.scrollLeft -= step; e.preventDefault(); }
  });
})();
