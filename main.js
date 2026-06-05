/* ===========================
   FAQ accordion
=========================== */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq__question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

/* ===========================
   Hamburger menu
=========================== */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

/* ===========================
   Floating CTA visibility
=========================== */
const floatingCta = document.querySelector('.floating-cta');
if (floatingCta) {
  const heroHeight = document.querySelector('.hero')?.offsetHeight ?? 400;
  window.addEventListener('scroll', () => {
    floatingCta.classList.toggle('visible', window.scrollY > heroHeight);
  }, { passive: true });
}

/* ===========================
   Contact form (demo: show alert)
=========================== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '送信中...';
    btn.disabled = true;
    setTimeout(() => {
      alert('お問い合わせありがとうございます。\n2営業日以内にご連絡いたします。');
      form.reset();
      btn.textContent = original;
      btn.disabled = false;
    }, 1200);
  });
}

/* ===========================
   Scroll-in animation
=========================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .merit__item, .case-card, .pricing-card, .pain__item, .faq__item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { passive: true });

document.querySelectorAll(
  '.service-card, .merit__item, .case-card, .pricing-card, .pain__item, .faq__item'
).forEach(el => {
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      io.disconnect();
    }
  }, { threshold: 0.12 });
  io.observe(el);
});
