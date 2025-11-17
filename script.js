// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            const mainNav = document.getElementById('mainNav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Top bar infinite scroll effect
const topBarSlider = document.querySelector('.top-bar-slider');
if (topBarSlider) {
    // Clone the items to create seamless loop
    const items = topBarSlider.innerHTML;
    topBarSlider.innerHTML += items;
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and facility cards
document.querySelectorAll('.service-card, .facility-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const nav = document.querySelector('.main-nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';
    
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    document.querySelector('.header-content').prepend(menuButton);
};

// Phone number click tracking
document.querySelector('.contact-cta').addEventListener('click', () => {
    console.log('Contact clicked');
    // You can add analytics tracking here
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('SG Clinic Website Loaded');
    
    // Hero slider functionality
    let slideIndex = 1;
    showSlides(slideIndex);
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        moveSlide(1);
    }, 5000);
    
    // Make slider functions global
    window.moveSlide = function(n) {
        showSlides(slideIndex += n);
    };
    
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };
    
    function showSlides(n) {
        let slides = document.getElementsByClassName('slide');
        let dots = document.getElementsByClassName('dot');
        
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('active');
        }
    }
    
    // Hero appointment buttons
    const heroAppointmentBtns = document.querySelectorAll('[id^="heroAppointmentBtn"]');
    const qrModal = document.getElementById('qrModal');
    
    heroAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (qrModal) {
                qrModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // QR Code Modal functionality
    const modal = document.getElementById('qrModal');
    const appointmentLinks = document.querySelectorAll('#appointmentLink, .appointmentLink');
    const closeBtn = document.querySelector('.qr-close');
    
    // Add click event to all appointment links
    appointmentLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
