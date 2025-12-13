/* ============================================
   MUNJAL NAYAK - FUTURISTIC PORTFOLIO
   Main JavaScript File
   ============================================ */

// Initialize when DOM is ready
(function() {
    'use strict';
    
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Initialize all components
        initLoader();
        initParticles();
        initNavbar();
        initTypingEffect();
        initScrollAnimations();
        initCounterAnimation();
        initCursorGlow();
        initBackToTop();
        initContactForm();
        initMobileMenu();
        initSmoothScroll();
        initRunningDogs();
        initInteractiveBackground();
    }
})();

/* ============================================
   LOADING SCREEN
   ============================================ */
function initLoader() {
    const loader = document.querySelector('.loader');
    
    if (!loader) return;
    
    // Hide loader after page loads or after max 3 seconds
    const hideLoader = () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 1500);
    };
    
    // If page already loaded, hide immediately
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
    
    // Fallback: force hide after 4 seconds regardless
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 4000);
}

/* ============================================
   PARTICLES BACKGROUND
   ============================================ */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00d4ff', '#7c3aed', '#f472b6']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d4ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Throttle scroll handler for performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Update active nav link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const roles = [
        'Embedded Systems Engineer',
        'Hardware Designer',
        'ETCS Application Engineer',
        'IoT Developer',
        'PCB Design Expert'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

/* ============================================
   SCROLL ANIMATIONS (AOS)
   ============================================ */
function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;
    
    // Only enable on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursorGlow.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });
    
    // Smooth follow animation
    function updateCursor() {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    // Throttled scroll handler
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.btn-submit');
        const btnText = btn.querySelector('.btn-text');
        const btnIcon = btn.querySelector('i');
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        btn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            btnText.textContent = 'Sent!';
            btnIcon.className = 'fas fa-check';
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.className = 'fas fa-paper-plane';
                btn.disabled = false;
            }, 3000);
            
        } catch (error) {
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
            btn.disabled = false;
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
}

// Notification helper
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1rem 2rem',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: '#fff',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        fontWeight: '500',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: '10000',
        animation: 'slideUp 0.3s ease'
    });
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const close = document.querySelector('.nav-close');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    if (close) {
        close.addEventListener('click', () => {
            menu.classList.remove('show');
            document.body.style.overflow = 'visible';
        });
    }
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            document.body.style.overflow = 'visible';
        });
    });
    
    // Close on outside click
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            menu.classList.remove('show');
            document.body.style.overflow = 'visible';
        }
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
(function() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax for hero elements
                const heroGradient = document.querySelector('.hero-gradient');
                if (heroGradient) {
                    heroGradient.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
                }
                
                // Parallax for floating cards
                const floatCards = document.querySelectorAll('.float-card');
                floatCards.forEach((card, index) => {
                    const speed = (index + 1) * 0.05;
                    card.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.3s ease';
        observer.observe(item);
    });
}

// Initialize skill bars (auto-runs)
animateSkillBars();

/* ============================================
   PROJECT CARD EFFECTS
   ============================================ */
(function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }, { passive: true });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
})();

/* ============================================
   SECTION REVEAL ANIMATION
   ============================================ */
(function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Add revealed class styles
    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        section.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyles);
})();

/* ============================================
   PRELOADER TEXT ANIMATION
   ============================================ */
(function initPreloaderText() {
    const loaderText = document.querySelector('.loader-text');
    if (!loaderText) return;
    
    const text = loaderText.textContent;
    loaderText.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        loaderText.appendChild(span);
    });
    
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(fadeInStyle);
})();

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
(function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-primary, .social-link');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        }, { passive: true });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
})();

/* ============================================
   LAZY LOAD IMAGES
   ============================================ */
(function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
})();

/* ============================================
   RUNNING DOGS - Bruno & Rocky
   ============================================ */
