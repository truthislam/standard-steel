/* ═══════════════════════════════════════════
   STANDARD STEEL — PREMIUM INTERACTIONS
   ═══════════════════════════════════════════ */

// ── LOADER ──
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ── AOS INIT ──
AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 60 });

// ── NAV SCROLL ──
(function() {
  var nav = document.getElementById('mainNav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── MOBILE MENU ──
(function() {
  var toggle = document.getElementById('mobileToggle');
  var menu = document.getElementById('mobileMenu');
  
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });
  
  // Close on link click
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });
})();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── QUOTE FORM ──
function handleQuote(e) {
  e.preventDefault();
  var form = document.getElementById('quoteForm');
  var btn = document.getElementById('quoteBtn');
  var originalHTML = btn.innerHTML;
  btn.innerHTML = 'Sending...';
  btn.disabled = true;

  // Simulate submission (replace with real endpoint)
  setTimeout(function() {
    form.style.display = 'none';
    document.getElementById('quoteSuccess').style.display = 'block';
  }, 1500);
}

// ── BULLSEYE CURSOR ──
(function() {
  if (window.innerWidth <= 768) return;
  
  var dot = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, .svc-card, .product-card, .value-card, .facility-card, .contact-card, .team-role, .product-tags span').forEach(function(el) {
    el.addEventListener('mouseenter', function() { ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', function() { ring.classList.remove('hovered'); });
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();

// ── PARALLAX HERO VIDEO ──
(function() {
  var video = document.getElementById('heroVideo');
  if (!video) return;
  
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      video.style.transform = 'translateY(' + (scrolled * 0.3) + 'px) scale(1.05)';
    }
  }, { passive: true });
})();

// ── COUNTER ANIMATION ──
(function() {
  var stats = document.querySelectorAll('.stat-num');
  var observed = false;
  
  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !observed) {
      observed = true;
      stats.forEach(function(stat) {
        var text = stat.textContent;
        var match = text.match(/(\d+)/);
        if (match) {
          var target = parseInt(match[1]);
          var suffix = text.replace(match[1], '');
          var current = 0;
          var step = Math.ceil(target / 60);
          var interval = setInterval(function() {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            stat.textContent = current + suffix;
          }, 25);
        }
      });
    }
  }, { threshold: 0.5 });
  
  var heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
})();
