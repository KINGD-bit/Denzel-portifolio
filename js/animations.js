// Wait for DOM to load
document.addEventListener("DOMContentLoaded", (event) => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
    })
    .from(".hero-image-wrapper", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6")
    .from(".hero-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.4");

    // General Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    const revealLeft = document.querySelectorAll('.reveal-left');
    revealLeft.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    const revealRight = document.querySelectorAll('.reveal-right');
    revealRight.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Staggered lists (e.g. Services, Projects)
    const staggerSections = document.querySelectorAll('.stagger-grid');
    staggerSections.forEach((section) => {
        const cards = section.querySelectorAll('.glass-card');
        gsap.from(cards, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    });
    
    // Parallax effect for Background blobs
    gsap.to(".blob-1", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: true
        } 
    });

    gsap.to(".blob-2", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: true
        } 
    });
});
