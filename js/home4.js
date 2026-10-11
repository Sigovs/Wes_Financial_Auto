/* index4 — must load BEFORE home3.js: the sold cards have to exist before
   home3's rail clones them for the infinite loop. */

/* index4 — Sold: render cards from js/sold-data.js */
(function sold() {
  'use strict';
  var section = document.getElementById('sold');
  if (!section) return;
  var track = section.querySelector('.inv3-track');
  var list = window.SOLD_VEHICLES || [];

  if (!list.length) { section.classList.add('is-empty'); return; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  track.innerHTML = list.map(function (v) {
    var name = v.year + ' ' + v.make + ' ' + v.model;
    var img = '<img src="' + esc(encodeURI(v.photo)) + '" alt="' + esc(v.alt || name) + '" loading="lazy" draggable="false">';
    var photo = v.link
      ? '<a class="inv-card__photo" href="' + esc(v.link) + '" target="_blank" rel="noopener" aria-label="' + esc(name) + ' — view post">' + img + '</a>'
      : '<div class="inv-card__photo">' + img + '</div>';
    var miles = typeof v.miles === 'number' ? v.miles.toLocaleString('en-US') + ' mi' : '';
    return '<li class="inv3-slide"><article class="inv-card inv-card--sold">' +
      '<div class="inv-card__media">' + photo + '<span class="sold-tag">Sold</span></div>' +
      '<div class="inv-card__body">' +
        '<h3 class="inv-card__title"><span class="inv-card__ymake">' + esc(v.year + ' ' + v.make) + '</span>' +
        '<span class="inv-card__model">' + esc(v.model) + '</span></h3>' +
        '<span class="inv-card__miles">' + (miles || '&nbsp;') + '</span>' +
      '</div></article></li>';
  }).join('');

})();

/* index4 — offer form: inline success / error states.
   Set data-endpoint on the form (Formspree, Netlify, own API…) to actually send.
   Without it the form only shows the success state locally — NOT for production. */
(function offerForm() {
  'use strict';
  var form = document.getElementById('offer-form');
  if (!form) return;
  var done = document.getElementById('offer-done');
  var err = form.querySelector('.form4__error');
  var btn = form.querySelector('[type="submit"]');

  function showDone() {
    form.hidden = true;
    done.hidden = false;
    done.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.hidden = true;
    var endpoint = form.getAttribute('data-endpoint');
    if (!endpoint) {
      console.warn('[offer-form] no data-endpoint set — submission was not sent anywhere.');
      showDone();
      return;
    }
    btn.disabled = true;
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); showDone(); })
      .catch(function () { err.hidden = false; })
      .then(function () { btn.disabled = false; });
  });

  /* file input — show how many photos were picked */
  var file = form.querySelector('.form4__file input');
  var fileLabel = form.querySelector('.form4__file-name');
  if (file && fileLabel) {
    file.addEventListener('change', function () {
      var n = file.files.length;
      fileLabel.textContent = n ? n + (n === 1 ? ' photo selected' : ' photos selected') : 'No photos selected';
    });
  }
})();

/* index4 — Instagram wall (after DuPont v4 · 08): while the stage is pinned, the three
   columns rise at three rates, scrubbed to scroll. Desktop + motion only; otherwise the
   static offset grid in home4.css stands on its own. */
(function igWall() {
  'use strict';
  var sec = document.querySelector('.igw');
  if (!sec) return;
  var cols = Array.prototype.slice.call(sec.querySelectorAll('.igw__col'));
  var mq = window.matchMedia('(min-width: 1025px) and (prefers-reduced-motion: no-preference)');
  var START = [0.46, 0.7, 0.56];   // where each column waits, as a share of the viewport height
  var RATE = [1, 1.35, 0.8];       // three columns, three speeds — the middle one runs fastest
  var ticking = false;

  function update() {
    ticking = false;
    if (!sec.classList.contains('igw--motion')) return;
    var vh = window.innerHeight;
    var r = sec.getBoundingClientRect();
    var span = r.height - vh;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    cols.forEach(function (col, i) {
      var from = START[i] * vh;
      var to = -(col.offsetHeight - vh * 0.82);   // the last post clears the bottom fade
      var y = from + (to - from) * p * RATE[i];
      col.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function setMode() {
    sec.classList.toggle('igw--motion', mq.matches);
    if (!mq.matches) cols.forEach(function (c) { c.style.transform = ''; });
    update();
  }

  setMode();
  if (mq.addEventListener) mq.addEventListener('change', setMode); else mq.addListener(setMode);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', update);
})();
