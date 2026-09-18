// Portfolio behaviors — vanilla JS, no deps.

// 1. Sticky header + scroll progress bar
const header = document.getElementById('header');
const progress = document.getElementById('scrollProgress');
function onScroll() {
  header.classList.toggle('sticky', window.scrollY > 50);
  if (progress) {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 2. Mobile menu
const toggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('.nav ul');
toggle.addEventListener('click', () => {
  const open = navUl.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
navUl.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navUl.classList.remove('open'))
);

// 3. Active nav link via IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

// 4. Typing effect
const roles = ['Web Designer', 'Founder', 'Freelancer'];
const typingEl = document.querySelector('.typing');
let ri = 0, ci = 0, deleting = false;
function type() {
  const word = roles[ri];
  typingEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 60 : 110;
  if (!deleting && ci > word.length) { deleting = true; delay = 1400; }
  else if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 400; }
  setTimeout(type, delay);
}
if (typingEl) type();

// 5 + 6. Scroll reveal + skill bars (robust: never leave content stuck hidden)
function reveal(el) {
  if (el.classList.contains('show')) return;
  el.classList.add('show');
  el.querySelectorAll?.('.fill').forEach(f => f.style.width = f.dataset.level);
  const fill = el.querySelector?.('.fill');
  if (fill) fill.style.width = fill.dataset.level;
}
const revealEls = document.querySelectorAll('.reveal');
// Reveal whatever is already in the viewport synchronously (no timer/observer needed)
revealEls.forEach(el => {
  if (el.getBoundingClientRect().top < (window.innerHeight || 99999)) reveal(el);
});
// Animate the rest as they scroll into view
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    reveal(e.target);
    obs.unobserve(e.target);
  });
}, { threshold: 0.18 });
revealEls.forEach(el => { if (!el.classList.contains('show')) revealObserver.observe(el); });

// 6b. Project filtering
const filterBtns = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('hide', !show);
    });
  });
});

// 7. Back to top
const toTop = document.getElementById('back-to-top');
if (toTop) toTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 8. Contact form -> pre-filled mailto (zero external accounts needed)
const CONTACT_EMAIL = 'lehauthabang@gmail.com';
const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent('Portfolio enquiry from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
});

// 8. Auto year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// 9. Project modals
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById('modal-' + btn.dataset.modal);
    if (modal) modal.hidden = false;
  });
});
document.querySelectorAll('[data-close]').forEach(b => {
  b.addEventListener('click', () => { b.closest('.modal').hidden = true; });
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.hidden = true; });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.hidden = true);
});
