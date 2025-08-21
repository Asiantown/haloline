document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initFormHandlers();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Form submission handling
function initFormHandlers() {
    const forms = document.querySelectorAll('.waitlist-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            const email = emailInput.value;
            
            // Store original button text
            const originalText = submitButton.textContent;
            
            // Update button state
            submitButton.disabled = true;
            submitButton.textContent = 'Joining...';
            submitButton.style.transform = 'scale(0.98)';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Success state
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>You're on the list! We'll email you as we open in your area.</span>
            `;
            
            // Replace form with success message
            form.replaceWith(successMessage);
            
            // Fade in animation
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.style.transition = 'opacity 0.3s ease-in';
                successMessage.style.opacity = '1';
            }, 10);
            
            // Store email in localStorage (for demo purposes)
            localStorage.setItem('waitlist_email', email);
            
            // Update other forms if they exist
            updateOtherForms(email);
        });
    });
}

// Update other forms when one is submitted
function updateOtherForms(email) {
    const remainingForms = document.querySelectorAll('.waitlist-form');
    remainingForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = email;
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll(
        '.pain-card, .feature-card, .pricing-card, .proof-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`;
        observer.observe(el);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCTA = document.querySelector('.nav-cta');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-content">
                    <a href="#how-it-works">How it Works</a>
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#faq">FAQ</a>
                    <button class="btn btn-gradient" onclick="scrollToForm()">Join Waitlist</button>
                </div>
            `;
            document.querySelector('.navbar').appendChild(mobileMenu);
        }
        
        // Toggle menu
        mobileMenu.classList.toggle('active');
        toggle.classList.toggle('active');
        
        // Animate hamburger
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking links
    document.addEventListener('click', (e) => {
        if (e.target.matches('.mobile-menu a')) {
            const mobileMenu = document.querySelector('.mobile-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                toggle.classList.remove('active');
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to form function for CTAs
function scrollToForm() {
    const form = document.querySelector('.waitlist-form');
    if (form) {
        const offset = 100;
        const formPosition = form.offsetTop - offset;
        window.scrollTo({
            top: formPosition,
            behavior: 'smooth'
        });
        
        // Focus on email input after scroll
        setTimeout(() => {
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                emailInput.focus();
            }
        }, 500);
    }
}

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add subtle parallax to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const verifiedCard = document.querySelector('.verified-call-card');
    
    if (verifiedCard && scrolled < 500) {
        const speed = 0.3;
        verifiedCard.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add styles for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(12px);
        transform: translateY(-100%);
        transition: transform 0.3s ease-out;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }
    
    .mobile-menu.active {
        transform: translateY(0);
    }
    
    .mobile-menu-content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .mobile-menu-content a {
        padding: 12px;
        color: var(--slate-700);
        text-decoration: none;
        font-weight: 500;
        transition: var(--transition);
    }
    
    .mobile-menu-content a:hover {
        color: var(--indigo);
        background: var(--slate-50);
        border-radius: 8px;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
    }
`;
document.head.appendChild(style);

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add micro-interaction to dashboard mock
const dashboardMock = document.querySelector('.dashboard-mock');
if (dashboardMock) {
    dashboardMock.addEventListener('mouseenter', () => {
        dashboardMock.style.transform = 'scale(1.02)';
        dashboardMock.style.transition = 'transform 0.3s ease-out';
    });
    
    dashboardMock.addEventListener('mouseleave', () => {
        dashboardMock.style.transform = 'scale(1)';
    });
}

// Console message
console.log(
    '%c Halo Line ',
    'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
);
console.log('Peace of mind for every family call.');