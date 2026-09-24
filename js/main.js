// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu-content a');

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

// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Portfolio Filtering & Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // 2. Modal Logic
    const modal = document.getElementById('case-study-modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-btn');
    const viewButtons = document.querySelectorAll('.view-case-study');

    if (modal) {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.portfolio-card');
                
                // Populate Modal Data
                const title = card.querySelector('h3').textContent;
                const category = card.querySelector('.card-badge').textContent;
                const imageSrc = card.querySelector('img').getAttribute('src');
                
                const hiddenData = card.querySelector('.hidden-case-study-data');
                
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-category').textContent = category;
                modal.querySelector('.modal-image').src = imageSrc;
                
                modal.querySelector('.modal-overview').textContent = hiddenData.querySelector('.cs-overview').textContent;
                modal.querySelector('.modal-challenge').textContent = hiddenData.querySelector('.cs-challenge').textContent;
                modal.querySelector('.modal-solution').textContent = hiddenData.querySelector('.cs-solution').textContent;
                modal.querySelector('.modal-results').textContent = hiddenData.querySelector('.cs-results').textContent;
                
                // Extract role and tools from card-meta
                const metaSpans = card.querySelectorAll('.card-meta span');
                modal.querySelector('.modal-role').textContent = metaSpans[0].textContent;
                modal.querySelector('.modal-tools').textContent = metaSpans[1].textContent;

                // Open modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close logic
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
