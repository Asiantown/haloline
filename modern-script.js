// Modern Script for Halo Line
class HaloLine {
    constructor() {
        this.init();
    }

    init() {
        this.initTheme();
        this.initNavbar();
        this.initForms();
        this.initAnimations();
        this.initParallax();
        this.initPricingToggle();
        this.initSmoothScroll();
        this.initMicroInteractions();
    }

    // Dark Mode Toggle
    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                const newTheme = theme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Animate theme transition
                document.body.style.transition = 'background 0.3s ease';
            });
        }
    }

    // Navbar Scroll Effects
    initNavbar() {
        const navbar = document.querySelector('.nav-modern');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add backdrop blur on scroll
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Form Handling with Success Animation
    initForms() {
        const forms = document.querySelectorAll('.modern-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const button = form.querySelector('.btn-primary');
                const email = form.querySelector('.email-input').value;
                const originalContent = button.innerHTML;
                
                // Loading state
                button.innerHTML = `
                    <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke-width="2"/>
                        <path d="M12 2a10 10 0 010 20" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>Processing...</span>
                `;
                button.disabled = true;
                
                // Simulate API call
                await this.delay(1500);
                
                // Success state
                button.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Success!</span>
                `;
                button.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
                
                // Create success message
                this.showSuccessMessage(form);
                
                // Reset after delay
                await this.delay(3000);
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.background = '';
                form.querySelector('.email-input').value = '';
            });
        });
    }

    showSuccessMessage(form) {
        const message = document.createElement('div');
        message.className = 'success-toast';
        message.innerHTML = `
            <div class="toast-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                    <strong>You're on the list!</strong>
                    <p>Check your email for confirmation.</p>
                </div>
            </div>
        `;
        
        // Add styles
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(message);
        
        // Remove after delay
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Scroll Animations with Intersection Observer
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger effect for grid items
                    if (entry.target.classList.contains('problem-card') ||
                        entry.target.classList.contains('bento-item') ||
                        entry.target.classList.contains('testimonial-card')) {
                        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.problem-card, .bento-item, .testimonial-card, .step-card, .price-card'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.dataset.delay = index * 100;
            observer.observe(el);
        });
    }

    // Parallax Effects
    initParallax() {
        const parallaxElements = document.querySelectorAll('.floating-card, .orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                
                requestAnimationFrame(() => {
                    el.style.transform = `translateY(${yPos}px)`;
                });
            });
        });
        
        // Mouse parallax for hero section
        const heroSection = document.querySelector('.hero-modern');
        const deviceMockup = document.querySelector('.device-mockup');
        
        if (heroSection && deviceMockup) {
            heroSection.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const xPos = (clientX / innerWidth - 0.5) * 20;
                const yPos = (clientY / innerHeight - 0.5) * 20;
                
                requestAnimationFrame(() => {
                    deviceMockup.style.transform = `
                        perspective(1000px) 
                        rotateY(${-15 + xPos}deg) 
                        rotateX(${5 + yPos}deg)
                    `;
                });
            });
        }
    }

    // Pricing Toggle Animation
    initPricingToggle() {
        const toggle = document.querySelector('.toggle-switch');
        const priceElements = document.querySelectorAll('.amount');
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                
                // Animate price change
                priceElements.forEach(el => {
                    const monthly = parseInt(el.textContent);
                    const annual = Math.floor(monthly * 0.8);
                    
                    if (toggle.classList.contains('active')) {
                        this.animateNumber(el, monthly, annual);
                    } else {
                        this.animateNumber(el, annual, monthly);
                    }
                });
            });
        }
    }

    // Number Animation
    animateNumber(element, start, end) {
        const duration = 500;
        const steps = 20;
        const stepDuration = duration / steps;
        const increment = (end - start) / steps;
        let current = start;
        let step = 0;
        
        const timer = setInterval(() => {
            current += increment;
            step++;
            
            if (step === steps) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepDuration);
    }

    // Smooth Scroll
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offset = 100;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Micro Interactions
    initMicroInteractions() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-glass, .btn-outline');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    width: 100px;
                    height: 100px;
                    left: ${x - 50}px;
                    top: ${y - 50}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Card tilt effect
        const cards = document.querySelectorAll('.problem-card, .bento-item, .price-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                requestAnimationFrame(() => {
                    card.style.transform = `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateZ(10px)
                    `;
                });
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
        
        // Magnetic effect for nav links
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    }

    // Utility function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const app = new HaloLine();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Performance monitoring
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes animate-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .animate-spin {
        animation: animate-spin 1s linear infinite;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.3s ease-in;
    }
    
    body {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed (file doesn't exist yet)
        });
    });
}