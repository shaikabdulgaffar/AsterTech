// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setMenuState(isOpen) {
    if (!navToggle || !navMenu) return;

    navMenu.classList.toggle('active', isOpen);
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
}

function updateActiveNavLink() {
    if (!sections.length || !navLinks.length) return;

    const navHeight = navbar ? navbar.offsetHeight : 70;
    const scrollPos = window.scrollY + navHeight + 40;
    let activeId = '';

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('active', isActive);
    });
}

function revealElements() {
    document.querySelectorAll('.fade-in').forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = navbar ? navbar.offsetHeight : 70;
            const targetPosition = target.offsetTop - navHeight + 1;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            setMenuState(false);
        });
    });
}

function initHoverEffects() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.querySelectorAll('.pricing-card').forEach((card) => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    document.querySelectorAll('.service-card').forEach((card) => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.08)';
            }
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

function initWhatsappFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float-enhanced a');
    if (!whatsappFloat) return;

    whatsappFloat.addEventListener('mouseenter', () => {
        whatsappFloat.style.animationPlayState = 'paused';
    });

    whatsappFloat.addEventListener('mouseleave', () => {
        whatsappFloat.style.animationPlayState = 'running';
    });
}

function initSapModules() {
    const sapModules = document.querySelectorAll('.sap-module');
    const sapHub = document.querySelector('.sap-logo');
    const connectionLines = document.querySelectorAll('.connection-line');

    if (!sapModules.length || !sapHub || !connectionLines.length) return;

    sapModules.forEach((module) => {
        module.addEventListener('mouseenter', function () {
            connectionLines.forEach((line) => {
                line.style.stroke = 'rgba(249, 115, 22, 0.8)';
                line.style.strokeWidth = '3';
            });

            sapHub.style.animation = 'sapHubPulse 0.5s ease-in-out';
        });

        module.addEventListener('mouseleave', function () {
            connectionLines.forEach((line) => {
                line.style.stroke = 'rgba(249, 115, 22, 0.3)';
                line.style.strokeWidth = '2';
            });

            sapHub.style.animation = 'sapHubPulse 3s ease-in-out infinite';
        });

        module.addEventListener('click', function () {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(249, 115, 22, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.marginLeft = '-5px';
            ripple.style.marginTop = '-5px';

            this.appendChild(ripple);

            window.setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initIntersectionReveal() {
    if (!('IntersectionObserver' in window)) {
        revealElements();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

function handleResize() {
    if (window.innerWidth > 900) {
        setMenuState(false);
    }
    updateActiveNavLink();
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = !navMenu.classList.contains('active');
        setMenuState(isOpen);
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        setMenuState(false);
    });
});

window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    updateActiveNavLink();
    revealElements();
});

window.addEventListener('resize', handleResize);

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    updateActiveNavLink();
    revealElements();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        setMenuState(false);
    }
});

window.addEventListener(
    'error',
    (e) => {
        const target = e.target;
        if (target && target.tagName === 'IMG') {
            target.style.display = 'none';
        }
    },
    true
);

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHoverEffects();
    initWhatsappFloat();
    initSapModules();
    initIntersectionReveal();
    updateActiveNavLink();
    revealElements();
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);