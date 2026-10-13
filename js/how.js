/* how-it-works — sticky step index: marks the step crossing the middle of the viewport
   (index link + the step's own numeral). Without JS the index is plain anchor links. */
(function processIndex() {
  'use strict';
  var steps = Array.prototype.slice.call(document.querySelectorAll('.proc6__step'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.proc6__index a'));
  if (!steps.length || !('IntersectionObserver' in window)) return;

  function activate(n) {
    steps.forEach(function (s) { s.classList.toggle('is-active', s.getAttribute('data-step') === n); });
    links.forEach(function (a) {
      var on = a.getAttribute('data-step') === n;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.getAttribute('data-step')); });
  }, { rootMargin: '-45% 0px -45% 0px' });   // a thin band across the middle of the screen
  steps.forEach(function (s) { io.observe(s); });
  activate('1');
})();