function initRunningDogs() {
    const bruno = document.getElementById('dog-bruno');
    const rocky = document.getElementById('dog-rocky');
    
    if (!bruno || !rocky) return;
    
    // Get tongue elements
    const brunoTongue = bruno.querySelector('.dog-tongue');
    const rockyTongue = rocky.querySelector('.dog-tongue');
    
    // Dog dimensions and behavior constants
    const DOG_WIDTH = 100;
    const MIN_DISTANCE = 60; // Horizontal distance threshold
    const BASE_BOTTOM = 15; // Base vertical position
    const JUMP_HEIGHT = 45; // How high dog jumps to cross
    
    // Dog state objects
    const dogs = [
        {
            element: bruno,
            tongue: brunoTongue,
            name: 'Bruno',
            x: 100,
            y: BASE_BOTTOM, // Vertical position
            speed: 1.5 + Math.random() * 0.3,
            direction: 1,
            state: 'idle',
            idleTime: 0,
            maxIdleTime: 3000 + Math.random() * 4000,
            tongueVisible: false,
            tongueTimer: 0,
            meetingCooldown: 0,
            isCrossing: false,
            crossingPhase: 0 // 0=not crossing, 1=jumping up, 2=at peak, 3=landing
        },
        {
            element: rocky,
            tongue: rockyTongue,
            name: 'Rocky',
            x: window.innerWidth - 200,
            y: BASE_BOTTOM,
            speed: 1.3 + Math.random() * 0.3,
            direction: -1,
            state: 'idle',
            idleTime: 0,
            maxIdleTime: 4000 + Math.random() * 4000,
            tongueVisible: false,
            tongueTimer: 0,
            meetingCooldown: 0,
            isCrossing: false,
            crossingPhase: 0
        }
    ];
    
    // Set initial positions
    dogs.forEach(dog => {
        dog.element.style.left = dog.x + 'px';
        dog.element.style.bottom = dog.y + 'px';
        dog.element.style.top = 'auto';
        dog.element.style.transition = 'none';
    });
    
    // Update tongue randomly
    function updateTongue(dog, deltaTime) {
        dog.tongueTimer += deltaTime;
        
        if (dog.tongueTimer > 4000 + Math.random() * 6000) {
            dog.tongueTimer = 0;
            dog.tongueVisible = !dog.tongueVisible;
            if (dog.tongue) {
                dog.tongue.style.display = dog.tongueVisible ? 'block' : 'none';
            }
        }
        
        // Panting while running or crossing
        if ((dog.state === 'running' || dog.isCrossing) && !dog.tongueVisible && Math.random() > 0.98) {
            dog.tongueVisible = true;
            if (dog.tongue) dog.tongue.style.display = 'block';
        }
    }
    
    // Get distance between dogs
    function getDistance() {
        return Math.abs(dogs[0].x - dogs[1].x);
    }
    
    // Make dogs face each other
    function faceEachOther(dog1, dog2) {
        dog1.direction = dog1.x < dog2.x ? 1 : -1;
        dog2.direction = dog2.x < dog1.x ? 1 : -1;
        updateDirectionVisual(dog1);
        updateDirectionVisual(dog2);
    }
    
    // Initiate crossing - one dog jumps over the other
    function initiateCrossing(jumper, stayer) {
        jumper.isCrossing = true;
        jumper.crossingPhase = 1;
        jumper.state = 'running';
        jumper.element.classList.add('animating');
        
        // Show tongues during the exciting crossing moment!
        jumper.tongueVisible = true;
        stayer.tongueVisible = true;
        if (jumper.tongue) jumper.tongue.style.display = 'block';
        if (stayer.tongue) stayer.tongue.style.display = 'block';
    }
    
    // Update vertical position during crossing
    function updateCrossing(dog, deltaTime) {
        const JUMP_SPEED = 0.15;
        const PEAK_TIME = 200; // ms at peak
        
        if (dog.crossingPhase === 1) {
            // Jumping up
            dog.y += JUMP_SPEED * deltaTime;
            if (dog.y >= JUMP_HEIGHT) {
                dog.y = JUMP_HEIGHT;
                dog.crossingPhase = 2;
                dog.crossingTimer = 0;
            }
        } else if (dog.crossingPhase === 2) {
            // At peak - keep moving horizontally
            dog.crossingTimer = (dog.crossingTimer || 0) + deltaTime;
            if (dog.crossingTimer >= PEAK_TIME) {
                dog.crossingPhase = 3;
            }
        } else if (dog.crossingPhase === 3) {
            // Landing
            dog.y -= JUMP_SPEED * deltaTime;
            if (dog.y <= BASE_BOTTOM) {
                dog.y = BASE_BOTTOM;
                dog.crossingPhase = 0;
                dog.isCrossing = false;
                dog.meetingCooldown = 4000; // Cooldown after crossing
            }
        }
        
        dog.element.style.bottom = dog.y + 'px';
    }
    
    // Main animation loop
    let lastTime = 0;
    
    function updateDogs(currentTime) {
        if (lastTime === 0) lastTime = currentTime;
        const deltaTime = Math.min(currentTime - lastTime, 50); // Cap delta
        lastTime = currentTime;
        
        const distance = getDistance();
        
        dogs.forEach((dog, index) => {
            const otherDog = dogs[1 - index];
            
            updateTongue(dog, deltaTime);
            
            // Handle crossing animation
            if (dog.isCrossing) {
                updateCrossing(dog, deltaTime);
                
                // Keep moving during crossing
                const moveAmount = dog.speed * 1.5 * dog.direction * (deltaTime / 16);
                dog.x += moveAmount;
                dog.element.style.left = dog.x + 'px';
                
                // Clamp position
                dog.x = Math.max(30, Math.min(dog.x, window.innerWidth - 120));
                
                return; // Skip normal movement logic while crossing
            }
            
            // Decrease meeting cooldown
            if (dog.meetingCooldown > 0) {
                dog.meetingCooldown -= deltaTime;
            }
            
            if (dog.state === 'idle') {
                dog.idleTime += deltaTime;
                dog.element.classList.remove('animating');
                
                if (dog.idleTime >= dog.maxIdleTime) {
                    dog.state = 'running';
                    dog.idleTime = 0;
                    dog.maxIdleTime = 3000 + Math.random() * 5000;
                    
                    // Pick target
                    let targetX;
                    const screenWidth = window.innerWidth;
                    
                    if (dog.x < screenWidth / 2) {
                        targetX = dog.x + 150 + Math.random() * 200;
                    } else {
                        targetX = dog.x - 150 - Math.random() * 200;
                    }
                    
                    // Clamp to screen
                    targetX = Math.max(30, Math.min(targetX, screenWidth - 130));
                    
                    dog.targetX = targetX;
                    dog.direction = targetX > dog.x ? 1 : -1;
                    dog.element.classList.add('animating');
                }
            } else if (dog.state === 'running') {
                const moveAmount = dog.speed * dog.direction * (deltaTime / 16);
                let newX = dog.x + moveAmount;
                
                // Check if dogs are about to meet
                const wouldBeDistance = Math.abs(newX - otherDog.x);
                
                if (wouldBeDistance < MIN_DISTANCE && !otherDog.isCrossing) {
                    // Dogs are meeting!
                    
                    // First, face each other
                    faceEachOther(dog, otherDog);
                    
                    // Check if we should cross or just greet
                    if (dog.meetingCooldown <= 0 && otherDog.meetingCooldown <= 0 && Math.random() > 0.3) {
                        // One dog will jump over the other
                        const jumper = Math.random() > 0.5 ? dog : otherDog;
                        const stayer = jumper === dog ? otherDog : dog;
                        
                        initiateCrossing(jumper, stayer);
                        
                        // Stayer stops and watches
                        stayer.state = 'idle';
                        stayer.element.classList.remove('animating');
                    } else {
                        // Just stop and face each other (greeting)
                        dog.state = 'idle';
                        dog.element.classList.remove('animating');
                        dog.meetingCooldown = 2000;
                        
                        // Show happy tongues
                        dogs.forEach(d => {
                            d.tongueVisible = true;
                            if (d.tongue) d.tongue.style.display = 'block';
                        });
                    }
                } else {
                    // Safe to move
                    dog.x = newX;
                    dog.element.style.left = dog.x + 'px';
                    updateDirectionVisual(dog);
                    
                    // Check if reached target or bounds
                    const reachedTarget = (dog.direction > 0 && dog.x >= dog.targetX) || 
                                          (dog.direction < 0 && dog.x <= dog.targetX);
                    const outOfBounds = dog.x <= 30 || dog.x >= window.innerWidth - 120;
                    
                    if (reachedTarget || outOfBounds) {
                        dog.state = 'idle';
                        dog.element.classList.remove('animating');
                        dog.x = Math.max(30, Math.min(dog.x, window.innerWidth - 120));
                        dog.element.style.left = dog.x + 'px';
                    }
                }
            }
        });
        
        requestAnimationFrame(updateDogs);
    }
    
    function updateDirectionVisual(dog) {
        if (dog.direction > 0) {
            dog.element.classList.add('running-right');
            dog.element.classList.remove('running-left');
        } else {
            dog.element.classList.add('running-left');
            dog.element.classList.remove('running-right');
        }
    }
    
    // Start animation
    requestAnimationFrame(updateDogs);
    
    // Occasionally make one dog approach the other for interaction
    setInterval(() => {
        if (Math.random() > 0.4) {
            const approacher = dogs[Math.floor(Math.random() * 2)];
            const target = dogs.find(d => d !== approacher);
            
            // Only if both idle, not crossing, and not in cooldown
            if (approacher.state === 'idle' && target.state === 'idle' && 
                !approacher.isCrossing && !target.isCrossing &&
                approacher.meetingCooldown <= 0) {
                approacher.state = 'running';
                
                // Go toward the other dog
                const offset = MIN_DISTANCE - 10; // Get close enough to trigger meeting
                approacher.targetX = approacher.x < target.x ? 
                    target.x - offset : 
                    target.x + offset;
                    
                approacher.targetX = Math.max(30, Math.min(approacher.targetX, window.innerWidth - 120));
                approacher.direction = approacher.targetX > approacher.x ? 1 : -1;
                approacher.element.classList.add('animating');
            }
        }
    }, 10000);
    
    // React to scroll
    window.addEventListener('scroll', () => {
        dogs.forEach(dog => {
            if (dog.state === 'idle' && !dog.isCrossing && Math.random() > 0.75 && dog.meetingCooldown <= 0) {
                const otherDog = dogs.find(d => d !== dog);
                dog.state = 'running';
                
                // Run to a random position
                let targetX = dog.x + (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150);
                targetX = Math.max(30, Math.min(targetX, window.innerWidth - 120));
                
                dog.targetX = targetX;
                dog.direction = targetX > dog.x ? 1 : -1;
                dog.element.classList.add('animating');
            }
        });
    });
}

