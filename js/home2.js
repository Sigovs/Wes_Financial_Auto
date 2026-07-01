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
