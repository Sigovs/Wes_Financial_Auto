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

/* index2 — The Collection: cinematic one-at-a-time carousel (arrows, keys, swipe) */
(function collection() {
  'use strict';
  var stage = document.querySelector('.coll-stage');
  if (!stage) return;
  var slides = Array.prototype.slice.call(stage.querySelectorAll('.coll-slide'));
  if (slides.length < 2) return;
  var cur = stage.querySelector('[data-cur]');
  var total = stage.querySelector('[data-total]');
  var prev = stage.querySelector('[data-prev]');
  var next = stage.querySelector('[data-next]');
  var i = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  if (total) total.textContent = pad(slides.length);

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
      var link = s.querySelector('.coll-photo');
      if (link) { on ? link.removeAttribute('tabindex') : link.setAttribute('tabindex', '-1'); }
    });
    if (cur) cur.textContent = pad(i + 1);
  }

  if (prev) prev.addEventListener('click', function () { show(i - 1); });
  if (next) next.addEventListener('click', function () { show(i + 1); });
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { show(i + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { show(i - 1); e.preventDefault(); }
  });

  /* pointer swipe (suppress the photo's click when it was a drag) */
  var down = false, moved = false, x0 = 0;
  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    down = true; moved = false; x0 = e.clientX;
  });
  stage.addEventListener('pointermove', function (e) {
    if (down && Math.abs(e.clientX - x0) > 10) moved = true;
  });
  stage.addEventListener('pointerup', function (e) {
    if (!down) return; down = false;
    var dx = e.clientX - x0;
    if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
  });
  stage.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  show(0);
})();
