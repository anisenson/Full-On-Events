// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar Functionality
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.getElementById('backToTop');
    
    // Toggle Mobile Menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Change navbar background on scroll
    const currentPage = window.location.pathname;

    if (currentPage === '/' || currentPage.includes('index.html')) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                backToTopButton.classList.add('show');
            } else {
                navbar.classList.remove('scrolled');
                backToTopButton.classList.remove('show');
            }
            updateActiveNavLink();
        });
    } else {
        navbar.classList.add('scrolled'); // Keep navbar always styled on other pages
    }
    
    
    // Back to top button
    backToTopButton.addEventListener('click', function() {
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
    
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    const animateOnScroll = function() {
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
    
    // Partner slider animation (simple version)
    let partnerSlideIndex = 0;
    const partners = document.querySelectorAll('.partner');
    
    function rotatePartners() {
        partners.forEach((partner, index) => {
            partner.style.opacity = '0';
            
            setTimeout(() => {
                partner.style.opacity = '1';
            }, index * 200);
        });
        
        partnerSlideIndex = (partnerSlideIndex + 1) % partners.length;
    }
    
    // Rotate partners every 5 seconds
    setInterval(rotatePartners, 5000);
    rotatePartners(); // Call once on load
    
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