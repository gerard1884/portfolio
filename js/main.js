/* ============================================================
   Alex Bony — portfolio behaviour
   Small and dependency-free. Everything degrades gracefully.
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year in the footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- portrait: show initials until a photo exists ---------- */
  var portrait = document.getElementById("portrait");
  if (portrait) {
    var ring = portrait.closest(".portrait__ring");
    var markEmpty = function () { if (ring) ring.classList.add("is-empty"); };

    portrait.addEventListener("error", markEmpty);
    // covers a cached failure that fired before this script ran
    if (portrait.complete && portrait.naturalWidth === 0) markEmpty();
  }

  /* ---------- hairline under the top bar once the page scrolls ---------- */
  var topbar = document.querySelector(".topbar");
  var onScroll = function () {
    if (topbar) topbar.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- the one orchestrated moment: the stack settles bottom-up ---------- */
  var stack = document.getElementById("stackList");
  if (stack && !reduceMotion && "IntersectionObserver" in window) {
    stack.classList.add("is-armed");

    var layers = Array.prototype.slice.call(stack.querySelectorAll(".layer"));
    layers.forEach(function (layer, i) {
      // last item in the DOM is the earliest layer, so it moves first
      layer.style.transitionDelay = (layers.length - 1 - i) * 70 + "ms";
    });

    var stackWatcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        stack.classList.add("is-revealed");
        stackWatcher.disconnect();
      });
    }, { threshold: 0.12 });

    stackWatcher.observe(stack);
  }

  /* ---------- highlight the section you are reading ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var setActive = function (id) {
      navLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    };

    var sectionWatcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { sectionWatcher.observe(section); });
  }
})();
