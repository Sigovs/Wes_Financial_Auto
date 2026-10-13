/* Background videos — every page. Load AFTER home3.js.
   1. A pause / play control on each looping background video (WCAG 2.2.2: moving content
      longer than 5s must be stoppable). Under reduced motion the video is already paused,
      so the control starts in its "play" state.
   2. [data-desktop-video]: the clip only loads and plays on wider screens with motion allowed;
      phones keep the poster still (saves the download on mobile data). */
(function bgVideos() {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = window.matchMedia('(min-width: 701px)').matches;
  var videos = Array.prototype.slice.call(document.querySelectorAll('.hero3 video, .vbreak3 video'));

  var ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>';

  videos.forEach(function (v) {
    var host = v.closest('.hero3, .vbreak3');
    if (!host) return;

    if (v.hasAttribute('data-desktop-video')) {
      if (!wide || reduce) return;              // phone / reduced motion: poster only, no control needed
      v.preload = 'auto';
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'vctl';
    function sync() {
      var paused = v.paused;
      btn.innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
      btn.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    }
    btn.addEventListener('click', function () {
      if (v.paused) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } else { v.pause(); }
    });
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    sync();
    host.appendChild(btn);
  });
})();
