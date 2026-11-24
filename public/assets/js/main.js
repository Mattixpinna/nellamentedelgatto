(function () {
  'use strict';

  var btn = document.querySelector('.menu-toggle');
  var menu = document.getElementById('m-menu');
  var mobileView = document.querySelector('.v-mob');

  function isMobile() {
    return !!mobileView && getComputedStyle(mobileView).display !== 'none';
  }

  // Menu mobile
  function setOpen(open) {
    if (!btn || !menu) return;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  }

  if (btn && menu) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(menu.hidden);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Nella versione mobile gli id delle sezioni hanno il prefisso "m-"
  function goToHash() {
    var h;
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
    if (!h || !isMobile() || h.indexOf('m-') === 0) return;
    var el = document.getElementById('m-' + h);
    if (el) el.scrollIntoView();
  }

  window.addEventListener('load', goToHash);
  window.addEventListener('hashchange', goToHash);

  // Carosello recensioni: il primo puntino ha lo stile attivo, gli altri quello inattivo
  function setupDots(scroller) {
    var bar = scroller.nextElementSibling;
    var cards = scroller.children;
    if (!bar || bar.children.length < 2) return;
    var dots = Array.prototype.slice.call(bar.children);
    var areDots = dots.every(function (d) {
      return d.tagName === 'SPAN' && !d.textContent.trim();
    });
    if (!areDots) return;

    var onClass = dots[0].className;
    var offClass = dots[1].className;
    var current = 0;
    bar.classList.add('carousel-dots');

    function activeIndex() {
      var max = scroller.scrollWidth - scroller.clientWidth;
      if (max > 1 && scroller.scrollLeft >= max - 2) return cards.length - 1;
      var left = scroller.getBoundingClientRect().left +
        (parseFloat(getComputedStyle(scroller).scrollPaddingLeft) || 0);
      var best = 0, bestDist = Infinity;
      for (var i = 0; i < cards.length; i++) {
        var dist = Math.abs(cards[i].getBoundingClientRect().left - left);
        if (dist < bestDist) { best = i; bestDist = dist; }
      }
      return best;
    }

    function update() {
      var i = Math.min(activeIndex(), dots.length - 1);
      if (i === current) return;
      current = i;
      dots.forEach(function (d, n) { d.className = n === i ? onClass : offClass; });
    }

    var pending = false;
    scroller.addEventListener('scroll', function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.scroller'), setupDots);
})();
