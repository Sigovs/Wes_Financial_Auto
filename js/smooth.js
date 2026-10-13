/* Lenis smooth scroll — every page. Not constructed under reduced motion (native scroll).
   Anchors scroll through Lenis and stop under the fixed nav. Nested scrollers carry
   data-lenis-prevent. No GSAP on the site, so Lenis runs its own rAF. */
(function smooth() {
  'use strict';
  if (typeof Lenis === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var nav = document.getElementById('site-nav');
  window.lenis = new Lenis({
    autoRaf: true,
    anchors: { offset: nav ? -nav.offsetHeight : 0 },
    allowNestedScroll: true,
    stopInertiaOnNavigate: true
  });
})();
