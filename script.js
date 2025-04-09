// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Navbar Functionality
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.getElementById('backToTop');

    // Toggle Mobile Menu
    mobileMenu.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Change navbar background on scroll
    const currentPage = window.location.pathname;

    // Navbar styling logic (only on the index page)
    if (currentPage === '/' || currentPage.includes('index.html')) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNavLink();
        });
    } else {
        navbar.classList.add('scrolled'); // Keep navbar always styled on other pages
    }

    // Back to top button logic (for every page)
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });


    // Back to top button
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }



    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple animation for elements on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.fade-in');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Add fade-in class to elements that should animate
    document.querySelectorAll('.section-title, .gallery-item, .about-content > div, .contact-item').forEach(item => {
        item.classList.add('fade-in');
    });

    // Call animation function on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Call it once on load
    animateOnScroll();


    // Add CSS for fade-in animation (should be in CSS file, added here for completeness)
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
 

// Array of image URLs
const images = [
    'assets/images/landing-bg/landingbg-1.jpeg', // Initial Image
    'assets/images/landing-bg/landingbg-2.jpeg', // Image 1
    'assets/images/landing-bg/landingbg-3.jpeg', // Image 2
    'assets/images/landing-bg/landingbg-4.jpeg', // Image 3
    'assets/images/landing-bg/landingbg-5.jpeg',  // Image 4
    'assets/images/landing-bg/landingbg-6.jpeg'  // Image 5
];

// Set up two background elements for crossfade
function setupHeroBackgrounds() {
    const heroSection = document.querySelector('.hero');
    
    // Create two background elements
    const bg1 = document.createElement('div');
    bg1.className = 'hero-background active';
    
    const bg2 = document.createElement('div');
    bg2.className = 'hero-background';
    
    // Add to hero section
    heroSection.prepend(bg2);
    heroSection.prepend(bg1);
    
    // Set initial background
    bg1.style.backgroundImage = `url('${images[0]}')`;
    
    return { bg1, bg2 };
}

// Initialize backgrounds
const { bg1, bg2 } = setupHeroBackgrounds();
let currentImageIndex = 0;
let activeBg = bg1;
let inactiveBg = bg2;

// Function to transition between images
function changeBackgroundImage() {
    // Update index for next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
    
    // Set the new background image on the inactive element
    inactiveBg.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    
    // Start transition
    activeBg.classList.remove('active');
    inactiveBg.classList.add('active');
    
    // Swap active and inactive references
    [activeBg, inactiveBg] = [inactiveBg, activeBg];
}

// Start transitioning every 5 seconds
setInterval(changeBackgroundImage, 4000);