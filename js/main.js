// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu-content a');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
        menuToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = `<i data-lucide="menu"></i>`;
            lucide.createIcons();
        });
    });
}

// Update Copyright Year
const yearElem = document.getElementById('year');
if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Main Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Portfolio Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
                
                if (filterValue === 'all' || categories.includes(filterValue.toLowerCase())) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 30);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.97)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 250);
                }
            });
        });
    });

    // 2. Case Study Modal Logic
    const caseStudyModal = document.getElementById('case-study-modal');
    const viewButtons = document.querySelectorAll('.view-case-study');

    if (caseStudyModal) {
        const closeCaseStudy = () => {
            caseStudyModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        const modalCloseBtns = caseStudyModal.querySelectorAll('.modal-close, .modal-close-btn');
        modalCloseBtns.forEach(btn => btn.addEventListener('click', closeCaseStudy));

        const discussBtn = caseStudyModal.querySelector('.modal-discuss-btn');
        if (discussBtn) {
            discussBtn.addEventListener('click', () => {
                closeCaseStudy();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        caseStudyModal.addEventListener('click', (e) => {
            if (e.target === caseStudyModal) {
                closeCaseStudy();
            }
        });

        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.portfolio-card');
                if (!card) return;

                const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Project';
                const badge = card.querySelector('.card-badge') ? card.querySelector('.card-badge').textContent : '';
                const img = card.querySelector('img');
                const imageSrc = img ? img.getAttribute('src') : '';
                const hiddenData = card.querySelector('.hidden-case-study-data');

                // Fill modal elements
                const titleElem = caseStudyModal.querySelector('.modal-title');
                const categoryElem = caseStudyModal.querySelector('.modal-category');
                const imageElem = caseStudyModal.querySelector('.modal-image');
                const overviewElem = caseStudyModal.querySelector('.modal-overview');
                const challengeElem = caseStudyModal.querySelector('.modal-challenge');
                const solutionElem = caseStudyModal.querySelector('.modal-solution');
                const resultsElem = caseStudyModal.querySelector('.modal-results');
                const roleElem = caseStudyModal.querySelector('.modal-role');
                const toolsElem = caseStudyModal.querySelector('.modal-tools');

                if (titleElem) titleElem.textContent = title;
                if (categoryElem) categoryElem.textContent = badge;
                if (imageElem) {
                    imageElem.src = imageSrc;
                    imageElem.alt = title;
                }

                if (hiddenData) {
                    const csOverview = hiddenData.querySelector('.cs-overview');
                    const csChallenge = hiddenData.querySelector('.cs-challenge');
                    const csSolution = hiddenData.querySelector('.cs-solution');
                    const csResults = hiddenData.querySelector('.cs-results');

                    if (overviewElem && csOverview) overviewElem.textContent = csOverview.textContent;
                    if (challengeElem && csChallenge) challengeElem.textContent = csChallenge.textContent;
                    if (solutionElem && csSolution) solutionElem.textContent = csSolution.textContent;
                    if (resultsElem && csResults) resultsElem.textContent = csResults.textContent;
                }

                const metaSpans = card.querySelectorAll('.card-meta span');
                if (metaSpans.length >= 2) {
                    if (roleElem) roleElem.textContent = metaSpans[0].textContent.trim();
                    if (toolsElem) toolsElem.textContent = metaSpans[1].textContent.trim();
                }

                caseStudyModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // 3. CV Preview Modal Logic
    const cvModal = document.getElementById('cv-modal');
    const heroCvBtn = document.getElementById('hero-cv-btn');
    const navCvBtn = document.getElementById('nav-cv-btn');

    if (cvModal) {
        const openCvModal = (e) => {
            if (e) e.preventDefault();
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeCvModal = () => {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (heroCvBtn) heroCvBtn.addEventListener('click', openCvModal);
        if (navCvBtn) navCvBtn.addEventListener('click', openCvModal);

        const cvCloseBtns = cvModal.querySelectorAll('.modal-close, .modal-close-btn');
        cvCloseBtns.forEach(btn => btn.addEventListener('click', closeCvModal));

        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }

    // Global ESC key listener for all open modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (caseStudyModal && caseStudyModal.classList.contains('active')) {
                caseStudyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (cvModal && cvModal.classList.contains('active')) {
                cvModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // 4. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formToast = document.getElementById('form-toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const service = document.getElementById('form-service').value;
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending inquiry...</span>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (formToast) {
                    formToast.className = 'form-toast success';
                    formToast.innerHTML = `<strong>Inquiry Received!</strong> Thank you ${name}. Denzel will respond within 2-4 hours.`;
                    formToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // Construct mailto fallback for direct sending
                const mailtoUrl = `mailto:denzelmgoni1111@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${service} - ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`)}`;
                
                // Reset form fields
                contactForm.reset();

                // Offer quick open in email client
                setTimeout(() => {
                    const openMail = confirm("Would you also like to open this draft directly in your email client?");
                    if (openMail) {
                        window.location.href = mailtoUrl;
                    }
                }, 800);
            }, 700);
        });
    }

    // Refresh icons
    lucide.createIcons();
});
