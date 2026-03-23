// ── AOS ──
(function () {
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js';
  s.onload = function () {
    AOS.init({ duration: 750, once: true, offset: 60, easing: 'ease-out-quad' });
  };
  document.head.appendChild(s);
})();

// ── Navbar scroll ──
var nav = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Counter animation ──
function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target'));
  var suffix = el.textContent.includes('%') ? '%' : '+';
  var current = 0;
  var step = Math.max(1, Math.ceil(target / 60));
  var timer = setInterval(function () {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, 20);
}

var counted = false;
var ctrSection = document.querySelector('.counters-strip');
if (ctrSection) {
  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.ctr-num').forEach(function (el) {
        animateCounter(el);
      });
    }
  }, { threshold: 0.4 });
  obs.observe(ctrSection);
}

// ── Submit feedback ──
var btn = document.getElementById('submitBtn');
if (btn) {
  btn.addEventListener('click', function () {
    btn.innerHTML = '<i class="bi bi-check2-circle"></i> Mensagem Enviada!';
    btn.style.background = 'var(--green-light)';
    setTimeout(function () {
      btn.innerHTML = '<i class="bi bi-send"></i> Enviar Mensagem';
      btn.style.background = '';
    }, 3200);
  });
}

// ── Back to top ──
var backBtn = document.getElementById('backToTop');
if (backBtn) {
  window.addEventListener('scroll', function () {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  });
  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#') return;
    var t = document.querySelector(id);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Fechar menu mobile se aberto
      var menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show')) {
        var toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }
    }
  });
});