/* ============================================
   INTERACTIVE 3D BACKGROUND
   ============================================ */
function initInteractiveBackground() {
    const dynamicBg = document.querySelector('.dynamic-bg');
    const orbs = document.querySelectorAll('.bg-orb');
    const layers = document.querySelectorAll('.bg-layer');
    
    // 3D tilt effect on mouse move
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Smooth animation loop for 3D effect
    function animate3DBackground() {
        // Ease towards target
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Apply 3D transforms to background
        if (dynamicBg) {
            dynamicBg.style.transform = `
                perspective(1000px) 
                rotateY(${targetX * 2}deg) 
                rotateX(${-targetY * 2}deg)
            `;
        }
        
        // Parallax effect on orbs with different depths
        orbs.forEach((orb, index) => {
            const depth = (index + 1) * 15;
            const offsetX = targetX * depth;
            const offsetY = targetY * depth;
            orb.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${-50 * (index + 1)}px)`;
        });
        
        // Parallax on layers
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 8;
            layer.style.transform = `
                translateZ(${-100 * (3 - index)}px) 
                scale(${1 + (3 - index) * 0.1})
                translate(${targetX * depth}px, ${targetY * depth}px)
            `;
        });
        
        requestAnimationFrame(animate3DBackground);
    }
    
    animate3DBackground();
    
    // Create enhanced ripples on click
    document.addEventListener('click', (e) => {
        // Don't create ripples on interactive elements
        if (e.target.closest('a, button, input, textarea, .nav-menu, .dog')) return;
        
        // Create multiple ripples for 3D effect
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                ripple.style.left = e.clientX + 'px';
                ripple.style.top = e.clientY + 'px';
                const size = 80 + i * 40;
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.marginLeft = -size/2 + 'px';
                ripple.style.marginTop = -size/2 + 'px';
                ripple.style.opacity = 0.6 - i * 0.15;
                
                document.body.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 1200);
            }, i * 100);
        }
    });
    
    // Gyroscope effect for mobile devices
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma && e.beta) {
                const tiltX = e.gamma / 45; // -1 to 1
                const tiltY = (e.beta - 45) / 45; // Centered at 45 degrees
                
                mouseX = tiltX;
                mouseY = tiltY;
            }
        });
    }
    
    // Floating animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.transformStyle = 'preserve-3d';
    });
    
    // Color shift based on time of day
    const hour = new Date().getHours();
    const root = document.documentElement;
    
    if (hour >= 5 && hour < 8) {
        // Dawn - warm orange tint
        root.style.setProperty('--color-accent-primary', '#00d4ff');
        root.style.setProperty('--color-accent-secondary', '#ff7e5f');
    } else if (hour >= 8 && hour < 17) {
        // Day - default
        root.style.setProperty('--color-accent-primary', '#00d4ff');
        root.style.setProperty('--color-accent-secondary', '#7c3aed');
    } else if (hour >= 17 && hour < 20) {
        // Sunset - purple/pink
        root.style.setProperty('--color-accent-primary', '#00c4ff');
        root.style.setProperty('--color-accent-secondary', '#9333ea');
    } else {
        // Night - deeper colors
        root.style.setProperty('--color-accent-primary', '#00e4ff');
        root.style.setProperty('--color-accent-secondary', '#6d28d9');
    }
}

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cLooking for the source code? Feel free to explore!', 'font-size: 14px; color: #7c3aed;');
console.log('%c🐕 Bruno & Rocky say hi!', 'font-size: 14px; color: #f472b6;');
console.log('%c📧 Contact: munjal@outlook.in', 'font-size: 12px; color: #a1a1aa;');
