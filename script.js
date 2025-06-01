// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
        hamburgerBtn.classList.toggle('active');
    });
}

// Mobile dropdown toggle
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const dropdownMenu = this.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            dropdownMenu.classList.toggle('show');
        }
    });
});

// Smooth scrolling for navigation links with href targeting same-page IDs
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu and dropdowns after clicking a link
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                hamburgerBtn.classList.remove('active');
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        }
    });
});

// Arrow down button
const arrowDownBtn = document.getElementById('arrow-down-btn');
if (arrowDownBtn) {
    arrowDownBtn.addEventListener('click', function() {
        // Try scrolling to #angebote first (for angebote_vergleich.html), then #services (for index.html)
        const targetElement = document.getElementById('angebote') || document.getElementById('services') || document.getElementById('support-list-section') || document.getElementById('about-us-section');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Contact form submission (simulated)
document.getElementById('submit-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contact-form').reset();
    } else {
        alert('Please fill out all fields.');
    }
});
