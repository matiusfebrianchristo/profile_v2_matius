
const navbar = document.getElementById('navbar');
const hero = document.getElementById('home');
const links = document.querySelectorAll('.nav-link');
const sections = [...links]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
const revealItems = document.querySelectorAll('#skills .group');

new IntersectionObserver(([entry]) => {
    navbar.classList.toggle('is-fixed', !entry.isIntersecting)
}, {
    rootMargin: '-20px 0px 0px 0px' // Menyesuaikan jarak sebelum navbar menempel
}).observe(hero);


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
    rootMargin: '-50% 0px -50% 0px' // trigger when section crosses the middle of the viewport
});

sections.forEach(section => observer.observe(section));


revealItems.forEach(card => {
    const i = [...card.parentElement.children].indexOf(card); // position within its row
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