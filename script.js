// Animation and Auto-scroll Controller
class IntroController {
    constructor() {
        this.animationDuration = 7000; // Total animation duration in milliseconds
        this.hasScrolled = false;
        this.audio = null;
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

        // Initialize audio
        this.initializeAudio();

        // Set up real user interaction handler for audio
        this.setupUserInteractionForAudio();

        // Start the animation sequence
        this.playIntroAnimation();

        // Auto-scroll is now handled by terms acceptance
        // The terms popup will appear when loading completes

        // Add click handler for early skip
        this.addSkipHandler();
    }

    setupUserInteractionForAudio() {
        // Set up audio state
        this.audioEnabled = false;
        this.termsAccepted = false;
    }

    initializeAudio() {
        // Try to use the HTML audio element first, fallback to creating new Audio
        this.audio = document.getElementById('birthday-audio') || new Audio();

        // If we created a new Audio element, set the source
        if (!document.getElementById('birthday-audio')) {
            console.log('Using new Audio element');
            this.audio.src = 'audio/Jamrud.mp3'; // Replace with your audio file path
        } else {
            console.log('Using HTML audio element');
        }

        console.log('Audio source:', this.audio.src || this.audio.currentSrc);

        // Set audio properties
        this.audio.volume = 0.7; // 70% volume
        this.audio.loop = false; // Don't loop
        this.audio.preload = 'auto'; // Aggressively preload

        // Try to load the audio immediately
        this.audio.load();

        // Handle audio loading errors gracefully
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            console.error('Audio error details:', {
                error: e.target.error,
                networkState: this.audio.networkState,
                readyState: this.audio.readyState,
                src: this.audio.src,
                currentSrc: this.audio.currentSrc
            });
            console.log('Audio file not found or failed to load. Continuing without audio.');
        });

        // Optional: Add fade in effect
        this.audio.addEventListener('loadeddata', () => {
            console.log('Audio loaded successfully - duration:', this.audio.duration);
        });

        // Add more detailed loading events
        this.audio.addEventListener('canplay', () => {
            console.log('Audio can start playing');
        });

        this.audio.addEventListener('canplaythrough', () => {
            console.log('Audio can play through without buffering');
        });

        this.audio.addEventListener('loadstart', () => {
            console.log('Audio loading started');
        });

        this.audio.addEventListener('progress', () => {
            console.log('Audio loading progress...');
        });

        // Add ended event listener to clean up
        this.audio.addEventListener('ended', () => {
            console.log('Audio playback finished');
        });
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
            'Downloading Virus...',
            'Preparing Zip Bomb...',
            'Removing Fish It! from Library...',
            'LESS GOOOO!'
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length - 1) {
                messageIndex++;
                loadingText.textContent = messages[messageIndex];
                console.log('Loading message:', messages[messageIndex]);
            } else {
                clearInterval(messageInterval);
                console.log('Loading complete! Showing terms of agreement...');
                // Show terms of agreement when loading is complete
                setTimeout(() => {
                    this.showTermsOfAgreement();
                }, 500); // Small delay to ensure everything is ready
            }
        }, 1500);
    }

    showTermsOfAgreement() {
        // Create the terms overlay
        const overlay = document.createElement('div');
        overlay.className = 'terms-overlay';

        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
        });

        // Create the terms modal
        const modal = document.createElement('div');
        modal.className = 'terms-modal';

        Object.assign(modal.style, {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            position: 'relative'
        });

        modal.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h2 style="font-size: 2rem; margin-bottom: 0.5rem; background: linear-gradient(45deg, #ff6b6b, #ffd93d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                     TERMS OF AGREEMENT 
                </h2>
                <p style="font-size: 1rem; opacity: 0.9;">Please read and accept our totally legitimate terms</p>
            </div>

            <div style="max-height: 300px; overflow-y: auto; background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem; backdrop-filter: blur(5px);">
                <div style="font-size: 0.9rem; line-height: 1.6;">
                    <p><strong>Article 1:</strong> By clicking "I Accept", you agree that france doesn't exist (even if you disagree).</p>
                    <br>
                    <p><strong>Article 2:</strong> You acknowledge that this website may cause uncontrollable urges to dance to Jamrud songs.</p>
                    <br>
                    <p><strong>Article 3:</strong> You understand that "Fish It!" has been permanently removed from your Roblox library due to company policy and for your own safety.</p>
                    <br>
                    <p><strong>Article 4:</strong> You agree that the loading messages were 100% accurate and no actual viruses were downloaded (probably i don't know loll).</p>
                    <br>
                    <p><strong>Article 5:</strong> You consent to having your day made slightly better by this ridiculous website.</p>
                    <br>
                    <p><strong>Article 6:</strong> You acknowledge that clicking "I Accept" will unleash one of the greatest Indonesian music there ever is upon your ears.</p>
                    <br>
                    <p><strong>Article 7:</strong> You agree that this terms popup is the most important legal document you've ever read.</p>
                    <br>
                    <p><strong>Article 8:</strong> You understand that by accepting these terms, you become an honorary member of the "People Who Actually Read Terms and Conditions" club (population: you).</p>
                    <br>
                    <p style="text-align: center; font-style: italic; opacity: 0.8;">
                        "In case of audio emergency, break glass and turn volume up, or switch to Chrome." - Ancient Internet Proverb
                    </p>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="decline-terms" style="
                    background: rgba(255, 107, 107, 0.8);
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                ">
                    Decline (Boring)
                </button>
                <button id="accept-terms" style="
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 25px;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
                ">
                    I Accept! 🎵
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Add hover effects
        const acceptBtn = modal.querySelector('#accept-terms');
        const declineBtn = modal.querySelector('#decline-terms');

        acceptBtn.addEventListener('mouseenter', () => {
            acceptBtn.style.transform = 'scale(1.05)';
            acceptBtn.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.6)';
        });

        acceptBtn.addEventListener('mouseleave', () => {
            acceptBtn.style.transform = 'scale(1)';
            acceptBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
        });

        declineBtn.addEventListener('mouseenter', () => {
            declineBtn.style.transform = 'scale(1.05)';
            declineBtn.style.background = 'rgba(255, 107, 107, 1)';
        });

        declineBtn.addEventListener('mouseleave', () => {
            declineBtn.style.transform = 'scale(1)';
            declineBtn.style.background = 'rgba(255, 107, 107, 0.8)';
        });

        // Handle button clicks
        acceptBtn.addEventListener('click', () => {
            this.acceptTerms(overlay);
        });

        declineBtn.addEventListener('click', () => {
            this.declineTerms(overlay);
        });

        // Add entrance animation
        modal.style.transform = 'scale(0.8) translateY(50px)';
        modal.style.opacity = '0';

        setTimeout(() => {
            modal.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            modal.style.transform = 'scale(1) translateY(0)';
            modal.style.opacity = '1';
        }, 100);
    }

    acceptTerms(overlay) {
        console.log('Terms accepted! Starting audio...');
        this.termsAccepted = true;
        this.audioEnabled = true;

        // Add exit animation
        const modal = overlay.querySelector('.terms-modal');
        modal.style.transform = 'scale(0.8) translateY(-50px)';
        modal.style.opacity = '0';

        setTimeout(() => {
            document.body.removeChild(overlay);

            // Play audio immediately
            if (this.audio) {
                this.audio.play()
                    .then(() => {
                        console.log('✅ Audio started playing after accepting terms!');
                        this.showAudioIndicator();

                        // Continue with auto-scroll after a short delay
                        setTimeout(() => {
                            this.autoScrollToContent();
                        }, 1000);
                    })
                    .catch((error) => {
                        console.error('❌ Audio failed even after accepting terms:', error);
                        // Continue with auto-scroll anyway
                        setTimeout(() => {
                            this.autoScrollToContent();
                        }, 1000);
                    });
            }
        }, 500);
    }

    declineTerms(overlay) {
        console.log('Terms declined - showing sad message');

        const modal = overlay.querySelector('.terms-modal');
        modal.innerHTML = `
            <div style="text-align: center;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">😢 Aww...</h2>
                <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">
                    No epic Jamrud music for you then!
                </p>
                <p style="font-size: 1rem; opacity: 0.8; margin-bottom: 2rem;">
                    (You can still enjoy the website, just without the awesome soundtrack)
                </p>
                <button id="continue-anyway" style="
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 25px;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    Continue Anyway 😔
                </button>
            </div>
        `;

        const continueBtn = modal.querySelector('#continue-anyway');
        continueBtn.addEventListener('click', () => {
            modal.style.transform = 'scale(0.8) translateY(-50px)';
            modal.style.opacity = '0';

            setTimeout(() => {
                document.body.removeChild(overlay);
                // Continue with auto-scroll without audio
                setTimeout(() => {
                    this.autoScrollToContent();
                }, 500);
            }, 500);
        });
    }

    forceAudioPlay() {
        // Create a temporary button to simulate user interaction
        const tempButton = document.createElement('button');
        tempButton.style.position = 'absolute';
        tempButton.style.left = '-9999px';
        tempButton.style.opacity = '0';
        tempButton.style.pointerEvents = 'none';
        document.body.appendChild(tempButton);

        // Simulate a click on the button to create user interaction context
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        // Add event listener to play audio when button is "clicked"
        tempButton.addEventListener('click', () => {
            this.attemptAudioPlay();
            document.body.removeChild(tempButton);
        });

        // Dispatch the click event
        tempButton.dispatchEvent(clickEvent);
    }

    attemptAudioPlay() {
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Audio started playing automatically');
                    this.showAudioIndicator();
                })
                .catch((error) => {
                    console.log('Autoplay still blocked, trying alternative method:', error);
                    // Try alternative method with Web Audio API
                    this.tryWebAudioAPI();
                });
        }
    }

    tryWebAudioAPI() {
        // Alternative method using Web Audio API context
        const AudioContextClass = window.AudioContext || window['webkitAudioContext'];

        if (AudioContextClass) {
            try {
                const audioContext = new AudioContextClass();

                // Resume audio context (this often works even when direct play() doesn't)
                audioContext.resume().then(() => {
                    console.log('Audio context resumed, trying to play audio again');
                    this.audio.play()
                        .then(() => {
                            console.log('Audio playing via Web Audio API method');
                            this.showAudioIndicator();
                        })
                        .catch(() => {
                            console.log('All autoplay methods failed, using iframe method');
                            this.tryIframeMethod();
                        });
                });
            } catch (e) {
                console.log('Web Audio API not available, using iframe method');
                this.tryIframeMethod();
            }
        } else {
            console.log('Web Audio API not supported, using iframe method');
            this.tryIframeMethod();
        }
    }

    tryIframeMethod() {
        // Create an invisible iframe to bypass autoplay restrictions
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'data:text/html,<html><body><audio autoplay><source src="' +
                     (this.audio.src || this.audio.currentSrc) + '" type="audio/mpeg"></audio></body></html>';

        document.body.appendChild(iframe);

        // Try to play the main audio after iframe loads
        iframe.onload = () => {
            setTimeout(() => {
                this.audio.play()
                    .then(() => {
                        console.log('Audio playing via iframe method');
                        this.showAudioIndicator();
                        document.body.removeChild(iframe);
                    })
                    .catch(() => {
                        console.log('Iframe method failed, showing click prompt');
                        document.body.removeChild(iframe);
                        this.addAudioClickHandler();
                    });
            }, 100);
        };
    }

    showAudioIndicator() {
        // Create a small audio indicator
        const audioIndicator = document.createElement('div');
        audioIndicator.className = 'audio-indicator';
        audioIndicator.innerHTML = '🎵';

        Object.assign(audioIndicator.style, {
            position: 'fixed',
            top: '2rem',
            left: '2rem',
            fontSize: '1.5rem',
            zIndex: '1000',
            animation: 'pulse 2s ease-in-out infinite',
            opacity: '0.8'
        });

        document.body.appendChild(audioIndicator);

        // Remove indicator when audio ends
        this.audio.addEventListener('ended', () => {
            if (audioIndicator.parentNode) {
                audioIndicator.parentNode.removeChild(audioIndicator);
            }
        });
    }

    addAudioClickHandler() {
        const playAudioOnClick = () => {
            if (this.audio) {
                this.audio.play()
                    .then(() => {
                        console.log('Audio started playing after user interaction');
                        this.showAudioIndicator();
                    })
                    .catch((error) => {
                        console.log('Failed to play audio:', error);
                    });

                // Remove the click handler after first use
                document.removeEventListener('click', playAudioOnClick);
            }
        };

        document.addEventListener('click', playAudioOnClick);

        // Show a subtle hint that clicking will enable audio
        const audioHint = document.createElement('div');
        audioHint.textContent = 'Click anywhere to enable audio 🔊';
        audioHint.className = 'audio-hint';

        Object.assign(audioHint.style, {
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            zIndex: '1000',
            animation: 'fadeIn 1s ease-out forwards'
        });

        document.body.appendChild(audioHint);

        // Remove hint after 5 seconds or when audio starts
        setTimeout(() => {
            if (audioHint.parentNode) {
                audioHint.parentNode.removeChild(audioHint);
            }
        }, 5000);

        // Remove hint when audio starts
        const removeHint = () => {
            if (audioHint.parentNode) {
                audioHint.parentNode.removeChild(audioHint);
            }
            document.removeEventListener('click', removeHint);
        };
        document.addEventListener('click', removeHint);
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
