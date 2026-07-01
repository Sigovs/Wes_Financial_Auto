/* index3 — nav */
(function () {
  'use strict';

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
