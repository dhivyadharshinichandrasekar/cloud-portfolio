cat > js/main.js << 'EOF'
// ==========================================
// DHIVYADHARSHINI - DEVOPS PORTFOLIO
// Main JavaScript File
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initParticles();
    initNavigation();
    initScrollAnimations();
    initCounters();
    initSkillLevels();
    initSmoothScroll();

    // ==========================================
    // PARTICLE SYSTEM
    // ==========================================
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        // Random colors from neon palette
        const colors = ['#00f0ff', '#ff00ff', '#7b2dff', '#39ff14'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(particle);
    }

    // ==========================================
    // NAVIGATION
    // ==========================================
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-link');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link based on scroll position
            updateActiveNavLink();
        });

        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
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

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger skill level animation
                    if (entry.target.classList.contains('skill-card')) {
                        const skillLevel = entry.target.querySelector('.skill-level');
                        if (skillLevel) {
                            const level = skillLevel.getAttribute('data-level');
                            skillLevel.style.setProperty('--level', level);
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll(
            '.project-card, .skill-card, .contact-card, .about-card, .stat-item'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });

        // Add animation class styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // ==========================================
    // SKILL LEVELS
    // ==========================================
    function initSkillLevels() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const skillLevel = card.querySelector('.skill-level');
            if (skillLevel) {
                const level = skillLevel.getAttribute('data-level');
                card.addEventListener('mouseenter', () => {
                    skillLevel.style.setProperty('--level', level);
                });
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
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

    // ==========================================
    // TYPING EFFECT (Optional Enhancement)
    // ==========================================
    function initTypingEffect() {
        const text = "DevOps Engineer";
        const element = document.querySelector('.title-text');
        if (!element) return;

        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        type();
    }

    // ==========================================
    // CURSOR GLOW EFFECT
    // ==========================================
    function initCursorGlow() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Scale up on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Initialize cursor glow for desktop
    if (window.innerWidth > 768) {
        initCursorGlow();
    }

    // ==========================================
    // PROJECT CARD TILT EFFECT
    // ==========================================
    function initTiltEffect() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    initTiltEffect();

    // ==========================================
    // PRELOADER (Optional)
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log(`
%c██████╗ ██████╗ 
%c██╔══██╗██╔══██╗
%c██║  ██║██║  ██║
%c██║  ██║██║  ██║
%c██████╔╝██████╔╝
%c╚═════╝ ╚═════╝ 
%c
👋 Hey there, curious developer!
💼 Portfolio by Dhivyadharshini
🚀 DevOps Engineer | 4.5+ Years Experience
📧 dhivyadharshinic11@gmail.com
`,
'color: #00f0ff',
'color: #00d4e6',
'color: #00b8cc',
'color: #009cb3',
'color: #008099',
'color: #006480',
'color: #a0a0b0'
);
EOF
