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
