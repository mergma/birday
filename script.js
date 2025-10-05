// Animation and Auto-scroll Controller
class IntroController {
    constructor() {
        this.animationDuration = 7000; // Total animation duration in milliseconds
        this.hasScrolled = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startIntro());
        } else {
            this.startIntro();
        }
    }

    startIntro() {
        // Prevent manual scrolling during intro
        this.disableScroll();
        
        // Start the animation sequence
        this.playIntroAnimation();
        
        // Set timer for auto-scroll
        setTimeout(() => {
            this.autoScrollToContent();
        }, this.animationDuration);

        // Add click handler for early skip
        this.addSkipHandler();
    }

    playIntroAnimation() {
        const introSection = document.getElementById('intro');
        
        // Add animation class to trigger CSS animations
        introSection.classList.add('intro-active');
        
        // Animate loading progress
        this.animateLoadingProgress();
        
        // Add particle effects
        this.createParticleEffect();
    }

    animateLoadingProgress() {
        const loadingText = document.querySelector('.loading-text');
        const messages = [
            'Loading experience...',
            'Preparing content...',
            'Almost ready...',
            'Welcome!'
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length - 1) {
                messageIndex++;
                loadingText.textContent = messages[messageIndex];
            } else {
                clearInterval(messageInterval);
            }
        }, 1500);
    }

    createParticleEffect() {
        const introContainer = document.querySelector('.intro-container');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(introContainer);
            }, i * 200);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Particle styles
        Object.assign(particle.style, {
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            left: x + 'px',
            top: y + 'px',
            pointerEvents: 'none',
            zIndex: '10',
            animation: 'particleFade 2s ease-out forwards'
        });
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }

    autoScrollToContent() {
        if (this.hasScrolled) return;
        
        this.hasScrolled = true;
        this.enableScroll();
        
        // Smooth scroll to main content
        const mainContent = document.getElementById('main-content');
        
        // Add fade out effect to intro
        const introSection = document.getElementById('intro');
        introSection.style.transition = 'opacity 1s ease-out';
        introSection.style.opacity = '0';
        
        // Scroll to main content
        setTimeout(() => {
            mainContent.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Hide intro section after scroll
            setTimeout(() => {
                introSection.style.display = 'none';
            }, 1000);
        }, 500);
        
        // Animate main content entrance
        this.animateMainContent();
    }

    animateMainContent() {
        const mainContent = document.getElementById('main-content');
        const contentElements = mainContent.querySelectorAll('h2, p, .feature-card');
        
        // Initially hide elements
        contentElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        });
        
        // Animate elements in sequence
        contentElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200 + 1000);
        });
    }

    addSkipHandler() {
        const introSection = document.getElementById('intro');
        
        // Add skip button
        const skipButton = document.createElement('button');
        skipButton.textContent = 'Skip Intro';
        skipButton.className = 'skip-button';
        
        Object.assign(skipButton.style, {
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            zIndex: '100',
            opacity: '0',
            animation: 'fadeIn 1s ease-out 2s forwards'
        });
        
        skipButton.addEventListener('mouseenter', () => {
            skipButton.style.background = 'rgba(255, 255, 255, 0.2)';
            skipButton.style.transform = 'scale(1.05)';
        });
        
        skipButton.addEventListener('mouseleave', () => {
            skipButton.style.background = 'rgba(255, 255, 255, 0.1)';
            skipButton.style.transform = 'scale(1)';
        });
        
        skipButton.addEventListener('click', () => {
            this.autoScrollToContent();
        });
        
        introSection.appendChild(skipButton);
        
        // Also allow clicking anywhere to skip
        introSection.addEventListener('click', (e) => {
            if (e.target !== skipButton) {
                this.autoScrollToContent();
            }
        });
    }

    disableScroll() {
        document.body.style.overflow = 'hidden';
        
        // Prevent scroll with keyboard
        document.addEventListener('keydown', this.preventScrollKeys);
        
        // Prevent scroll with mouse wheel
        document.addEventListener('wheel', this.preventScroll, { passive: false });
        document.addEventListener('touchmove', this.preventScroll, { passive: false });
    }

    enableScroll() {
        document.body.style.overflow = 'auto';
        
        // Re-enable scroll
        document.removeEventListener('keydown', this.preventScrollKeys);
        document.removeEventListener('wheel', this.preventScroll);
        document.removeEventListener('touchmove', this.preventScroll);
    }

    preventScrollKeys = (e) => {
        const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        if (keys.includes(e.keyCode)) {
            e.preventDefault();
            return false;
        }
    }

    preventScroll = (e) => {
        e.preventDefault();
        return false;
    }
}

// Add particle animation CSS
const particleCSS = `
@keyframes particleFade {
    0% {
        opacity: 0;
        transform: scale(0) translateY(0);
    }
    50% {
        opacity: 1;
        transform: scale(1) translateY(-50px);
    }
    100% {
        opacity: 0;
        transform: scale(0) translateY(-100px);
    }
}
`;

// Inject particle CSS
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize the intro controller
new IntroController();

// Add smooth scrolling for any internal links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add resize handler for responsive particles
window.addEventListener('resize', () => {
    // Recalculate particle positions if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
    });
});
