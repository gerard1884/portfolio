/* Alex Bony: portfolio
   No dependencies. Handles: rack selector, mobile menu, skills marquee, footer year. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Rack selector ---------- */
  var units = Array.prototype.slice.call(document.querySelectorAll('.unit'));
  var readout = document.getElementById('readout');

  if (units.length && readout) {
    var rUnit = readout.querySelector('.readout__unit');
    var rTitle = readout.querySelector('.readout__title');
    var rText = readout.querySelector('.readout__text');
    var rTags = readout.querySelector('.readout__tags');
    var rLink = readout.querySelector('.readout__link');

    var select = function (unit) {
      units.forEach(function (u) {
        u.setAttribute('aria-pressed', u === unit ? 'true' : 'false');
      });

      rUnit.textContent = unit.dataset.unit;
      rTitle.textContent = unit.dataset.title;
      rText.textContent = unit.dataset.text;
      rLink.setAttribute('href', '#' + unit.dataset.target);

      rTags.textContent = '';
      (unit.dataset.tags || '').split(',').forEach(function (tag) {
        var t = tag.trim();
        if (!t) return;
        var li = document.createElement('li');
        li.textContent = t;
        rTags.appendChild(li);
      });
    };

    units.forEach(function (unit) {
      unit.addEventListener('click', function () { select(unit); });
    });

    // Arrow keys move between units.
    var list = document.querySelector('.rack__units');
    list.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      var i = units.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      var next = units[(i + (e.key === 'ArrowDown' ? 1 : -1) + units.length) % units.length];
      next.focus();
      select(next);
    });

    var initial = units.filter(function (u) { return u.getAttribute('aria-pressed') === 'true'; })[0] || units[0];
    select(initial);
  }

  /* ---------- Skills marquee ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('[data-marquee]').forEach(function (marquee) {
      var track = marquee.querySelector('.marquee__track');
      var set = marquee.querySelector('.marquee__set');
      if (!track || !set) return;
      var clone = set.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
      marquee.classList.add('is-live');
    });
  }
})();
