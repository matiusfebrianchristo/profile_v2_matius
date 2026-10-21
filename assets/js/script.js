
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const menuIcon = menuBtn.querySelector('i');
const hero = document.getElementById('home');
const links = document.querySelectorAll('.nav-link');
const sections = [...links]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
const revealItems = document.querySelectorAll('#skills .group');


// Navbar fixed condition
new IntersectionObserver(([entry]) => {
    navbar.classList.toggle('is-fixed', !entry.isIntersecting)
}, {
    rootMargin: '-20px 0px 0px 0px' 
}).observe(hero);


// Navbar menu toggle on mobile
function setMenu(open) {
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuIcon.classList.toggle('fa-bars', !open);
    menuIcon.classList.toggle('fa-times', open);
}

menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) setMenu(false);
});
window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) setMenu(false);
});


// Highlight active section in navbar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: '-50% 0px -50% 0px' 
});

sections.forEach(section => observer.observe(section));


// Reveal items on scroll
revealItems.forEach(card => {
    const i = [...card.parentElement.children].indexOf(card); 
    card.classList.add('reveal');
    card.style.setProperty('--delay', `${i * 160}ms`);
});
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
});

revealItems.forEach(card => revealObserver.observe(card));