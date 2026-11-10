// Animaciones de growpipe.co: aparición al hacer scroll y contador de cifras.
// Si algo falla o el navegador pide menos movimiento, la página se ve completa igual.
(function () {
  var root = document.documentElement;
  var quiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quiereMenosMovimiento || !('IntersectionObserver' in window)) return;
  root.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    // Aparición escalonada
    var grupos = [
      'main section:not(#inicio) > *',
      '#como-funciona > div:last-child > div',
      '#precios > div:last-child > div'
    ];
    var items = [];
    grupos.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        if (items.indexOf(el) === -1) {
          el.classList.add('reveal');
          if (sel.indexOf('> div:last-child > div') !== -1) el.style.transitionDelay = (i * 90) + 'ms';
          items.push(el);
        }
      });
    });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });

    // Contador de las cifras ("200–500", "30 días", "2–4")
    var cifras = document.querySelectorAll('[data-count]');
    var cio = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, texto = el.textContent;
        var inicio = performance.now(), dur = 1100;
        (function paso(t) {
          var k = Math.min((t - inicio) / dur, 1), f = 1 - Math.pow(1 - k, 3);
          el.textContent = texto.replace(/\d+/g, function (n) { return Math.round(parseInt(n, 10) * f); });
          if (k < 1) requestAnimationFrame(paso); else el.textContent = texto;
        })(inicio);
      });
    }, { threshold: 0.6 });
    cifras.forEach(function (el) { cio.observe(el); });
  });
})();
