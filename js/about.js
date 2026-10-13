/* about — contact form: inline success / error states (same contract as the home offer form).
   Set data-endpoint on the form (Formspree, Netlify, own API…) to actually send.
   Without it the form only shows the success state locally — NOT for production. */
(function contactForm() {
  'use strict';
  var form = document.getElementById('contact-form');
  if (!form) return;
  var done = document.getElementById('contact-done');
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
      console.warn('[contact-form] no data-endpoint set — submission was not sent anywhere.');
      showDone();
      return;
    }
    btn.disabled = true;
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); showDone(); })
      .catch(function () { err.hidden = false; })
      .then(function () { btn.disabled = false; });
  });
})();
